const express = require("express")
const route = express.Router()
const employeeCtl = require("../controllers/employeeController")
const employeeAuth = require("../middelwares/employeeAuth")
const managerAuth = require("../middelwares/managerAuth")


route.post("/register", managerAuth.checkAuth, employeeCtl.createEmployee)

route.post("/login", employeeCtl.employeeLogin)

route.get("/profile", employeeAuth.checkAuth, employeeCtl.employeeProfile)

route.put("/change-password", employeeAuth.checkAuth, employeeCtl.changePassword)

route.post("/forgot-password", employeeCtl.forgotPassword)

route.post("/verify-otp", employeeCtl.verifyOtp)

route.post("/reset-password", employeeCtl.resetPassword)

module.exports = route;