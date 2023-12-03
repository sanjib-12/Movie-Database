const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        requried: [true,'Name is required field!'],
        unique: true
    },
    description: String,
    duration: {
        type: Number,
        required: [true,'duration is required field!']
    },
    ratings: {
        type: Number,
        default: 0.0
    },
});

const Movie = mongoose.model('Movie',movieSchema);

module.exports = Movie;