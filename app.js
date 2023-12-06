
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
//the below url will apply to all the url which do not match the proper route.
//it should be always defiend at the last so that it doesn't execute first.
app.all("*",(req, res, next)=>{
    res.status(404).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on the server`
    });
    next();
});

module.exports = app;

