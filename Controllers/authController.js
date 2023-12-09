const User = require('./../Models/userModel');
const asyncErrorHandler = require('./../Utils/asyncErrorHandler');
const jwt = require('jsonwebtoken')
const CustomError = require('./../Utils/CustomError')
const util = require('util')

const signToken = id =>{
    return jwt.sign({id: id},process.env.SECRET_STR,{expiresIn: process.env.LOGIN_EXPIRES})
}

exports.signup = asyncErrorHandler(async (req, res, next) =>{
    //console.log(process.env.LOGIN_EXPRIES)
   // console.log(process)
    const newUser = await User.create(req.body);

    const token = signToken(newUser._id);
    
    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newUser
        }
    })
});

exports.login = asyncErrorHandler(async(req, res, next) => {
    const{email, password} = req.body;
    
    if(!email || !password){
        const error = new CustomError('Please Provide email ID & Password for login in!', 400);
        return next(error);
    }
    
    //Check if user exists with given email or not:
    const user = await  User.findOne({email}).select('+password');
    
    //const isMatch = User.comparePasswordInDb(password, user.password);

    //check if the user exists and password matches.
    if(!user || !(await user.comparePasswordInDb(password, user.password))){
        const error = new CustomError('Incorrect email or password', 400);
        return next(error);
    }
    
    const token = signToken(user._id);

    res.status(200).json({
        status: 'success',
        token,
        user,
        
        
    })
});

exports.protect = asyncErrorHandler(async(req, res, next) =>{
    //Reading the token and checking its existance.
    const testToken = req.headers.authorization
    let token;
    if(testToken && testToken.startsWith('Bearer')){
         token = testToken.split(' ')[1];
    }
    if(!token){
        next(new CustomError('You are not logged in!', 401))
    }
    
    //Validating the token
    const decodedToken = await util.promisify(jwt.verify)(token,process.env.SECRET_STR);
    
    //if the user exists find the user
    const user = await User.findById(decodedToken.id);
    if(!user){
        const error = new CustomError('The user with the given token does not exist', 401);  
        next(error);
    }

    //if the user changed pasword after the token was issued.
    const isPasswordChanged = await user.isPasswordChanged(decodedToken.iat);
     if(isPasswordChanged){
        const error = new CustomError('the password has been changed recently. Please login agian', 401);
        return next(error);
     }

     //allow user to access route
     req.user = user;
     next();
})

exports.restrict = (role) => {
    return (req, res, next) =>{
        console.log(req.user.role)
        if(req.user.role !== role){
            console.log('inside error')
            const error = new CustomError('You do not have permission to perform this action',403);
            next(error);
        }
        console.log('outside error')
        next();
    }
}