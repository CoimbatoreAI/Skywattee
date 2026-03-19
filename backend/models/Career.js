const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    postings: {
        type: Number,
        required: true,
        default: 1,
    },
    description: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Career", careerSchema);
