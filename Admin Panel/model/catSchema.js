const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    catname: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
});

const catSchema = mongoose.model("category", AdminSchema);

module.exports = catSchema;
