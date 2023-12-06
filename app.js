
const express = require('express');// this will return a function
const morgan = require('morgan');// this is a third party middleware which is used to log the data status

const moviesRouter = require('./Routes/moviesRoutes');

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
    const err = new Error(`Can't find ${req.originalUrl} on the server`);
    err.status = 'fail';
    err.statusCode = 404;
    //if we pass anything in the next function it will consider it as a error.
    next(err); 
});

//custom middleware to handle the error.
app.use((error, req, res, next) =>{
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';
    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message
    })
    next();
})

module.exports = app;

