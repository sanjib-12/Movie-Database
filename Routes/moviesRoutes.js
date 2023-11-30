const express = require('express');
const moviesController = require('./../Controllers/moviesController');

const router = express.Router();

//The following middleware will apply only to the url which contain id.   
router.param('id', moviesController.checkId)

router.route('/')
    .get(moviesController.getAllMovies)
    .post(moviesController.validateBody,moviesController.addMovies)

router.route('/:id')
    .get(moviesController.routParamId)
    .patch(moviesController.updateMovies)
    .delete(moviesController.deleteMovies)

 module.exports = router;