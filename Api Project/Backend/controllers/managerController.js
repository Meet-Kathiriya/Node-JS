const managerSchema = require("../models/managerSchema");
const bcrypt = require("bcryptjs")
const moment = require("moment")
const jwt = require("jsonwebtoken")
const mailer = require("../middelwares/managerMailer");
const { sendMail } = require("../middelwares/adminMailer");
const employeeSchema = require("../models/employeeSchema");
const { default: mongoose } = require("mongoose");
// const adminSchema = require("../models/adminSchema");

module.exports.createManager = async (req, res) => {
    const { name, email, phone, password } = req.body

    if (!name || !email || !phone || !password) {
        return res.status(400).json({ msg: "All fields required" })
    }

    let manager = await managerSchema.findOne({ email: email })

    if (manager) {
        const html = `
        <p>Hi ${manager.name},</p>
            <p>Your manager account already exists.</p>
            <p><b>Email:</b> ${manager.email}</p>
            <p>You can login using your existing password.</p>`

        mailer.sendMail(email, 'User account already exists', html)

        return res.status(200).json({ msg: "User already exists. Email sent again" })
    }

    let plainPassword = password

    req.body.password = await bcrypt.hash(req.body.password, 10)
    req.body.createdAt = moment().format('MMMM Do YYYY, h:mm:ss a')

    let newManager = await managerSchema.create({ ...req.body, adminId: req.admin.admin._id })

    // const portalLink = "",
    const html = `
    <p>Hi ${name},</p>
    <p>Your manager account has been created by admin.</p>
    <p><b>email:</b> ${email}</p>
    <p><b>password:</b> ${plainPassword}</p>`
    // <p> <a href="${portalLink}">${portalLink}</a>`

    mailer.sendMail(email, 'Your manager account', html)


    res.status(201).json({ msg: "Manager registered and email sent", data: newManager })

}

module.exports.managerLogin = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({msg: "Email and password are required"})
    }

    let manager = await managerSchema.findOne({ email: email })

    if (!manager) {
        return res.status(404).json({ msg: "User not found" })
    }

    if (manager.status === false) {
        return res.status(403).json({ msg: "Your account is deactivated. Contact admin" })
    }

    if (await bcrypt.compare(req.body.password, manager.password)) {
        let token = jwt.sign({ manager, role: manager.role }, "asd", { expiresIn: "1h" })

        return res.status(200).json({ msg: "User logged in successfully", token: token })
    } else {
        return res.status(401).json({ msg: "User password is wrong" })
    }
}

module.exports.managerProfile = async (req, res) => {
    await managerSchema.findById(req.manager.manager._id).populate("adminId").then((data) => {
        if (!data) {
            return res.status(404).json({ msg: "User not found" })
        }
        res.status(200).json({ msg: "Your profile data", data: data })
    })
}

module.exports.changePassword = async (req, res) => {
    const { oldPass, newPass, confirmPass } = req.body

    if (!oldPass || !newPass || !confirmPass) {
        return res.status(400).json({ msg: "All fields required" })
    }

    let manager = req.manager.manager

    let managerData = await managerSchema.findById(manager._id)

    if (!managerData) {
        return res.status(404).json({ msg: "User not found" })
    }

    let passwordMatch = await bcrypt.compare(oldPass, managerData.password)
    if (!passwordMatch) {
        return res.status(400).json({ msg: "Old password is incorrect" })
    }

    if (newPass !== confirmPass) {
        return res.status(400).json({ msg: "New password & Confirm password do not match" })
    }

    let newHased = await bcrypt.hash(newPass, 10)

    await managerSchema.findByIdAndUpdate(manager._id, { password: newHased }).then(() => {
        res.status(200).json({ msg: "Password changed successfully! Please login again" })
    })
}

module.exports.forgotPassword = async (req, res) => {
    let manager = await managerSchema.findOne({ email: req.body.email })

    if (!manager) {
        return res.status(404).json({ msg: "User not found" })
    }

    const otp = Math.floor(Math.random() * 100000 + 900000)

    // manager.otp = otp
    // manager.otpExpire = Date.now() + 1 * 60 * 1000

    await managerSchema.findByIdAndUpdate(
        manager._id,
        {
            otp,
            otpExpire: Date.now() + 5 * 60 * 1000
        }
    )

    const html = `
    <p>Your OTP is ${otp}</p>`

    mailer.sendMail(req.body.email, "Forgot password OTP", html)

    res.status(200).json({ msg: "OTP sent successfully" })
}

module.exports.verifyOtp = async (req, res) => {
    let manager = await managerSchema.findOne({ email: req.body.email })

    let otp = req.body.otp

    if (!manager) {
        return res.status(404).json({ msg: "User not found" })
    }

    if (manager.otp !== otp) {
        return res.status(400).json({ msg: "Invalid OTP" })
    }

    if (manager.otpExpire < Date.now()) {
        return res.status(400).json({ msg: "OTP expired" })
    }

    res.status(200).json({ msg: "OTP verified" })

}

module.exports.resetPassword = async (req, res) => {
    let { email, newPass, confirmPass } = req.body

    if (!email || !newPass || !confirmPass) {
        return res.status(400).json({ msg: "All Fields required" })
    }

    let manager = await managerSchema.findOne({ email: email })

    if (!manager) {
        return res.status(404).json({ msg: "User not found" })
    }

    if (newPass !== confirmPass) {
        return res.status(400).json({ msg: "New password & Confirm password do not match" })
    }

    let newHashed = await bcrypt.hash(newPass, 10)

    manager.password = newHashed
    manager.otp = undefined
    manager.otpExpire = undefined

    await manager.save()

    res.status(200).json({ msg: "Password reset successfully! Please login again" })
}

module.exports.employeeStatus = async(req,res) => {
    let employeeId = req.body.employeeId

    if (!employeeId) {
        return res.status(400).json({msg: "Employee Id is required"})
    }

    let employee = await employeeSchema.findById(employeeId)

    if (!employeeId) {
        return res.status(400).json({msg: "Invalid employee id"})
    }

    const newStatus = !employee.status

    await employeeSchema.findByIdAndUpdate(employeeId, {status: newStatus}).then(()=>{
        res.status(200).json({msg: `Employee ${newStatus ? "Activated" : "Deactivated"} successfully`})
    })
}