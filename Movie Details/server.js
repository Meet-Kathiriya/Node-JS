const express = require("express");
const port = 1008;
const path = require("path");
const fs = require("fs");

const app = express();
const db = require("./config/db");
const Schema = require("./models/firstSchema");
const multer = require("./middlewares/multer");

app.set("view engine","ejs");
app.use(express.urlencoded({extended: true}));
app.use("/",express.static(path.join(__dirname,"public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/",async(req,res)=>{
    await Schema.find().then((data)=>{
        res.render("home",{data})
    })
})

app.get("/addmovie",(req,res)=>{
    res.render("addmovie")
})

app.post("/addmovie", multer.single('poster'), async(req,res)=>{
    req.body.poster = req.file.path
    await Schema.create(req.body).then(() => {
        res.redirect("/")
    })
})

app.get("/deletemovie", async(req,res)=>{
    let singleData = await Schema.findById(req.query.id)
    fs.unlinkSync(singleData.poster)
    await Schema.findByIdAndDelete(req.query.id).then(() => {
        res.redirect("/")
    })
})

app.get("/editmovie", async(req,res)=>{
    let singleData = await Schema.findById(req.query.id)
    res.render("editmovie", { singleData })
})

app.post("/updatemovie", multer.single('poster'), async(req,res)=>{
    let singleData = await Schema.findById(req.body.id)
    let img = ""

    req.file ? img = req.file.path : img = singleData.poster

    req.file && fs.unlinkSync(singleData.poster)

    req.body.poster = img

    await Schema.findByIdAndUpdate(req.body.id, req.body).then(() => {
        res.redirect("/")
    })
})

app.listen(port,(err)=>{
    err ? console.log(err) : console.log(`Server started on port ${port}`)
});