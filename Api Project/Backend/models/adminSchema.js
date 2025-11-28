const mongoose = require("mongoose");

const Schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "admin"
    },
    createdAt: {
        type: String,
        required: true
    },
    otp: {
        type: String,
    },
    otpExpire: {
        type: String,
    }
});

const adminSchema = mongoose.model("Admin",Schema);

module.exports = adminSchema;