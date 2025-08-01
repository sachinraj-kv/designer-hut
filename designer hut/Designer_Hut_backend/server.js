const express = require('express');


const env = require('dotenv');
const mongooseconnect = require('./connect/connection');
const app = require('./app/app');

env.config({path : '\.env'});
mongooseconnect()

const  port = process.env.PORT
console.log(port);


app.listen((port),()=> {
console.log(`server running on port ${port}`);
})