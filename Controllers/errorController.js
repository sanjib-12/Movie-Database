const CustomError = require('./../Utils/CustomError');

const devErrors=(res, error) =>{
    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
        stackTree: error.stack,
        error: error
    });
}
const prodErrors=(res, error) =>{
    if(error.isOperational){
        res.status(error.statusCode).json({
            status: error.statusCode,
            message: error.message
        });
    }else {
        res.status(500).json({
            status: 'error',
            message: 'something went wrong please try again!'
        })
    }
}

const castErrorHandler=(err)=>{
    const msg = `Invalid value for ${err.path}: ${err.value}!`;
    return new CustomError(msg, 400)
}

const duplicateKeyErrorHandler = (err) =>{
    const name = err.keyValue.name;
    const msg = `There is already a movie with name '${name}'.Please use another name!`;
    return new CustomError(msg, 400);
}
    


module.exports = (error, req, res, next) =>{
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';
    

    if(process.env.NODE_ENV === 'development'){
        devErrors(res, error);
    }else if(process.env.NODE_ENV === 'production'){
        console.log(error)

        if(error.name === 'CastError'){
            
            error = castErrorHandler(error);
        }
        if(error.code === 11000){
            
            error = duplicateKeyErrorHandler(error);
        }
        prodErrors(res, error);
    }
    //next();
};