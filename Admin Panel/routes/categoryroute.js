const express = require("express");
const route = express.Router();
const catctl = require("../controller/categoryctl");
const passport = require("../middelwares/localst");
const multer = require("../middelwares/multer");


route.get("/addCat",passport.checkAuth,catctl.addcat);
route.post("/addcategory",multer,catctl.addcategory);
route.get("/viewCat",passport.checkAuth,catctl.viewCategory);

module.exports = route;