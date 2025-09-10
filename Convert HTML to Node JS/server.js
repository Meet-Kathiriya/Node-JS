const express = require("express")
const port = 1008
const path = require("path")

const app = express()

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
app.use("/",express.static(path.join(__dirname,"Apple")))

app.get("/", (req, res) => {
    res.render("index")

})

app.listen(port, (err) => {
    if (err) {
        console.log("Server not Found!!");
    } else {
        console.log("Server started on port =>" + port);
    }
})