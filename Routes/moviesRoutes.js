const express = require('express');
const moviesController = require('./../Controllers/moviesController');
const authController = require('./../Controllers/authController'); 

const router = express.Router();

//The following middleware will apply only to the url which contain id.   
//router.param('id', moviesController.checkId)

router.route('/highest-rated')
    .get(moviesController.getHighestRated,moviesController.getAllMovies);

router.route('/movie-stats')
    .get(moviesController.getMovieStats);

router.route('/movie-genre/:genre')
    .get(moviesController.getMovieByGenre);

router.route('/')
    .get(authController.protect,moviesController.getAllMovies)
    .post(moviesController.addMovies)

router.route('/:id')
    .get(moviesController.getMovie)
    .patch(moviesController.updateMovies)
    .delete(moviesController.deleteMovies)

 module.exports = router;