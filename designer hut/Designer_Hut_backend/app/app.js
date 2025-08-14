const express = require('express');
const router = require('../routes/user.routes');
const cors = require('cors')
const designjobrouter = require('../routes/designjob.routes');
const designuploadrouter = require('../routes/design.uploadroutes');
const cookieparser = require('cookie-parser');
const customErrhandle = require('../middleware/errorhandles');
const routers = require('../routes/DesignerJobApplicationroute');
const { authorization } = require('../middleware/authorization');



const app = express();

app.use(cookieparser())

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors({
  // origin: "https://designhut-app.onrender.com",
  origin : "http://localhost:5173",
  credentials: true
}));


app.use('/user',router);
app.use('/upload',designuploadrouter);
app.use('/job',designjobrouter);
app.use('/recruit',authorization , routers)

app.use(customErrhandle)


 

module.exports = app;