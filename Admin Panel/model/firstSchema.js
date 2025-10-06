const mongoose = require("mongoose")

const Schema = mongoose.Schema({
     fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,   
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        required: false   
    },
     image: {
        type: String,
        required: true   
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const firstSchema = mongoose.model("Admin", Schema);

module.exports = firstSchema;