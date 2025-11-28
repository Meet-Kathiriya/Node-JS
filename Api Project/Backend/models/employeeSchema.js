const mongoose = require("mongoose")

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
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    managerId: {
        type: mongoose.Types.ObjectId,
        ref: "Manager",
        required: true
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
        type: String,
    },
    otpExpire: {
        type: String,
    }
})

const employeeSchema = mongoose.model("Employee",schema)

module.exports = employeeSchema