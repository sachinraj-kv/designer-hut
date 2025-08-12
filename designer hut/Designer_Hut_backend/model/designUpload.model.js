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
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    category : {
        type : String,
        required : true 
    }
})
    

const DesignUpload = mongoose.model('DesignUpload', designUploadSchema);

module.exports = DesignUpload;