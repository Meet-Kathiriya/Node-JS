const express = require("express")
const route = express.Router()
const authCtl = require("../controllers/authCtl")
const auth = require("../middelwares/auth")

route.post("/register",authCtl.registerUser)
route.post("/login",authCtl.loginUser)
route.get("/allUser",auth.checkAuth,authCtl.allUser)

module.exports = route