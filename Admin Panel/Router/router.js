const express = require("express");
const router = express.Router()
const control = require("../controlar/ctl")
const multer = require("../middelwares/multer")

router.get("/", control.loginPage)
router.post("/login", control.login)
router.get("/dashboard", control.Desboard)
router.get("/form-basic", control.FormButton)
router.get("/tables", control.TableButton)

router.post("/admin-add-data", multer, control.AdminaddDataFuncation)

router.get("/deleteData", control.AdmindeleteFuncation)

router.get("/editData", control.AdmineditFuncation)

router.post("/admin-update", multer, control.AdminupdateFuncation)


module.exports = router;