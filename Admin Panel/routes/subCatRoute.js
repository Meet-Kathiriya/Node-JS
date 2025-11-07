const express = require("express");
const route = express.Router();
const subCatCtl = require("../controller/subCatCtl")
const passport = require("../middelwares/localst");



route.get("/addSubCat",passport.checkAuth,subCatCtl.addsubcatPage);
route.post("/addSubCategory",subCatCtl.addsubcat);
route.get("/viewSubCat",passport.checkAuth,subCatCtl.viewSubCategory);

module.exports = route;