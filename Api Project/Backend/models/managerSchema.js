const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
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
        default: "manager"
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        require: true
    },
    status: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: String,
        required: true
    },
    otp: {
        type: String
    },
    otpExpire: {
        type: String
    }
})

const managerSchema = mongoose.model("Manager", schema)

module.exports = managerSchema;