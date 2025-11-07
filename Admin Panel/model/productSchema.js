const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    productname: {
        type: String,
        required: true,
    },
    subcategoryId: {
        type: mongoose.Types.ObjectId,
        ref: "subCategory",
        required: true,
    }
});

const product = mongoose.model("product", AdminSchema);

module.exports = product;
