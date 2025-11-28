const express = require("express");
const route = express.Router();
const adminCtl = require("../controllers/adminController");
const adminAuth = require("../middelwares/adminAuth");
const employeeCtl = require("../controllers/employeeController")

route.post("/register", adminCtl.adminRegister);

route.post("/login", adminCtl.adminLogin);

route.get("/profile", adminAuth.checkAuth, adminCtl.adminProfile);

route.put("/change-password", adminAuth.checkAuth, adminCtl.changePassword);

route.post("/forgot-password", adminCtl.forgotPassword);

route.post("/verify-otp", adminCtl.verifyOtp);

route.post("/reset-password", adminCtl.resetPassword);

route.get("/allmanagers", adminAuth.checkAuth, adminCtl.getAllManager)

route.put("/manager-status", adminAuth.checkAuth, adminCtl.managerStatus)

route.get("/allemployees", adminAuth.checkAuth, employeeCtl.getAllEmployee)

module.exports = route;