const express = require("express");
const port = 1008;
const path = require("path");

const app = express();
const db = require("./config/db");
const Schema = require("./models/firstSchema");

app.set("view engine","ejs");
app.use(express.urlencoded({extended: true}));
app.use("/",express.static(path.join(__dirname,"public")));

app.get("/",async(req,res)=>{
    await Schema.find().then((data)=>{
        res.render("home",{data})
    })
})

app.get("/addbook",(req,res)=>{
    res.render("addbook")
})

app.post("/addbook",async(req,res)=>{
    await Schema.create(req.body).then(()=>{
        res.redirect("/")
    })
})

app.get("/deletebook",async(req,res)=>{
    await Schema.findByIdAndDelete(req.query.id).then(()=>{
        res.redirect("/")
    })
})

app.get("/editbook",async(req,res)=>{
    let singleData = await Schema.findById(req.query.id)
    res.render("editbook",{singleData})
})

app.post("/updatebook",async(req,res)=>{
    await Schema.findByIdAndUpdate(req.body.id,req.body).then(()=>{
        res.redirect("/")
    })
})

app.listen(port,(err)=>{
    err ? console.log(err) : console.log(`Server started on port ${port}`)
});