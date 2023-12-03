const Movie = require("./../Models/movieModel")


exports.getAllMovies = (req,res) =>{

}

exports.getMovie = (req,res) =>{

}

exports.addMovies = async (req,res) =>{
    try{
        const movie = await Movie.create(req.body);

        res.status(201).json({
            stauts: 'success',
            data: {
                movie: movie
            }

        })
    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.updateMovies = (req, res) => {

}

exports.deleteMovies = (req, res)=>{
   
}

