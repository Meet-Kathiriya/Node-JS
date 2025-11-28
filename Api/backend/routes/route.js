const express = require("express");
const route = express.Router();
const multer = require("../middelwares/multer");
const ctl = require("../controllers/ctl");


route.post("/addData",multer,ctl.addData)
route.get("/getData",ctl.getData)
route.delete("/deleteData",ctl.deleteData)
route.put("/updateData",multer,ctl.updateData)

module.exports = route;