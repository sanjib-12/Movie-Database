const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});//this should always come before any import.

const app = require('./app');

//console.log(process.env);

mongoose.connect(process.env.CONN_STR)
.then((conn)=>{    
    //console.log(conn);
    console.log('DB connection successfull');
}).catch((error) =>{
    console.log('error in connection.')
})

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        requried: [true,'Name is required field!'],
        unique: true
    },
    description: String,
    duration: {
        type: Number,
        required: [true,'duration is required field!']
    },
    ratings: {
        type: Number,
        default: 0.0
    },
});

//const movie = mongoose.model('movie','movieSchema');

const port = process.env.PORT || 3000;

app.listen(port,() =>{
    console.log('Server has started...');
})

