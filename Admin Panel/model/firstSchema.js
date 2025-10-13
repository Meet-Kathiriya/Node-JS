const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
        required: true,
    },
    contactNo: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        enum: ["Super Admin", "Admin", "Editor", "Moderator", "Author", "Viewer"],
        default: "Viewer",
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active",
    },
    image: {
        type: String,
        required: true,
    },
});

const Admin = mongoose.model("admins", AdminSchema);
module.exports = Admin;
