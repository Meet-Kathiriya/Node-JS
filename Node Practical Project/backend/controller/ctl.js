const userschema = require("../model/authschema")
const bookSchema = require("../model/bookSchema")
const bcrypt = require("bcryptjs")
const moment = require("moment")
const jwt = require("jsonwebtoken")

module.exports.registerAdmin = async (req, res) => {
    let admin = await userschema.findOne({ email: req.body.email })
    if (admin)
        return res.status(400).json({ msg: "Admin already exits !" })

    req.body.password = await bcrypt.hash(req.body.password, 10)
    req.body.createdAt = moment().format("MMMM Do YYYY , h:mm:ss a")
    await userschema.create(req.body).then((data) => {
        res.status(200).json({ msg: "Admin Registered Successfully", data: data })
    })
}

module.exports.loginAdmin = async (req, res) => {
    let admin = await userschema.findOne({ email: req.body.email })
    if (!admin) {
        return res.status(400).json({ msg: "Admin not found" })
    }
    if (await bcrypt.compare(req.body.password, admin.password)) {
        let token = jwt.sign({ admin }, "pe", { expiresIn: "1h" })
        res.status(200).json({ msg: "Admin Logged-In Successfully", token: token })
    } else {
        return res.status(400).json({ msg: "Invalid Password !" })
    }
}

module.exports.viewAdmin = async (req, res) => {
    await userschema.findById(req.admin.admin._id).then((data) => {
        res.status(200).json({ msg: "Admin Profile", data: data })
    })
}

module.exports.addBook = async (req, res) => {
    let book = await bookSchema.findOne({ title:req.body.title })
    if (book)
        return res.status(400).json({ msg: "Book already exist !" })

    req.body.createdAt = moment().format("MMMM Do YYYY , h:mm:ss a")
    let token = jwt.sign({ book },"pe",{ expiresIn: "6h" })
    await bookSchema.create(req.body).then((data) => {
        res.status(200).json({ msg: "Book Added Successfully", data: data ,token:token})
    })
}
module.exports.viewBooks=async (req, res) => {
    console.log(req.book)
    await bookSchema.find({}).then((data) => {
        res.status(200).json({ msg: "Book Information",data:data})
    })
}