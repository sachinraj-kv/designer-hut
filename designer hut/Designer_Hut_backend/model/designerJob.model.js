const mongoose = require('mongoose')

const designerjob = new mongoose.Schema({
    job_title: {
        type: String,
        require: true
    },
    company_name: {
        type: String,
        require: true
    },
    Description: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    salary: {
        type: String,
        require: true
    },
    job_type: {
        type: String,
        enum: ["remote", "onsite", "hybrid"],
        require: true
    },
    contact_information: {
        email: {
            type: String,
            require: true
        },
        phone: {
            type: String,
            require: true
        }
    },
    logo: {
        type: String,
        require: true
    },
    company_website: {
        type: String,
        require: true
    },
    UserId : {
        type : String, 
        require : true
    }

})

const Designerjob = mongoose.model('designerjob' , designerjob)

module.exports = Designerjob;