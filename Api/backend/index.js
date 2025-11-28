const express = require("express");
const cors = require('cors');
const port = 1008;
const path = require("path")

const app = express();
const db = require("./config/db")

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use("/uploads",express.static(path.join(__dirname,"uploads")))
app.use(cors({
    credentials:true,
    origin:["http://localhost:5173/"]
}));

app.use("/",require("./routes/route"))
app.use("/auth",require("./routes/authRoute"))

app.listen(port,(err)=>{
    err ? console.log(err) : console.log(`Server started on port ${port}`)
})