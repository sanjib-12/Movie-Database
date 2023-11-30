
const express = require('express');// this will return a function
const morgan = require('morgan');// this is a third party middleware which is used to log the data status

const moviesRouter = require('./Routes/moviesRoutes');

let app = express(); // This will return an objects


app.use(express.json());
app.use(morgan('dev'));


app.use('/api/v1/movies', moviesRouter);

module.exports = app;

