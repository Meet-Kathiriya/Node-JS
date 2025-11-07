const subCatSchema = require("../model/subCatSchema");
const productSchema = require("../model/productSchema");

module.exports.addProductPage = async(req,res) => {
    await subCatSchema.find({}).then((data)=>{
        res.render("addProduct",{data})
    })
}

module.exports.addProduct = async(req,res) => {
   await productSchema.create(req.body).then(()=>{
        res.redirect("/products/addProduct")
   })    
}

module.exports.viewProduct = async(req,res) => {
    await productSchema.find({}).populate({
        path: "subcategoryId",
        populate: {
            path: "categoryId"
        }
    }).then((productData)=>{
        res.render("viewProduct", {productData})
    })
}