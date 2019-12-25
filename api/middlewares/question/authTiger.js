const authTiger = (req, res, next)=>{
    const secret = req.body.secret
    if(secret === process.env.TIGER_PASS){
        next()
    } else{
        res.status(400).send({
            statusCode: 400,
            payload: {
                errorMsg: "Unauthorized"
            }
        })
    }
}

module.exports = authTiger