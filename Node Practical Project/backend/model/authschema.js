const mongoose = require("mongoose")
const schema = mongoose.Schema({
    "username":{
        type:String,
        required:true
    },
    "email":{
        type:String,
        required:true
    },
    "password":{
        type:String,
        required:true
    },
    "role":{
        type:String,
        enum:['admin','user']
    }
}) 

const authschema = mongoose.model("user",schema)
module.exports = authschema