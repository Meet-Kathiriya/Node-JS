const Schema = require("../model/catSchema");

module.exports.addcat = (req,res) => {
    res.render("addCat")
}

module.exports.addcategory = async(req,res) => {
    req.body.image = req.file.path
    await Schema.create(req.body).then(()=>{
        res.redirect("/category/addCat")
    })
}

module.exports.viewCategory = async(req,res) => {
    await Schema.find().then((Categorydata)=>{
        res.render("viewCat",{Categorydata})
    })
}