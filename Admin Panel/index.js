const express = require("express")
const port = process.env.PORT || 1008;
const path = require("path")
const cookie = require("cookie-parser")

const app = express()
const db = require("./config/db")

app.set("view engine", "ejs");
app.use(express.urlencoded({extended : true}));
app.use("/uploads", express.static(path.join(__dirname, "uploads")))
app.use(express.static(path.join(__dirname, "public")))
app.use(cookie())

app.use("/", require("./Router/router"))


app.listen(port, (err) => {
    err ? console.log(err) : console.log("Server is Started -> " + port);
})