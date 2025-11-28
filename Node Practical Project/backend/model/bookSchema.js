const mongoose = require("mongoose")
const schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    libraryCard: {
        type: String,
        required: true
    }
})

const bookSchema = mongoose.model("book", schema)
module.exports = bookSchema