const Schema = require("../model/firstSchema");
const fs = require("fs");
const mailer = require("../middelwares/mailer");


module.exports.loginpage = async (req, res) => {
    res.render("login")
}

module.exports.login = async (req, res) => {
    // let admin = await Schema.findOne({ email: req.body.email })

    // if (admin) {
    //     if (req.body.password == admin.password) {
    //         res.cookie("admin", admin)
    //         res.redirect("dashboard")
    //     }
    // } else {
    //     res.redirect("/")
    // }

    res.redirect("/dashboard")
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

module.exports.dashboard = async (req, res) => {
    // if (req.cookies.admin) {
    //     res.render("dashboard")
    // } else {
    //     res.redirect("/")
    // }

    res.render("dashboard")
}

module.exports.addAdmin = async (req, res) => {
    // if (req.cookies.admin) {
    //     res.render("addAdmin")
    // } else {
    //     res.redirect("/")
    // }

    res.render("addAdmin")
}

module.exports.viewAdmin = async (req, res) => {
        await Schema.find().then((adminData) => {
            res.render("viewAdmin", { adminData })
        })
}

module.exports.AddData = async (req, res) => {
    req.body.image = req.file.path
    await Schema.create(req.body).then(() => {
        res.redirect("addAdmin")
    })
}

module.exports.deleteData = async (req, res) => {
    let AdminDelete = await Schema.findById(req.query.id)
    fs.unlinkSync(AdminDelete.image)
    await Schema.findByIdAndDelete(req.query.id).then(() => {
        res.redirect("viewAdmin")
    })
}

module.exports.editData = async (req, res) => {
    await Schema.findById(req.query.id).then((AdminData) => {
        res.render("Admineditdata", { AdminData })
    })
}

module.exports.updateData = async (req, res) => {
    let AdminData = await Schema.findById(req.body.id)
    let img = "";

    req.file ? img = req.file.path : img = AdminData.image

    req.file && fs.unlinkSync(AdminData.image)

    req.body.image = img

    await Schema.findByIdAndUpdate(req.body.id, req.body).then(() => {
        res.redirect("viewAdmin")
    })
}

module.exports.logout = async(req,res)=>{
    req.session.destroy()

    res.redirect("/");
}

module.exports.forgetPass = async(req,res) => {
    let admin = await Schema.findOne({email: req.body.email})

    if(admin) {
        let otp = Math.floor(Math.random()*100000+900000)
        mailer.sendOtp(req.body.email, otp)
        req.session.otp = otp
        req.session.adminID = admin.id
        res.render("verifyOtp")
    } else {
        res.redirect("/")
    }
}

module.exports.verifyOtp = async(req,res) => {
    let adminId = req.session.adminID
    let otp = req.session.otp
    
    if (req.body.otp == otp) {
        if (req.body.newPass == req.body.confirmPass) {
            await Schema.findByIdAndUpdate(adminId, {password : req.body.newPass}).then(()=>{
                res.redirect("/")
            })
        } else {
            res.redirect("/")
        }
    } else {
        res.redirect("/")
    }
}