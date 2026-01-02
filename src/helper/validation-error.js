const {StatusCodes}=require("http-status-codes")

class ValidationError extends Error{
    constructor(error){
        super();
        let explanation=[];
        error.errors.forEach(err=>{
            explanation.push(err);
        });
        this.name="Validation Error";
        this.message="Not able to validate the data sent in the request";
        this.explanation=explanation;
        this.statusCode=StatusCodes.INTERNAL_SERVER_ERROR;
    }
}

module.exports=ValidationError;