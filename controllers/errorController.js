const AppError=require('../utils/appError')

const handleCastErrorDB=err=>{
    const message=`Invalid ${err.path}:${err.value}.`
    return new AppError(message,400)
}

const handleDuplicateFieldsDB=err=>{
    const message=`Duplicate field value:${err.keyValue.name}. Please use another value!`
    return new AppError(message,400)
}

const handleValidationErrorDB=err=>{
    const errors=Object.values(err.errors).map(el=>el.message);
    const message=`Invalid inputdata. ${errors.join('.')}`
    return new AppError(message,400)
}

const sendErrorDev=(err,req,res)=>{
    //API
    if(req.originalUrl.startsWith('/api')){
        res.status(err.statusCode).json({
            status:err.status,
            error:err,
            message:err.message,
            stack:err.stack
        })
    }else{
      //RENDERED WEBSITE  
        res.status(err.statusCode).render('error',{
            title:"Something went wrong!",
            msg:err.message 
        })
    }
    
}

const sendErrorProd=(err,req,res)=>{
    //A) FOR API
    if(req.originalUrl.startsWith('/api')){
            //For operational errors i.e trusted error : send message to client
            if(err.isOperational){
                res.status(err.statusCode).json({
                    status:err.status,
                    message:err.message
                })
            }else{ //Programming or other unknown error : don't leak error details
                //1) log error
            // console.error('Error 📦',err) //This will be logged in our publishing platform so not to clients

                //2) send generic message
                res.status(500).json({
                    error:err,
                    status:'error',
                    message:"Something went very wrong! Please be patient until it is taken care of"
                })
            }
    }else{
       // B) FOR RENDERED WEB PAGES
            //For operational errors i.e trusted error : send message to client
            // operational errors are those errors which we specify and pass to global error handler like next(new AppError('',404))
            if(err.isOperational){
                res.status(err.statusCode).render('error',{
                    title:"Something went wrong!",
                    msg:err.message 
                })
            }else{ //Programming or other unknown error : don't leak error details
                //1) log error
            // console.error('Error 📦',err) //This will be logged in our publishing platform so not to clients

                //2) display generic message
                res.status(err.statusCode).render('error',{
                    title:"Something went wrong!",
                    msg:"Please try again later." 
                })
            }
    }
    
}

module.exports=(err,req,res,next)=>{

    err.statusCode=err.statusCode || 500;
    err.status=err.status || 'error';
    
    if(process.env.NODE_ENV=='development'){
        
        sendErrorDev(err,req,res)
    }else if(process.env.NODE_ENV=='production'){
        let error={...err}
        error.message=err.message

        // console.log("🌍🌍🌍",error,"🌍🌍🌍")
        if(error.kind==='ObjectId') error = handleCastErrorDB(error)
        if(error.code===11000) error=handleDuplicateFieldsDB(error)
        if(error.message==='ValidationError') error=handleValidationErrorDB(error);

        sendErrorProd(error,req,res)
    }
}