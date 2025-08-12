const express = require('express');
const env = require('dotenv');
const mongooseconnect = require('./connect/connection');
const app = require('./app/app');
const DesignUpload = require('./model/designUpload.model');

env.config({path : '\.env'});


const  port = process.env.PORT
console.log(port);

 mongooseconnect();
    
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

