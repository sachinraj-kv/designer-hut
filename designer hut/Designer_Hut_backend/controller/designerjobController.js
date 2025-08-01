const { validationResult } = require("express-validator");
const Designerjob = require("../model/designerJob.model");


exports.Designerjob = async (req, res) => {

       const result = validationResult(req);
            if (!result.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    message: result.array()
                })
            }
    

    const { job_title, company_name, Description, location, salary, job_type, contact_information , company_website } = req.body

    try {

        const logo = req.file.path

        console.log(logo);

        if(!logo){
            return res.status(404).json({
                succes : false ,
                message : 'image is required',
                data : console.log("image not found")
                
                
            })
        }

        const designjob = await Designerjob.create({
            job_title,
            company_name,
            Description,
            location,
            salary,
            logo : logo,
            job_type,
            contact_information,
            company_website
        })

        res.status(201).json({
            success: true,
            message: "job posted",
            designjob
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

exports.DesignerjobView = async(req ,res)=>{

    try {
            const jobview = await Designerjob.find();

            if(!jobview){
                res.status(404).json({
                    succes : false ,
                    message : "not found"
                })
            }

           

           

            res.status(200).json({
                success : true,
                message : 'fetch sucessfully',
                jobview
            });

            

    } catch (error) {
        res.status(500).json({
            success : false ,
            message : error.message
        })
    }
}

exports.DesignersJobview = async(req ,res)=>{
    const id = req.Prams.id

    if(!id){
        res.status(400).json({
            success : false,
            message : "not fund"
        })

        const User = await Designerjob.findById()
    }






















































}
