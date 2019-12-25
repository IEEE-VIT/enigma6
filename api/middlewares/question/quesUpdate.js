//checks the request for the correct format before passing it to the route
const questionUpdate = (req, res, next)=>{
    const name = req.body.name,
        update = req.body.update

    try{
        if(update !== undefined && name !== undefined){
            if(Object.keys(update).length !== 0 && name !== ""){
                const updateKeys = Object.keys(update)
                updateKeys.forEach((element)=>{
                    if(!["level", "question", "answer", "imgURL", "hint", "checker"].includes(element)){
                        throw new Error("Not an allowed Update")
                    }
                    if("answer" === element){
                        const answer = update["answer"]
                        if(!answer.match(/^[a-zA-Z0-9 .,]*$/) || answer.length>50){
                            throw new Error("Answers can only be AlphaNumeric and have less then 50 characters")
                        }
                    }
                })
                req.update = {
                    name,
                    allowedUpdates : update
                }
                next()
            } else{
                throw new Error("Update/name can't be empty")
            }
        } else{
            throw new Error("Update/name can't be undefined")
        }
    } catch(err){
        res.send({
            statusCode: 400,
            payload: {
                errorMsg: err.message
            }    
        })
        return
    }
}

module.exports = questionUpdate