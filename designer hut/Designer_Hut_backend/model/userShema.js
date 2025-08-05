const mongoose = require('mongoose')

const userShema = new mongoose.Schema({
    name : {
        type : String,
        required : true 
    },   
    email :{
         type : String,
         required : true,
         unique : [true , "Email already Exists"]
    },
    password : {
        type : String,
        required : true
    },
    role : { 
        type : String,
        default : "user",
        enum:["Web Designer","Branding" ,"Illustration","UI/UX","Product Design","Logo Design","user" ]
       
    }
})

const User = mongoose.model('user', userShema);

module.exports = User;

