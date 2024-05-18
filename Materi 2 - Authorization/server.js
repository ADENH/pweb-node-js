const express = require("express")
const connectDB = require("./db");

const cookieParser = require("cookie-parser");
const { adminAuth, userAuth } = require("./Auth/Auth");

const app = express()
app.use(express.json())
app.use(cookieParser());
// EJS = Embedded Java Script
app.set("view engine", "ejs")
app.get("/admin", adminAuth, (req, res) => res.send("Admin Route"));
app.get("/basic", userAuth, (req, res) => res.send("User Route"));

app.get("/", (req, res) => res.render("home"))
app.get("/register", (req, res) => res.render("register"))
app.get("/login", (req, res) => res.render("login"))
app.get("/admin", adminAuth, (req, res) => res.render("admin"))
app.get("/basic", userAuth, (req, res) => res.render("user"))

app.get("/logout", (req, res) => {
    res.cookie("jwt", "", { maxAge: "1" })
    res.redirect("/")
  })

const PORT = 5000
app.listen(PORT, () => console.log(`Server Connected to port ${PORT}`))

//Connecting the Database
connectDB();

// Handling Error
process.on("unhandledRejection", err => {
    console.log(`An error occurred: ${err.message}`)
    server.close(() => process.exit(1))
  })

app.use("/api/auth", require("./Auth/Route"))