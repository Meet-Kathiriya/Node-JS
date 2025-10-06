const Schema = require("../model/firstSchema")
const fs = require("fs")

module.exports.loginPage = (req, res) => {
    res.render("login")
}
module.exports.login = async (req, res) => {
    let admin = await Schema.findOne({ email: req.body.email })

    if (admin) {
        if (req.body.password == admin.password) {
            res.cookie("admin", admin)
            res.redirect("/dashboard");
        }
    } else {
        res.redirect("/")
    }
}

module.exports.Desboard = (req, res) => {
    if (req.cookies.admin) {
        res.render("dashboard")
    } else {
        res.render("dashboard")
    }
}

module.exports.FormButton = (req, res) => {
    res.render("addAdmin")
}

module.exports.TableButton = async (req, res) => {
    await Schema.find().then((adminData) => {
        res.render("viewAdmin", { adminData })
    })
}

module.exports.AdminaddDataFuncation = async (req, res) => {
    req.body.image = req.file.path
    await Schema.create(req.body).then(() => {
        res.redirect("form-basic")
    })
}

module.exports.AdmindeleteFuncation = async (req, res) => {
    let AdminData = await Schema.findById(req.query.id)
    fs.unlinkSync(AdminData.image)
    await Schema.findByIdAndDelete(req.query.id).then(() => {
        res.redirect("/")
    })
}

module.exports.AdmineditFuncation = async (req, res) => {
    let AdminData = await Schema.findById(req.query.id)
    res.render("editAdmin", { AdminData })
}

module.exports.AdminupdateFuncation = async (req, res) => {
    let AdminData = await Schema.findById(req.body.id)
    let img = "";

    req.file ? img = req.file.path : img = AdminData.image

    req.file && fs.unlinkSync(AdminData.image);

    req.body.image = img

    await Schema.findByIdAndUpdate(req.body.id, req.body).then(() => {
        res.redirect("/")
    })
}