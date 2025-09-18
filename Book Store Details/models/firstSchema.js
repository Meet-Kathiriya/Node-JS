const mongoose = require("mongoose");

const Schema = mongoose.Schema({
    "title": {
        type: String,
        required: true
    },
    "author": {
        type: String,
        required: true
    },
    "category": {
        type: String,
        required: true
    },
    "price": {
        type: Number,
        required: true
    },
    "description": {
        type: String,
        required: true
    }
});

const firstSchema = mongoose.model("BookStore",Schema);

module.exports = firstSchema;