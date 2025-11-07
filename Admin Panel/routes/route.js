const express = require("express");
const route = express.Router();
const control = require("../controller/ctl");
const multer = require("../middelwares/multer");
const passport = require("../middelwares/localst");

route.get("/",control.loginpage);
route.post("/login", passport.authenticate("local",{failureRedirect:"/"}) ,control.login)

route.get("/dashboard",passport.checkAuth,control.dashboard);
route.get("/addAdmin",passport.checkAuth,control.addAdmin);
route.get("/viewAdmin",passport.checkAuth,control.viewAdmin);

route.get("/changePass",passport.checkAuth,control.changePass);
route.post("/verifyPass",passport.checkAuth,control.verifyPass);

route.post("/admin-add-data",passport.checkAuth, multer,control.AddData);
route.get("/deleteData",control.deleteData);
route.get("/editData",control.editData);
route.post("/admin-update", multer,control.updateData)

route.get("/logout",control.logout)

route.post("/forgetPass",control.forgetPass);
route.post("/verifyOtp",control.verifyOtp);


module.exports = route; 