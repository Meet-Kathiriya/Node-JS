const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/AdminPanelMVC");

const db = mongoose.connection;

db.once("open", (err) => {
   err ? console.log(err) : console.log("DB connected!!");
})

module.exports = db
