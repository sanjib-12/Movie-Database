
const express = require('express');// this will return a function
const morgan = require('morgan');// this is a third party middleware which is used to log the data status

const moviesRouter = require('./Routes/moviesRoutes');
const CustomError = require('./Utils/CustomError');
const globalErrorHandler = require('./Controllers/errorController');
let app = express(); // This will return an objects


app.use(express.json());
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use(express.static('./public/'))

app.use('/api/v1/movies', moviesRouter);

app.all("*",(req, res, next)=>{
    // res.status(404).json({
    //     status: 'fail',
    //     message: `Can't find ${req.originalUrl} on the server`
    // });
    const err = new CustomError(`Can't find ${req.originalUrl} on the server`, 404);
    
    next(err); 
});

//custom middleware to handle the error.
app.use(globalErrorHandler)

module.exports = app;

