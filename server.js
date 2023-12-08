const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});//this should always come before any import.

//Handeling uncaught exceptions
process.on('uncaughtException',(err) =>{
    console.log(err.name, err.message);
    console.log('unhandled Exception occured! Sutting down!');
    process.exit(1);
})

const app = require('./app');

//console.log(process.env);

mongoose.connect(process.env.CONN_STR)
.then((conn)=>{    
    //console.log(conn);
    console.log('DB connection successfull');
})//.catch((error) =>{
//     console.log('error in connection.')
// })

const port = process.env.PORT || 3000;

const server = app.listen(port,() =>{
    console.log('Server has started...');
})

//handeling undefined promises
process.on('unhandledRejection',(err) =>{
    console.log(err.name, err.message);
    console.log('unhandled rejection occured! Sutting down!');
    server.close(() => {
        process.exit(1);
    })
})




