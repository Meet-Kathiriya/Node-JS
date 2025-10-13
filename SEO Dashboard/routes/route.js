const express = require("express");
const route = express.Router();
const control = require("../controller/ctl");
const multer = require("../middelwares/multer");
const passport = require("../middelwares/localst");

route.get("/",control.loginPage);

route.post("/login",passport.authenticate("local",{failureRedirect:"/"}),control.login)


route.get("/dashboard",passport.checkAuth,control.dashboard);

route.get("/addAdmin",passport.checkAuth,control.addAdmin);

route.post("/addData",multer,control.addData);

route.get("/viewAdmin",passport.checkAuth,control.viewData);

route.get("/deleteData",control.deleteData);

route.get("/editData",control.editData);

route.post("/updateData",multer,control.updateData);

route.get("/logout",control.logout);

route.get("/changePass",passport.checkAuth,control.changePass);

route.post("/verifyPass",control.verifyPass)

module.exports = route;