const mongoose = require("mongoose");

const Schema = mongoose.Schema({
    "title": {
        type: String,
        required: true
    },
    "genre": {
        type: String,
        required: true
    },
    "year": {
        type: Number,
        required: true
    },
    "poster": {
        type: String,
        required: true
    }
});

const firstSchema = mongoose.model("MovieStore",Schema);

module.exports = firstSchema;