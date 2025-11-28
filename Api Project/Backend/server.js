const express = require("express");
const port = 1008;

const app = express();
const db = require("../Backend/config/db");

app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.use("/admin", require("../Backend/routes/adminRoute"));
app.use("/manager", require("../Backend/routes/managerRoute"));
app.use("/employee", require("../Backend/routes/employeeRoute"));

app.listen(port,(err)=>{
    err ? console.log(err) : console.log(`Server started on port ${port}`)
});