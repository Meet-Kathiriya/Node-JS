const mongoose = require("mongoose")

const schema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Age: {
        type: Number,
        required: true
    },
    City: {
        type: String,
        required: true
    },
    Image: {
        type: String,
        required: true
    },
})

const firstSchema = mongoose.model("ApiCrud", schema)

module.exports = firstSchema;