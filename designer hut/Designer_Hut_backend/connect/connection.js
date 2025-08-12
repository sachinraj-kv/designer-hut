const mongoose = require('mongoose');
const env = require('dotenv');



env.config({path : '\.env'});

const mongooseconnect = () => {

    mongoose.connect(process.env.DB_URL)

    .then((data)=>{

        console.log(`database connected successfully to ${data.connection.host}`);
        
    })

    .catch((error)=>{
        console.log(error.message);
        
    })
} 

module.exports = mongooseconnect;