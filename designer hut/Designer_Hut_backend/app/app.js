const express = require('express');
const router = require('../routes/user.routes');
const cors = require('cors')
const designjobrouter = require('../routes/designjob.routes');
const designuploadrouter = require('../routes/design.uploadroutes');
const cookieparser = require('cookie-parser')

const app = express();

app.use(cookieparser())

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173'
}))

app.use(router);
app.use(designuploadrouter);
app.use(designjobrouter);

module.exports = app ;