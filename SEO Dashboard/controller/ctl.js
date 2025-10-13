const Schema = require("../model/firstSchema");
const fs = require("fs");

module.exports.loginPage = (req,res) => {
    res.render("login")
}

module.exports.login = async(req,res) => {
    res.redirect("dashboard")
}

module.exports.dashboard = (req,res) => {
    res.render("dashboard")
}

module.exports.addAdmin = (req,res) => {
    res.render("addAdmin")
}

module.exports.addData = async(req,res) => {
    req.body.image = req.file.path
    await Schema.create(req.body).then(()=>{
        res.redirect("addAdmin")
    })
}

module.exports.viewData = async(req,res) => {
    await Schema.find().then((data)=>{
        res.render("viewAdmin", {data})
    })
}

module.exports.deleteData = async(req,res) => {
    let adminDelete = await Schema.findById(req.query.id)
    fs.unlinkSync(adminDelete.image)
    await Schema.findByIdAndDelete(req.query.id).then(()=>{
        res.redirect("viewAdmin")
    })
}

module.exports.editData = async(req,res) => {
    await Schema.findById(req.query.id).then((adminData)=>{
        res.render("editAdmin", {adminData})
    })
}

module.exports.updateData = async(req,res) => {
    let AdminData = await Schema.findById(req.body.id)
    let img = ""

    req.file ? img = req.file.path : img = AdminData.image

    req.file && fs.unlinkSync(AdminData.image)

    req.body.image = img

    await Schema.findByIdAndUpdate(req.body.id, req.body).then(()=>{
        res.redirect("viewAdmin")
    })
}

module.exports.logout = (req,res) => {
    req.session.destroy()

    res.redirect("/")
}

module.exports.changePass = (req,res) => {
    res.render("changePass")
}

module.exports.verifyPass = async (req,res) => {
    let admin = req.user

    if (admin.password == req.body.oldPass) {
        if (req.body.newPass == req.body.confirmPass) {
            await Schema.findByIdAndUpdate(admin.id, {password : req.body.newPass}).then(()=>{
                res.redirect("/logout")
            })
        } else {
            res.redirect("/changePass")
        }
    } else {
        res.redirect("/logout")
    }
}