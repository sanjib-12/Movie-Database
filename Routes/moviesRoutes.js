const express = require('express');
const moviesController = require('./../Controllers/moviesController');

const router = express.Router();
router.route('/')
    .get(moviesController.getAllMovies)
    .post(moviesController.addMovies)

router.route('/:id')
    .get(moviesController.routParamId)
    .patch(moviesController.updateMovies)
    .delete(moviesController.deleteMovies)

 module.exports = router;