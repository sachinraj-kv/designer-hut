const { validationResult } = require("express-validator");
const DesignUpload = require("../model/designUpload.model");

exports.uploadDesign = async (req, res) => {



    const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: result.array()
            })
        }
    const id = req.params.id

    console.log("req.params.id",req.params.id);
    

    console.log("id",id);
    
    const {title , about , category} = req.body;

    if(!title || !about || !category ){
      return  res.status(400).json({
            success : false ,  
            message : "plz  fill the fileds"
        })
    }
    
    try {
 
        const imageUrl = req.file.path;

        console.log(imageUrl);
        

        if(!imageUrl) {
            return res.status(400).json({ 
                success : false,
                message : 'image is required'
            })
        }  



        const design = await DesignUpload.create({
            title,
            images: imageUrl,
            about,
            category,
            UserId : id
        });

        res.status(201).json({
            success: true,
            message: "Design uploaded successfully",
            design
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "upload failed",
            error: error.message
        });
        
    }
}

exports.uploadDesignView = async (req ,res)=>{
    try {
        
        const uploadView = await DesignUpload.find()

        res.status(200).json({
            success : true,
            message : "fetch successfully",
            uploadView
        })

        

    } catch (error) {
        res.status(500).json({
            success : false ,
            message :  error.message
        })
    }
}

exports.uploadedFileView = async (req ,res)=>{
    const id = req.params.id


    

    if(!id){
        return res.status(400).json({
            success  : false ,
            message : "not found"
        })
    }
    try {
         const upload_Data =  await DesignUpload.find({UserId :id })

    if(!upload_Data){
        return res.status(404).json({
            success  : false ,
            message : "not found"
        })
    }

    res.status(200).json({
        success : true,
        message : "fetch data succeessfully",
        upload_Data
    })
    } catch (error) {
        res.status(500).json({
            success : false ,
            message : error.message
        })
    }
   


}

exports.detailed_Upload = async (req ,res )=>{
    const id = req.params.id 


    if(!id){
       return res.status(400).json({
            success : false  ,
            message : "not found"
        })
    }
        try {
               const upload_details =  await DesignUpload.find({_id : id })

    if(!upload_details){
        return res.status(404).json({
            success : false ,
            message : "not found"
        })
    }

    res.status(200).json({
        success : true,
        message : "details found",
        upload_details
    })


        } catch (error) {
            res.status(500).json({
                success : false ,
                message  : error.message
            })
        }
 


}

