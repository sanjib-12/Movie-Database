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
    
const validationErrorHandler = (err) =>{
    const errors = Object.values(err.errors).map(val => val.message);
    const errorMessages = errors.join('. ');
    const msg = `Invalid error messages: ${errorMessages}`;
    return new CustomError(msg, 400);
}
    
const handledExpiredJWT = (err) =>{
    return new CustomError('Jwt has expired, Please login in later',401);
}

const handledJWTError = (err) =>{
    return new CustomError('Invalid token,Please login agian',401); //401 means unauthorized
}

module.exports = (error, req, res, next) =>{
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';
    

    if(process.env.NODE_ENV === 'development'){
        devErrors(res, error);
    }else if(process.env.NODE_ENV === 'production'){
        

        if(error.name === 'CastError'){
            
            error = castErrorHandler(error);
        }
        if(error.code === 11000){
            
            error = duplicateKeyErrorHandler(error);
        }
        if(error.name === 'ValidationError'){
            
            error = validationErrorHandler(error)
        };
        if(error.name === 'TokenExpiredError'){
            
            error = handledExpiredJWT(error);
        };
        if(error.name === 'JsonWebTokenError'){
            
            error = handledJWTError(error);
        };
        prodErrors(res, error);
    }
    //next();
};