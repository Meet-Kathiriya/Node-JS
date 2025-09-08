const express = require("express")
const port = 1008

const app = express()

let student = [
    
]

app.set("view engine", "ejs")
app.use(express.urlencoded({extended:true}))

app.get("/", (req, res) => {
    res.render("index", { student })

})

app.post("/addData",(req,res)=>{
    req.body.id = student.length+1
    student.push(req.body)
    res.redirect("/")
})

app.get("/deleteData/:id",(req,res)=>{
    let newData = student.filter((item)=>item.id!=req.params.id)
    student = newData
    res.redirect("/")
})

app.get("/editData",(req,res)=>{
    let singleData = student.find((item)=>item.id == req.query.id)
    res.render("edit",{singleData})
})

app.post("/updateData",(req,res)=>{
    console.log(req.body);
    let singleData = student.find((item)=>item.id == req.body.id)
    singleData.name = req.body.name
    singleData.age = req.body.age
    res.redirect("/")
})

app.listen(port, (err) => {
    if (err) {
        console.log("Server not Found!!");
    } else {
        console.log("Server started on port ->" + port);
    }
})