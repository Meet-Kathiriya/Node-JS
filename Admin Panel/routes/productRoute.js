const express = require("express");
const route = express.Router();
const productCtl = require("../controller/productCtl");
const passport = require("../middelwares/localst");



route.get("/addProduct",passport.checkAuth,productCtl.addProductPage);
route.post("/addProduct",productCtl.addProduct);
route.get("/viewProduct",passport.checkAuth,productCtl.viewProduct);

module.exports = route;