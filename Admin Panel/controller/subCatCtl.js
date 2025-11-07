const catSchema = require("../model/catSchema");
const subCatSchema = require("../model/subCatSchema");

module.exports.addsubcatPage = async(req,res) => {
    await catSchema.find({}).then((data)=>{
        res.render("addSubCat",{data})
    })
}

module.exports.addsubcat = async(req,res) => {
   await subCatSchema.create(req.body).then(()=>{
        res.redirect("/subCategory/addSubCat")
   })
}

module.exports.viewSubCategory = async(req,res) => {
    await subCatSchema.find({}).populate("categoryId").then((subCategorydata)=>{
        res.render("viewSubCat", {subCategorydata})
    })
}