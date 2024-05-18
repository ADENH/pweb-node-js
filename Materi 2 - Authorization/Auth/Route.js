const express = require("express")
const router = express.Router()
const { register,login,update,deleteUser,adminAuth } = require("./Auth")
router.route("/register").post(register)
router.route("/login").post(login);
router.route("/update").put(adminAuth,update);
router.route("/deleteUser").post(adminAuth,deleteUser);
module.exports = router