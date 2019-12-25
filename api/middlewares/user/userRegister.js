const userControls = require("../../controllers/userControls")

const userRegister = async (req, res, next)=>{
    try{
        const uid = req.header("Authorization").replace("Bearer ", "")
        await userControls.checkPlayerUid(uid)

        //checking if user already registered
        const isUserAlreadyThere = await userControls.getPlayerInfo(uid)
        if(isUserAlreadyThere){
            res.status(200).send({
                statusCode: 200,
                payload: {
                    msg: "User already registered, Signing In!",
                },
                wasUserRegistered: true,
                isRegSuccess: false,
            })
            return
        } 

        //checking if all required fields are present
        const email = req.body.email
        if(email === null || email === "" || email ===undefined){
            res.status(200).send({
                statusCode: 200,
                payload: {
                    msg: "Make Sure Email was provided"
                },
                wasUserRegistered: false,
                isRegSuccess: false,
            })
            return
        }

        //check email does not have any spaces
        if(email.match(/\s/)){
            res.status(200).send({
                statusCode: 200,
                payload: {
                    msg: "Sorry! Make sure Email has no blank spaces"
                },
                wasUserRegistered: false,
                isRegSuccess: false
            })
            return
        }

        //if all conditions pass then proceed with user creation
        req.user = {
            email: req.body.email,
            uid: uid
        }
        next()
    } catch(err){
        res.status(400).send({
            statusCode: 400,
            payload: {
                msg: "Unauthorized",
                errorMsg: err.message
            },
            wasUserRegistered: false,
            isRegSuccess: false,
        })
        return
    }
}

module.exports = userRegister