const dotenv = require('dotenv');
dotenv.config({path: './config.env'});//this should always come before any import.

const app = require('./app');

console.log(process.env);

const port = process.env.PORT || 3000;

app.listen(port,() =>{
    console.log('Server has started...');
})

//we can access environment variable form all the file using the process.env becasue process
// is sync to all no matter whether we are in which file. 
//dotenv.config({path: './config.env'}) this allows us to access the process for config.env files.