const validator = require("validator")


const quesValidator = (req, res, next)=>{

    //getting all variables out of the request
    const name = req.body.name.trim(),
        level = req.body.level,
        question = req.body.question.trim(),
        answer = req.body.answer.trim(),
        hint = req.body.hint.trim(),
        imgURL = req.body.imgURL.trim()
        checker = req.body.checker
    
    //all errors are stored here 
    //***specify the error***/
    const err = []
    if(!validator.isAlphanumeric(name) || name.length>20){
        //if question name contains anything else then alphabets
        err.push("Please correct the Question's Name before next upload!")
    }
    if(level>30 || level<=0){
        //if question level contains anything else then number value or it's greater then 2 in length
        err.push("Please correct the Question's Level before the upload!")
    }
    if(!validator.isURL(imgURL)){
        //if URL is not in the right format then pass an error
        err.push("Please correct the Question's image URL!")
    }
    if(checker === undefined || checker === null || checker.length <= 3){
        err.push("Please correct the list of counter answers")
    }
    if(!answer.match(/^[a-zA-Z0-9 .,]*$/) || answer.length>50){
        err.push("Answers can only be AlphaNumeric and have less then 50 characters")
    }

    if(err.length !== 0){
        //if any error recorded send it back to the client
        res.status(400).send({
            statusCode: 400,
            payload:{
                status: "Error",
                errorMsg: err,
            }
        })
    } else{
        //if no error recorded then go forward with request
        const quesData = {
            name,
            level,
            question,
            answer,
            hint,
            imgURL,
            checker
            }
            req.quesData = quesData
            next()
        }
    }

module.exports = quesValidator