const { constances } = require("../constances");
const errorHandler = (err, req, res, next) =>  {
    const statusCode =  res.statusCode ? res.statusCode : 500 ; 
    switch (statusCode) {
        case constances.VALIDATION_ERROR:
            res.json({ title:"Validation error " , message: err.message , stackTrace: err.stack, });
            break;
        case constances.NOT_FOUND:
            res.json({ title:"Not Founnnnd" , message: err.message , stackTrace: err.stack });
            
        case constances.UNAUTHORIZED:
            res.json({ title:"Unautorized" , message: err.message , stackTrace: err.stack });
        case constances.FORBIDDEN:
                res.json({
                  title: "Forbidden",
                  message: err.message,
                  stackTrace: err.stack,
                });
        case constances.SERVER_ERROR:
            res.json({
                title:"SERVER_ERROR",
                message:err.message,
                stackTrace:err.stack,
            });
        
        default:
            console.log("No error , All good !")
            break;
    }
};

module.exports = errorHandler; 