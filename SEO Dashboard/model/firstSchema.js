const mongoose = require("mongoose");

const Schema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contactno: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }    
});

const firstSchema = mongoose.model("admins", Schema);

module.exports = firstSchema;