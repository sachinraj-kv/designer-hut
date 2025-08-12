const { validationResult } = require("express-validator");
const DesignUpload = require("../model/designUpload.model");
const customErrhandle = require("../middleware/errorhandles");


exports.uploadDesign = async (req, res,next) => {

    const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: result.array()
            })
        }
    
      

    const id = req.id
    

    if(!id){
        res.status(404).json({
            success : false,
            message  : "please login"
        })
    }

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

        console.log("design",design);
        

         const populateuser = await DesignUpload.findById(design._id).populate('UserId' , 'name email')

        console.log("populateuser",populateuser);

        res.status(201).json({
            success: true,
            message: "Design uploaded successfully",
            design
        });

    } catch (error) {
       customErrhandle(error).send("Something went wrong")

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

exports.search_method = async (req, res , next) => {
    
    const { query } = req.body;

    console.log("query",query);
    


    if (!query) {
        return res.status(400).json({
            success: false,
            message: "Search query is required"
        });
    }

    try {

     const uploads = await DesignUpload.find({ title : { $regex: query } } || {about :{$regex : query} } || {category : {$regex : query} });
// await DesignUpload.find({$and:[{ title : { $regex: query } },]})
       console.log("regex_upload",uploads);
       
        
        if (!uploads || uploads.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No uploads found"
            });
        }

        res.status(200).json({
            success: true,
            results: uploads
        });

    } catch (error) {
       next(error);
    }
    
}

exports.uplodedfiledelete = async(req ,res,next) =>{
   
    const id = req.params.id

    console.log("id",id);
    
    
        
    if(!id && id.length === 0 ){
        return res.status(400).json({
            success : false,
            message : "not found"
        })
    }
    try {
        const upload_Delete = await DesignUpload.findByIdAndDelete(id)

        console.log("upload_Delete",upload_Delete);
        
    if(!upload_Delete || upload_Delete.length === 0){
        return res.status(404).json({
            success : false,
            message : "not found"
        })
    }

    res.status(200).json({
        success : true,
        message :"deleted"
    })

    } catch (error) {
        next(error)
    }
}


