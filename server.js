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

const port = process.env.PORT || 3000;

app.listen(port,() =>{
    console.log('Server has started...');
})

