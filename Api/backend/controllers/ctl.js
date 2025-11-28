const schema = require("../models/schema")
const fs = require("fs")

module.exports.addData = async(req,res) => {
    req.body.Image = req.file.path
    await schema.create(req.body).then(()=>{
        res.status(200).json({msg: "Data added successfully", data:req.body})
    })
}

module.exports.getData = async(req,res) => {
    await schema.find({}).then((data)=>{
        res.status(200).json({msg: "Data found successfully", data:data})
    })
}

module.exports.deleteData = async(req,res) => {
    let imageDelete = await schema.findById(req.query.id)
    fs.unlinkSync(imageDelete.Image)
    await schema.findByIdAndDelete(req.query.id).then((data)=>{
        res.status(200).json({msg: "Data deleted successfully", data:data})
    })
}

module.exports.updateData = async(req,res) => {
    let uData = await schema.findById(req.query.id)
    let img = ""

    req.file ? img = req.file.path : img = uData.Image

    req.file && fs.unlinkSync(uData.Image)

    req.body.Image = img

    await schema.findByIdAndUpdate(req.query.id,req.body).then((data)=>{
        res.status(200).json({msg: "Data updated successfully", data:data})
    })
}