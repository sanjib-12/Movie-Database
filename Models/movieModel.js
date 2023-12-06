const mongoose = require('mongoose');
const fs = require('fs');
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
        validate: {  //custom validation
            validator: function(value){
                return value >= 1 && value <= 10;
            },
            message: "Ratings should be above 1 and below 10."
        }
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
        required: [true, 'Genres is required field'],
        enum:{ 
            values: ["Action","Adventure","Animation","Comedy","Crime","Documentary","Drama","Family","Fantasy","Horror","Musical","Mystery","Romance","Sci-Fi","Thriller","War","Western"],
            message: "This genre does not exist."
        }
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
    },
    createdBy: String
    
},{
    toJSON:{virtuals: true},
    toObject: {virtuals: true}
});

movieSchema.virtual('durationInHour').get(function(){
    return (this.duration/60).toFixed(2);
})

//Below are the pre and post middleware for the document 
movieSchema.pre('save', function(next){
    this.createdBy="user1234";
    next();
})
movieSchema.post('save', function(doc, next){
    const content = `A new movie document with name ${doc.name} has been created by ${doc.createdBy}\n`;
    fs.writeFileSync('./Log/log.txt',content, {flag: 'a'}, (err)=>{
        console.log(err.message)
    })
    next();
})

//Below are the query middleware
//The regular expression /^find/ matches strings that start with the word "find"
movieSchema.pre(/^find/,function(next){
    this.find({releaseDate: {$lte: Date.now()}});
    this.startTime = Date.now() 
    next();
})

movieSchema.post(/^find/,function(docs,next){
    this.find({releaseDate: {$lte: Date.now()}})   
    this.endTime = Date.now();

    const content = `Quert took ${this.endTime - this.startTime} milliseconds to fetch the documnets\n`;
    fs.writeFileSync('./Log/log.txt',content, {flag: 'a'}, (err)=>{
        console.log(err.message)
    })
    next();
})


//this is the aggregation middleware.
movieSchema.pre('aggregate', function(next){
    this.pipeline().unshift({$match: {releaseDate: {$lte: new Date()}}});
    next();
})

const Movie = mongoose.model('Movie',movieSchema);

module.exports = Movie;