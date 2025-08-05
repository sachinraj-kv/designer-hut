const jwt = require('jsonwebtoken')

exports.authorization = async(req ,res ,next)=>{

    const user_Token = req.cookies.token;

    console.log("req.cookie",req.cookies);
    

    console.log("token",user_Token);
    
    jwt.verify(user_Token,process.env.SECRET_KEY,(err , decode)=>{
        if(err){
            res.status(401).json({
                success : false,
                message : err.message
                
            })
        }
        console.log("decode",decode);
        
        req.id = decode.id
        req.role = decode.role
        
   
    })
   next()

}

exports.authorizedRole = (...existRole)=>{
    return(req ,res,next)=>{
        const role = req.role;

        if(!role.includes(existRole)){
            return res.status(401).json({
                success : false,
                message:"unautjorized access"
            })
        }
        next()
    }
}