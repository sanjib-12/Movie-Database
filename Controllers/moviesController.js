const fs = require('fs')

const movies =JSON.parse(fs.readFileSync('./data/movies.json'));

exports.checkId = (req, res, next, value) =>{
    console.log('movie Id is ' + value);

    let movie = movies.find(el => el.id === value * 1);

    if(!movie){
        return res.status(404).json({
              stauts: "fail",
              message: 'movie with ID ' + value + 'is not found'
          })
    }

    next();

}


exports.getAllMovies = (req,res) =>{
       
    res.status(200).json({
        status:"success",
        count:movies.length,
        data: {
            movies:movies
        }
       
    }) ;
    console.log("main api") 
}

exports.routParamId = (req,res) =>{
    //console.log(req.params.id);
    const id = req.params.id * 1; // here this will make the id to integer
    const result = movies.filter((word) =>{
        return (word.id === parseInt(req.params.id) || word.name === req.params.name)
    })
    //console.log(result.length<1);
    // if(result.length<1){
    //   return res.status(404).json({
    //         stauts: "fail",
    //         message: 'movie with ID' + id + 'is not found'
    //     })
    // }
    res.status(200).json({
        status:"success",
        count:result.length,
        data: {
            movies:result
        }
    }) ;
}

exports.addMovies = (req,res) =>{
    //console.log(req.body);
    const newId = movies[movies.length-1].id+1;

    const newMovie = Object.assign({id: newId}, req.body);

    movies.push(newMovie);

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) =>{
        res.status(201).json({
            stauts: "success",
            data:{
                movie: newMovie
            }
        })
    });
   // res.send('created');
}

exports.updateMovies = (req, res) => {
    let id = req.params.id* 1;
    console.log('id' + id)
    let movieToUpdate =  movies.find(el => el.id === id);
    // if(!movieToUpdate){
    //    return res.status(404).json({
    //         status: 'fial',
    //         message: "there is no movie with id :"+id
    //     })
    // }
    let index = movies.indexOf(movieToUpdate);
    const updatedMovieObject = Object.assign(movieToUpdate, req.body);
    console.log(updatedMovieObject)
    movies[index] = updatedMovieObject;
    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
        res.status(200).json({
            stauts: "success",
            data:{
                movie: updatedMovieObject 
            }
        })
    })
}

exports.deleteMovies = (req, res)=>{
    const id = req.params.id * 1;
    const movieToDelete = movies.find(el => el.id === id);

    // if(!movieToDelete){
    //     return res.status(404).json({
    //          status: 'fial',
    //          message: "there is no movie with id :"+id
    //      })
    //  }
    const index = movies.indexOf(movieToDelete);

    movies.splice(index,1);
    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
        res.status(204).json({
            stauts: "success",
            data:{
                movie: null
            }
        })
    })
}

