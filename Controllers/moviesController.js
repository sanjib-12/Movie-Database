//const { param } = require('../Routes/moviesRoutes');
//const { query } = require("express");
const CustomError = require("../Utils/CustomError");
const Movie = require("./../Models/movieModel")
const Apifeatures = require('./../Utils/ApiFeatures');
const asyncErrorHandler = require('./../Utils/asyncErrorHandler');


exports.getHighestRated = (req, res, next) =>{
    req.query.limit = '5';
    req.query.sort = '-ratings';

    next();
}




exports.getAllMovies = asyncErrorHandler(async (req,res,next) =>{
    
        const features = new Apifeatures(Movie.find(), req.query)
                                    .filter()
                                    .sort()
                                    .limitFields()
                                    .paginate();
        const movies = await features.query;
        
        
        res.status(200).json({
            stauts: 'success',
            length: movies.length,
            data: {
                movies: movies
            }

        })
    

});





exports.getMovie = asyncErrorHandler(async (req,res,next) =>{
    
        //const movie = await Movie.find({_id: req.params.id});
        const movie = await Movie.findById(req.params.id);
        console.log(req.params.id)
        
        if(!movie){
            const error = new CustomError(`Movie with ${req.params.id} is not found`, 404);
            return next(error);
        }

        res.status(200).json({
            status: 'success',
        
            data: {
                movie: movie
            }

        })
    

});






exports.addMovies = asyncErrorHandler(async (req,res,next) =>{
    
        const movie = await Movie.create(req.body);

        res.status(200).json({
            stauts: 'success',
            data: {
                movie: movie
            }

        })
   
});

exports.updateMovies = asyncErrorHandler(async (req, res, next) => {
    
        
        const updateMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if(!updateMovie){
            const error = new CustomError(`Movie with ${req.params.id} is not found`, 404);
            return next(error);
        }
        res.status(200).json({
            stauts: 'success',
            data: {
                movie: movie
            }

        })
    
});

exports.deleteMovies = asyncErrorHandler(async (req, res, next)=>{
        
        //const movie = await Movie.find({_id: req.params.id});
        const movieDeleted = await Movie.findByIdAndDelete(req.params.id);

         if(!movieDeleted){
            const error = new CustomError(`Movie with ${req.params.id} is not found`, 404);
            return next(error);
        }

        res.status(204).json({        //204 means no content.
            status: 'success',
            data: null
        })
    
});

exports.getMovieStats = asyncErrorHandler(async (req, res, next) =>{
    
        const stats = await Movie.aggregate([
            {$match: {ratings:{$gte:4}}},
            {$group :{
                _id: '$releaseYear',
                avgRarting:{$avg: '$ratings'},
                avgPrice: { $avg: '$price' },
                minPrice: { $min: '$price'},
                maxPrice: { $max: '$price'},
                priceTotal: { $sum: '$price'},
                movieCount: { $sum: 1}
            }},
            {$sort: {minPrice: 1}}
        ]);

        res.status(200).json({
            stauts: 'success',
            length: stats.length,
            data: {
               stats
            }
        })

    
});

exports.getMovieByGenre = asyncErrorHandler(async (req,res, next) =>{
    
        const genre = req.params.genre;
        console.log(genre)
        const movie = await Movie.aggregate([
            {$unwind: '$genres'},
            {$group: {
                _id:'$genres',
                movieCount: {$sum: 1},
                movies:{$push:'$name'}
            }},
            {$addFields : {genre: "$_id"}},
            {$project: {_id: 0}},
            {$sort: {movieCount : -1}},
            {$match:{genre: genre}}
            

        ]);

        res.status(200).json({
            stauts: 'success',
            length: movie.length,
            data: {
               movie
            }
        })
});