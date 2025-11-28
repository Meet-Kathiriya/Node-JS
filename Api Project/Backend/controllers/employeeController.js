const employeeSchema = require("../models/employeeSchema")
const bcrypt = require("bcryptjs")
const moment = require("moment")
const jwt = require("jsonwebtoken")
const mailer = require("../middelwares/employeeMailer")

module.exports.createEmployee = async(req,res) => {
    const {name, email, phone, password} = req.body

    if (!name || !email || !phone || !password) {
        return res.status(400).json({msg: "All fields required"})
    }

    let employee = await employeeSchema.findOne({email: email})

    if (employee) {
        const html = `
        <p>Hi ${employee.name},</p>
        <p>Your manager account already exists.</p>
        <p><b>Email:</b> ${employee.email}</p>
        <p>You can login using your existing password.</p>`

        mailer.sendMail(email, 'User account already exists', html)

        return res.status(200).json({msg: "User already exists. Email sent again"})
    }

    let plainPassword = password

    req.body.password = await bcrypt.hash(req.body.password,10)
    req.body.createdAt = moment().format('MMMM Do YYYY, h:mm:ss a')

    let newEmployee = await employeeSchema.create({...req.body, managerId: req.manager.manager._id})

    const html = `
    <p>Hi${name},</p>
    <p>Your employee account has been created by manager.</p>
    <p><b>Email:</b>${email}</p>
    <p><b>Password:</b>${plainPassword}</p>`

    mailer.sendMail(email, 'Your employee account', html)

    res.status(201).json({msg: "Employee registered and email sent", data: newEmployee})
}

module.exports.employeeLogin = async(req,res) => {
    const {email, password} = req.body

    if (!email || !password) {
        return res.status(400).json({msg: "Email and password are required"})
    }

    let employee = await employeeSchema.findOne({email: email}) 

    if (!employee) {
        return res.status(404).json({msg: "User not found"})
    }

    if (employee.status === false) {
        return res.status(403).json({msg: "Your account is deactivated. Contact admin"})
    }

    if (await bcrypt.compare(req.body.password, employee.password)) {
        let token = jwt.sign({employee, role: "employee"}, "asd", {expiresIn: "1h"})

        return res.status(200).json({msg: "USer logged in successfully", token: token})
    } else {
        return res.status(401).json({msg: "User password is wrong"})
    }
}

module.exports.employeeProfile = async(req,res) => {
    await employeeSchema.findById(req.employee.employee._id).then((data)=>{
        if (!data) {
            return res.status(404).json({ msg: "User not found" })
        }
        res.status(200).json({ msg: "Your profile data", data: data })
    })
}

module.exports.changePassword = async(req,res) => {
    const {oldPass, newPass, confirmPass} = req.body

    if (!oldPass || !newPass || !confirmPass) {
        return res.status(400).json({ msg: "All fields required" })
    }

    let employee = req.employee.employee

    let employeeData = await employeeSchema.findById(employee._id)

    if (!employeeData) {
        return res.status(404).json({ msg: "User not found"})
    }

    let passwordMatch = await bcrypt.compare(oldPass, employeeData.password)
    
    if (!passwordMatch) {
        return res.status(400).json({ msg: "Old password is incorrect" })
    }

    if (newPass !== confirmPass) {
        return res.status(400).json({ msg: "New password & Confirm password do not match" })
    }

    let newHashed = await bcrypt.hash(newPass,10)

    await employeeSchema.findByIdAndUpdate(employee._id, {password: newHashed}).then(()=>{
        res.status(200).json({ msg: "Password changed successfully! Please login again" })
    })
}

module.exports.forgotPassword = async(req,res) => {
    const {email} = req.body

    let employee = await employeeSchema.findOne({email: email}) 

    if (!employee) {
        return res.status(400).json({ msg: "User not found" })    
    }

    const otp = Math.floor(Math.random() * 100000 + 900000)

    await employeeSchema.findByIdAndUpdate(
        employee._id,
        {
            otp,
            otpExpire: Date.now() + 5 * 60 * 1000
        }
    )

    const html = `
    <p>Your OTP is ${otp}</p>`

    mailer.sendMail(email, 'Forgot Password OTP', html)

    res.status(200).json({ msg: "OTP sent successfully" })
}

module.exports.verifyOtp = async(req,res) => {  
    const {email} = req.body

    let employee = await employeeSchema.findOne({email: email})

     let otp = req.body.otp

     if (!employee) {
        return res.status(404).json({ msg: "User not found" })
     }

     if (employee.otp !== otp) {
        return res.status(400).json({ msg: "Invalid OTP" })
     }

     if (employee.otpExpire < Date.now()) {
        return res.status(400).json({ msg: "OTP expired" })
     }

    res.status(200).json({ msg: "OTP verified" })
}

module.exports.resetPassword = async(req,res) => {
    const {email, newPass, confirmPass} = req.body

    if (!email || !newPass || !confirmPass) {
        return res.status(400).json({ msg: "All Fields required" })       
    }

    let employee = await employeeSchema.findOne({email: email})

    if (!employee) {
        return res.status(404).json({ msg: "User not found" })  
    }

    if (newPass !== confirmPass) {
        return res.status(400).json({ msg: "New password & Confirm password do not match" })
    }

    let newHased = await bcrypt.hash(newPass,10)

    employee.password = newHased
    employee.otp = undefined
    employee.otpExpire = undefined
    await employee.save()

    res.status(200).json({ msg: "Password reset successfully! Please login again" })
}

module.exports.getAllEmployee = async(req,res) => {
    await employeeSchema.find({}).populate({
        path:"managerId",
        select: "name email status"
    }).then((data)=>{
        if (data.length === 0) {
            return res.status(404).json({msg: "No  employees found"})
        }
        res.status(200).json({msg: "All  employees data", data: data})
    })
}