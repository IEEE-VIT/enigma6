const userControls = require("../../controllers/userControls")

const userAuth = async (req, res, next)=>{
    try{
        if(req.header("Authorization") === undefined){
            throw new Error("Unauthorized")
        }
        const uid = req.header("Authorization").replace("Bearer ", "")
        const userAuth = await userControls.checkPlayerUid(uid)
        if(!userAuth.emailVerified){
            throw new Error("Please Verify your email")
        } else {
            const user = await userControls.getPlayerInfo(uid)
            if(user){
                req.player = {
                    uid: uid,
                    name: user.name,
                    level: user.level,
                    email: user.email,
                    points: user.points,
                    hint: user.hint,
                    usedHint: user.usedHint,
                    isNameDefault: user.isNameDefault
                }
                next()
            } else{
                throw new Error("User Wasn't Found, Please Contact Support")
            }
        }
    } catch(err){
        res.status(400).send({
            statusCode: 400,
            payload: {
                errorMsg: err.message,
                error: err.error,
            }
        })
    }
}

module.exports = userAuth