const adminSchema = require("../models/adminSchema");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const mailer = require("../middelwares/adminMailer");
const managerSchema = require("../models/managerSchema");
const { model } = require("mongoose");

module.exports.adminRegister = async(req,res) => {
    let admin = await adminSchema.findOne({email: req.body.email})

    if (admin) {
        return res.status(200).json({msg: "User already registered"})
    }

    req.body.password = await bcrypt.hash(req.body.password,10)
    req.body.createdAt = moment().format('MMMM Do YYYY, h:mm:ss a')

    await adminSchema.create(req.body).then((data)=>{
        res.status(200).json({msg: "USer Registered Successfully", data: data})
    })
}

module.exports.adminLogin = async(req,res) => {
    let admin = await adminSchema.findOne({email: req.body.email})

    if (!admin) {
        return res.status(200).json({msg: "User not found"})
    }

    if (admin.role !== "admin") {
        return res.status(403).json({msg: "Only admins can login"})
    }

    if (await bcrypt.compare(req.body.password, admin.password)) {
        let token = jwt.sign({admin, role:admin.role},"asd",{expiresIn: "1h"})

        return res.status(200).json({msg: "User logged in successfully", token: token})
    } else {
        return res.status(200).json({msg: "User password is wrong"})
    }
}

module.exports.adminProfile = async(req,res) => {
    // console.log(req.admin)
    await adminSchema.findById(req.admin.admin._id).then((data)=>{
        res.status(200).json({msg: "Your profile Data", data: data})
        // console.log(data)
    })
}

module.exports.changePassword = async(req,res) => {
    const {oldPass, newPass, confirmPass} = req.body

    if (!oldPass || !newPass || !confirmPass) {
        return res.status(400).json({msg: "All fields are required"})
    }

    let admin = req.admin.admin

    let adminData = await adminSchema.findById(admin._id)

    if (!adminData) {
        return res.status(404).json({msg: "User not found"})
    }

    // old password check
    let passwordMatch = await bcrypt.compare(oldPass, adminData.password)
    if (!passwordMatch) {
        return res.status(400).json({msg: "Old password is incorrect"})
    }

    // new password & confirm password match 
    if (newPass !== confirmPass) {
        return res.status(400).json({msg: "New Password & Confirm Password do not match"})
    }

    let newHashed = await bcrypt.hash(req.body.newPass,10)

    await adminSchema.findByIdAndUpdate(admin._id, {password: newHashed}).then(()=>{
        res.status(200).json({msg: "Password changed successfully! Please login again"})
    })
    
}

module.exports.forgotPassword = async(req,res) => {
    let admin = await adminSchema.findOne({email: req.body.email})

    if (!admin) {
        return res.status(404).json({msg: "USer not found"})
    }

    const otp = Math.floor(Math.random() * 100000 + 900000)

    admin.otp = otp
    admin.otpExpire = Date.now() + 5 * 60 * 1000
    await admin.save()

    mailer.sendMail(req.body.email, otp)

    res.status(200).json({msg: "OTP sent successfully"})
}

module.exports.verifyOtp = async(req,res) => {
    let admin = await adminSchema.findOne({email: req.body.email})

    let otp = req.body.otp

    if (!admin) {
        return res.status(404).json({msg: "USer not found"})
    }
    
    if (admin.otp !== otp) {
        return res.status(400).json({msg: "Invalid OTP"})
    }

    if (admin.otpExpire < Date.now()) {
        return res.status(400).json({msg: "OTP expired"})
    }
    
    res.status(200).json({msg: "OTP verified"})   
}

module.exports.resetPassword = async(req,res) => {
    const {email, newPass, confirmPass} = req.body

    if (!email || !newPass || !confirmPass) {
        return res.status(400).json({msg: "All Fields required"})
    }

    if (newPass !== confirmPass) {
        return res.status(400).json({msg: "Password do not match"})
    }

    let admin = await adminSchema.findOne({email: req.body.email})

    if (!admin) {
        return res.status(404).json({msg: "USer not found"})
    }

    let newHashed = await bcrypt.hash(newPass,10)

    admin.password = newHashed
    admin.otp = undefined,
    admin.otpExpire = undefined,
    await admin.save()

    return res.status(200).json({msg: "Password reset successfully! Please login again"})
}

module.exports.getAllManager = async(req,res) => {
    await managerSchema.find({}).populate("adminId").then((data)=>{
        if (data.length === 0) {
            return res.status(404).json({msg: "No  managers found"})
        }
        res.status(200).json({msg: "All managers data", data: data})
    })
}

module.exports.managerStatus = async(req,res) => {
    let managerId = req.body.managerId

    if (!managerId) {
        return res.status(400).json({msg: "Manager Id is required"})
    }

    let manager = await managerSchema.findById(managerId)

    if (!manager) {
        return res.status(404).json({msg: "User not found"})
    }

    const newStatus = !manager.status

    await managerSchema.findByIdAndUpdate(managerId, {status: newStatus}).then(()=>{
        res.status(200).json({msg: `Manager ${newStatus ? "Activated" : "Deactivated"} Successfully`})
    })
}