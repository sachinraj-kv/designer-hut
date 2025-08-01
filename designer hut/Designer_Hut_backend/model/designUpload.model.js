const mongoose = require('mongoose');

const designUploadSchema = new mongoose.Schema({

    title : {
        type : String ,
        required : true
    },
    images : {
        type : String,
        required : true 
    },
    about : {
        type : String,
        required : true
    },
    UserId : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true 
    }
})

const DesignUpload = mongoose.model('DesignUpload', designUploadSchema);

module.exports = DesignUpload;