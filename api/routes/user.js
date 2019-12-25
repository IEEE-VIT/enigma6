const route = require("express")()
const userAuth = require("../middlewares/user/userAuth")
const userRegister = require("../middlewares/user/userRegister")
const userControls = require("../controllers/userControls")
var Recaptcha = require('recaptcha-verify')

var recaptcha = new Recaptcha({
    secret: process.env.RECAPTCHA_KEY,
    verbose: true
});

route.post("/api/auth/recaptcha", (req,res) => {
    var token = req.body.token;
    recaptcha.checkResponse(token,function(error,response){
        if (error) res.status(401).send({auth: 0, message: "Failed to verify"})
        else res.status(200).send({auth: 1, message: "Verified captcha"})
    })
})

//extra route for checking the unique name and nothing more,
//consider removing if not used in future
route.post("/api/isNameUnique", async (req, res)=>{
    try{
        const name = req.body.name
        console.log(name)
        if([undefined, null, ""].includes(name)){
            res.status(200).send({
                statusCode: 200,
                payload:{
                    msg: "Make sure you provide yourself with a Name"
                },
                wasNameUnique: false
            })
            return
        } else{
            if(await userControls.isUniqueName(name) === false){
                res.status(200).send({
                    statusCode: 200,
                    payload: {
                        msg: "Username is Not Unique"
                    },
                    wasNameUnique: false
                })
                return
            } else{
                res.status(200).send({
                    statusCode: 200,
                    payload: {
                        msg: "Username is unique"
                    },
                    wasNameUnique: true
                })
            }
        } 
    }
    catch(err){
        res.status(500).send({
            statusCode: 500,
            payload: {
                msg: err.message
            },
            wasNameUnique: false
        })
    }
})

route.post("/api/registerPlayer", userRegister, (req, res)=>{
    userControls.registerPlayer(req.user)
        .then( resp => res.status(200).send(resp))
        .catch( err => res.status(400).send(err))
})

route.post("/api/auth/changeProfile", userAuth, async (req, res)=>{
    try{
        const name = req.body.name
        if(name === undefined || name === "" || name === null){
            throw new Error("Name field can't be blank")
        } else if(name.match(/\s/) || name.length<5 || name.length>30 || name.match(/[@#$%^&*()?":{}|<>]/)){
            throw new Error("Sorry! The username cannot have blanks/special characters and should contain at least 5 to 30 characters")
        } else{
            if(! await userControls.isUniqueName(name)){
                throw new Error("Sorry! The username is already in use from another account")
            }
            const update = {
                name,
                isNameDefault: false
            }
            userControls.updatePlayer(req.player.uid, update)
                .then( resp => res.status(200).send(resp) )
                .catch( err => res.status(400).send(err) )
        }        
    } catch(err){
        res.status(400).send({
            statusCode: 400,
            payload: {
                errorMsg: err.message
            }
        })
    }
})

route.post("/api/auth/profile", userAuth, (req, res)=>{
    userControls.rank(req.player.uid)
        .then((resp)=>{
            res.status(200).send({
                statusCode: 200, 
                payload: {
                    user: {
                        name: req.player.name,
                        email: req.player.email,
                        points: req.player.points,
                        level: req.player.level,
                        usedHint: req.player.usedHint,
                        rank: resp,
                        isNameDefault: req.player.isNameDefault,
                    },
                    errorMsg: null
                }
            })
        })
        .catch((err)=>{
            console.log(err)
            res.status(400).send({
                statusCode: 400,
                payload: {
                    user: null,
                    errorMsg: "Please contact support"
                },
            })
        })
})

route.post("/api/auth/getCurrent", userAuth, (req, res)=>{
    userControls.playerCurQuestion(req.player.level, req.player.hint)
        .then( resp => res.status(200).send(resp) )
        .catch( err => res.status(400).send(err) )
})

route.post("/api/auth/checkAnswer", userAuth, (req, res)=>{
    userControls.checkPlayerAnswer(req.player, req.body.answer)
        .then( resp => res.status(200).send(resp))
        .catch( err => res.status(400).send(err) )
})

route.post("/api/auth/hintClicked", userAuth, (req, res)=>{
    if(req.player.hint === true){
        res.status(200).send({
            statusCode: 200,
            payload: {
                hint: "Hint already used",
            },
            wasHintUsed: true,
        })
    } else{
        userControls.questionHint(req.player.uid, req.player.level)
            .then( resp => res.status(200).send({ ...resp, wasHintUsed: false}) )
            .catch( err => res.status(400).send(err) )            
    }
})

route.post("/api/auth/leaderBoard", userAuth, (req, res)=>{
    userControls.getLeaderBoard(req.player)
        .then( resp => res.status(200).send(resp) )
        .catch( err => res.status(400).send(err) )
})

module.exports = route