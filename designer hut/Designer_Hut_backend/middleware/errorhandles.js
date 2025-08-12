
const customErrhandle = (err ,req ,res ,next)=>{

  console.log("error in the erroer handleing middleware",err.kind
  );
  
 invalid_id(err ,res)
 search_undefinned(err , res)

  res.status(500).json({
    success : false,
    message : err.message
  })

};

module.exports = customErrhandle;



                                                                    // error function start
const invalid_id = (err , res)=>{
 if (err.name === "CastError" && err.kind === "ObjectId") {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format"
    });
  }
}

const ivalid_typerror = (err ,res)=>{
  if(err.name === "TypeError" && err.kind == "undefined" ){
      return res.status(400).json({
            success: false,
            message: "Invalid data type or undefined value accessed",
            details: err.message
        });
  }
} 

const search_undefinned = (err , res)=>{
  if(err.name === "ReferenceError" && err.kind === "undefined"){
    return res.status(400).json({
      success : false ,
      message : "not found"
    })
  }
}
