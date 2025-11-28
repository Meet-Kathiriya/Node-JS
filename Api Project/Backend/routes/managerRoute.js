const express = require("express")
const route = express.Router()
const managerCtl = require("../controllers/managerController")
const managerAuth = require("../middelwares/managerAuth")
const adminAuth = require("../middelwares/adminAuth")
const employeeCtl = require("../controllers/employeeController")

route.post("/register", adminAuth.checkAuth, managerCtl.createManager)

route.post("/login", managerCtl.managerLogin)

route.get("/profile", managerAuth.checkAuth, managerCtl.managerProfile)

route.put("/change-password", managerAuth.checkAuth, managerCtl.changePassword)

route.post("/forgot-password", managerCtl.forgotPassword)

route.post("/verify-otp", managerCtl.verifyOtp)

route.post("/reset-password", managerCtl.resetPassword)

route.get("/allemployees", managerAuth.checkAuth, employeeCtl.getAllEmployee)

route.put("/employee-status", managerAuth.checkAuth, managerCtl.employeeStatus)

module.exports = route;