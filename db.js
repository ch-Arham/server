const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path:"./.env"});


const connectToMongo = ()=>{
    mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((data)=>console.log(`Connected to MongoDB with server: ${data.connection.host}:${process.env.PORT}`))
    .catch((err)=>console.log(`Connection Failed...err:${err}`));
     
}

module.exports = connectToMongo;