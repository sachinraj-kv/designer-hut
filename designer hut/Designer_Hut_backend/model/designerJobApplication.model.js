const mongoose =  require('mongoose')

const designerJobApplication = new mongoose.Schema({
    UserId : {

        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
    },
    job : {

        type :String,
        require : true
    },
    company_name : {

        type : String,
        require : true
    },
    jobtype : {

        type : String,
        require : true
    },
    logo : {

        type : String,
        require : true
    },
    recruiter_Id : {
        type : String,
        require : true
    }
})

const DesignerJobApplication = mongoose.model('DesignerJobApplication', designerJobApplication);

module.exports = DesignerJobApplication;







