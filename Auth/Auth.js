const User = require("../user")
const bcrypt = require("bcryptjs")

const jwt = require('jsonwebtoken')
const jwtSecret = '83b6c020964a089ded12ba0021558f13d39a1df4a4d15dd84aead596b79df4f25b349b'

exports.adminAuth = (req, res, next) => {
    console.log(req);
    console.log(req.body);
    const token = req.headers.authorization
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: "Not authorized" })
            } else {
                if (decodedToken.role !== "admin") {
                    return res.status(401).json({ message: "Not authorized" })
                } else {
                    next()
                }
            }
        })
    } else {
        return res
            .status(401)
            .json({ message: "Not authorized, token not available" })
    }
}

exports.userAuth = (req, res, next) => {
    const token = req.cookies.jwt
    console.log(token);
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: "Not authorized" })
            } else {
                if (decodedToken.role !== "Basic") {
                    return res.status(401).json({ message: "Not authorized" })
                } else {
                    next()
                }
            }
        })
    } else {
        return res
            .status(401)
            .json({ message: "Not authorized, token not available" })
    }
}

exports.getUsers = async (req, res, next) => {
    await User.find({})
      .then(users => {
        const userFunction = users.map(user => {
          const container = {}
          container.username = user.username
          container.role = user.role
          return container
        })
        res.status(200).json({ user: userFunction })
      })
      .catch(err =>
        res.status(401).json({ message: "Not successful", error: err.message })
      )
  }

// auth.js
exports.register = async (req, res, next) => {
    const { username, password } = req.body
    console.log(req.body);
    if (password.length < 6) {
        return res.status(400).json({ message: "Password less than 6 characters" })
    }
    const user = await User.findOne({ username, password })
    if (!user) {
        try {
            bcrypt.hash(password, 10).then(async (hash) => {
                await User.create({
                    username,
                    password: hash,
                })
                    .then((user) => {
                        const maxAge = 3 * 60 * 60;
                        const token = jwt.sign(
                            { id: user._id, username, role: user.role },
                            jwtSecret,
                            {
                                expiresIn: maxAge, // 3hrs in sec
                            }
                        );
                        res.cookie("jwt", token, {
                            httpOnly: true,
                            maxAge: maxAge * 1000, // 3hrs in ms
                        });
                        res.status(201).json({
                            message: "User successfully created",
                            user: user,
                            token : token
                        });
                    })
                    .catch((error) =>
                        res.status(400).json({
                            message: "User not successful created",
                            error: error.message,
                        })
                    );
            });

        } catch (err) {
            res.status(401).json({
                message: "User not successful created",
                error: error.mesage,
            })
        }
    } else {
        res.status(400).json({
            message: "user already registered",
        })
    }

}

exports.login = async (req, res, next) => {
    const { username, password } = req.body
    // Check if username and password is provided
    if (!username || !password) {
        return res.status(400).json({
            message: "Username or Password not present",
        })
    }
    try {
        const user = await User.findOne({ username })
        if (!user) {
            res.status(401).json({
                message: "Login not successful",
                error: "User not found",
            })
        } else {
            bcrypt.compare(password, user.password).then(function (result) {
                if (result) {
                    const maxAge = 3 * 60 * 60;
                    const token = jwt.sign(
                        { id: user._id, username, role: user.role },
                        jwtSecret,
                        {
                            expiresIn: maxAge, // 3hrs in sec
                        }
                    );
                    res.cookie("jwt", token, {
                        httpOnly: true,
                        maxAge: maxAge * 1000, // 3hrs in ms
                    });
                    res.status(201).json({
                        message: "User successfully Logged in",
                        user: user,
                        token:token,
                    });
                } else {
                    res.status(400).json({ message: "Login not succesful" });
                }
            });

        }

    } catch (error) {
        res.status(400).json({
            message: "An error occurred",
            error: error.message,
        })
    }
}

exports.update = async (req, res, next) => {
    const { role, id } = req.body
    console.log(req.body);
    // Verifying if role and id is presnt
    if (role && id) {
        // Verifying if the value of role is admin
        if (role === "admin") {
            // Finds the user with the id
            await User.findById(id)
                .then((user) => {
                    console.log(user)
                    // Third - Verifies the user is not an admin
                    if (user.role !== "admin") {
                        user.role = role;

                        console.log(user)
                        user.save();
                        res.status("201").json({ message: "Update successful", user });
                    } else {
                        res.status(400).json({ message: "User is already an Admin" });
                    }
                })
                .catch((error) => {
                    res
                        .status(400)
                        .json({ message: "An error occurred", error: error.message });
                });

        } else {
            res.status(400).json({
                message: "Role is not admin",
            })
        }
    } else {
        res.status(400).json({ message: "Role or Id not present" })
    }


}

exports.deleteUser = async (req, res, next) => {
    const { id } = req.body
    console.log(req.body);
    await User.findByIdAndDelete(id)
        .then(user =>
            res.status(201).json({ message: "User successfully deleted", user })
        )
        .catch(error =>
            res
                .status(400)
                .json({ message: "An error occurred", error: error.message })
        )
}