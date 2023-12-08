const User = require('./../Models/userModel');
const asyncErrorHandler = require('./../Utils/asyncErrorHandler');
const jwt = require('jsonwebtoken')
const CustomError = require('./../Utils/CustomError')

const signToken = id =>{
    return jwt.sign({id: id},process.env.SECRET_STR,{expiresIn: process.env.LOGIN_EXPIRES})
}

exports.signup = asyncErrorHandler(async (req, res, next) =>{
    console.log(process.env.LOGIN_EXPRIES)
    console.log(process)
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
})