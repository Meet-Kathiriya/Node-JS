const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    subcatname: {
        type: String,
        required: true,
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: "category",
        required: true,
    }
});

const subCatSchema = mongoose.model("subCategory", AdminSchema);

module.exports = subCatSchema;
