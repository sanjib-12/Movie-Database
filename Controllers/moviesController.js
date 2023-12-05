//const { param } = require('../Routes/moviesRoutes');
//const { query } = require("express");
const Movie = require("./../Models/movieModel")
const Apifeatures = require('./../Utils/ApiFeatures');

exports.getHighestRated = (req, res, next) =>{
    req.query.limit = '5';
    req.query.sort = '-ratings';

    next();
}




exports.getAllMovies = async (req,res) =>{
   
    try{
        console.log("params" + req.query)
        const features = new Apifeatures(Movie.find(), req.query).filter().sort().limitFields().paginate();
        const movies = await features.query;
    /*    
        console.log(req.query.duration, req.query.rating*1);
        console.log(req.query)
        const excludeFiels = ['sort', 'page', 'limit', 'fields'];
        
        const queryObj = {...req.query};
        
        excludeFiels.forEach(el =>{
            delete queryObj[el];
        })
        console.log(queryObj);
        
        const movies = await Movie.find({ duration: {$gte: queryObj.duration *1}, ratings: { $gte: queryObj.rating *1 } });
         
        const movies = await Movie.find(req.query);

    
    */    
        
        res.status(200).json({
            stauts: 'success',
            length: movies.length,
            data: {
                movies: movies
            }

        })
    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }

}

exports.getMovie = async (req,res) =>{
    try{
        //const movie = await Movie.find({_id: req.params.id});
        const movie = await Movie.findById(req.params.id);
        res.status(200).json({
            stauts: 'success',
        
            data: {
                movie: movie
            }

        })
    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }

}

exports.addMovies = async (req,res) =>{
    try{
        const movie = await Movie.create(req.body);

        res.status(200).json({
            stauts: 'success',
            data: {
                movie: movie
            }

        })
    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.updateMovies = async (req, res) => {
    try{
        
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        console.log.apply(movie)
        res.status(200).json({
            stauts: 'success',
            data: {
                movie: movie
            }

        })
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.deleteMovies = async (req, res)=>{
    try{
        //const movie = await Movie.find({_id: req.params.id});
        const movie = await Movie.findByIdAndDelete(req.params.id);
        res.status(204).json({        //204 means no content.
            stauts: 'success',
        
            data: null

        })
    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}

exports.getMovieStats = async (req, res) =>{
    try{
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

    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}

exports.getMovieByGenre = async (req,res) =>{
    try{
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

    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}