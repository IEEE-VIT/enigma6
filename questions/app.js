const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const bodyParser = require("body-parser")

const app = express()
require("./middleware/firebase")

//middlewares
app.use(helmet())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next)=>{
    res.status(200).send({
        statusCode: 200,
        isWorking: true
    })
    return
})

const gAdmin = require("firebase-admin")
const db = gAdmin.database()
const ref = db.ref("server/"+process.env.PLAYER_DB)
const database = require("./controls/database")

//remake the list once on server start
const remakeQuestionTracker = async ()=>{
    var players = await ref.once("value")
    players = players.val()
    database.updateQuestionTracker(players)
        .then((res)=>{
            console.log("Question Tracker Updated: ", res)
        })
        .catch((err)=>{
            console.log("Something went wrong: ", err.message)
        })
}

ref.on("value", async (snap)=>{
    remakeQuestionTracker()
})

ref.on("child_changed", async (snap)=>{
    remakeQuestionTracker()
})


const port = process.env.PORT || 8000
app.listen(port, ()=>{
    console.log("Server started at: "+port)
})