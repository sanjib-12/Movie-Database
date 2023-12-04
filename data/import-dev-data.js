const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Movie = require('./../Models/movieModel');

dotenv.config({path: './config.env'});

mongoose.connect(process.env.CONN_STR)
.then((conn)=>{    
    //console.log(conn);
    console.log('DB connection successfull');
}).catch((error) =>{
    console.log('error in connection.')
});


//READ MOVIESW.JSON FILE
const movies = JSON.parse(fs.readFileSync('./data/movies.json', 'utf-8'));

//DELETE EXISTING MOVIE DOCUMENTSW FORM COLLECTIONS
const deleteMovies = async () =>{
    try{
        await Movie.deleteMany()
        console.log('Data deleted successfully');
    }catch(err){
        console.log(err.message)
    }
    process.exit();
}

//IMPORT MOVIES DATA TO MONGOODB COLLECTION
const importMovies = async () =>{
    try{
        await Movie.create(movies);
        console.log('Data imported successfully');
    }catch(err){
        console.log(err.message)
    }
    process.exit();
}

//the process.argv[2] give the value of third index when we enter value from command line
// check using the console.log(process.argv[2])

if(process.argv[2] ==='--import'){
    importMovies()
}
if(process.argv[2] === '--delete'){
    deleteMovies();
}