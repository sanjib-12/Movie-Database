const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        requried: [true,'Name is required field!'],
        unique: true,
        trim: true
    },
    description: {
        type: String,
        requried: [true,'Description is required field!'],
        trim: true
    },
    duration: {
        type: Number,
        required: [true,'duration is required field!']
    },
    ratings: {
        type: Number,
        default: 0.0
    },
    totalRating: {
        type: Number
    },
    releaseYear: {
        type: Number,
        required: [true, 'release year is required field!']
    },
    releaseDate: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    genres: {
        type: [String],
        required: [true, 'Genres is required field']
    },
    directors: {
        type : [String],
        required: [true, 'Directors is required field!']
    },
    coverImage: {
        type: String,
        required: [true, 'Cover Image is requried field!']
    },
    actors: {
        type : [String],
        requried: [true, 'actors is required field!'] 
    },
    price: {
        type: Number,
        required: [true, 'Price is a requred field!']
    }
});

const Movie = mongoose.model('Movie',movieSchema);

module.exports = Movie;