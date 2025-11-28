const express = require("express")
const port = 1008
const cors = require("cors")
const db = require("./config/db")

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))

app.use("/",require("./routes/route"))

app.listen(port,(err)=>{
    err ? console.log(err) : console.log("Server started on port "+ port)
})