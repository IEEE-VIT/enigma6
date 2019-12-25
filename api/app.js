const express = require("express")
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser')
const chalk = require("chalk")
const fetch = require("node-fetch")
const app = express()

//importing middlewares
require("./middlewares/universal/firebase")

//middleware
app.use(helmet())
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next)=>{
    // const counter = ["getCurrent", "checkAnswer", "hintClicked", "tigerTeam", "leaderBoard"]
    const counter = ["tigerTeam"]
    var temp = false
    counter.forEach((count)=>{
        if(req.url.includes(count)){
            temp = true
        }
    })
    if(temp){
        console.log(chalk.red("Unauthorized request to URL -> " + req.method + "->" + req.url))
        res.status(400).send({
            status: 400,
            payload: {
                msg: "The Game Starts soon!"
            }
        })
        return
    }else {
        console.log(chalk.green(req.method + "->" + req.url))
        next()
    }
})



//importing different routes
const questions = require("./routes/questions")
const user = require("./routes/user")

//Use different routes here
app.use(questions)
app.use(user)

//this is the default route if no end point found for request
app.use((req, res, next)=>{
    res.status(200).send({
        statusCode: 200,
    })
    return
})

const port = process.env.PORT || 8080;
app.listen(port, ()=>{
    console.log("=> Server Started on Port: " + port);

    setInterval(function(){
        fetch(process.env.UNIQUE_MICROSERVICE)
            .then( async (resp)=>{
                resp = await resp.json()
                console.log("Unique name microservice: " + chalk.green(resp.isWorking))
            })
            .catch((err)=>{
                console.log("Unique name microservice: " + chalk.red(false))
            })

        fetch(process.env.BOARD_MICROSERVICE)
            .then( async (resp)=>{
                resp = await resp.json()
                console.log("Leader Board microservice: " + chalk.green(resp.isWorking))
            })
            .catch((err)=>{
                console.log("Leader Board microservice: " + chalk.red(false))
            })

        fetch(process.env.QUESTION_SERVICE)
            .then( async (resp)=>{
                resp = await resp.json()
                console.log("Question Status microservice: " + chalk.green(resp.isWorking))
            })
            .catch((err)=>{
                console.log("Question Status microservice: " + chalk.red(false))
            })
    }, 100*60*10)
})