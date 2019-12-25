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
})

const gAdmin = require("firebase-admin")
const db = gAdmin.database()
const ref = db.ref("server/"+process.env.PLAYER_DB)
const database = require("./controls/database")

ref.once("child_added", async (snap)=>{
    try{
        const data = await ref.once("value")
        const sortedBoard = await database.sorter(data.val())
        const check = await database.updateLeaderBoard(sortedBoard)
        if(check){
            console.log("Leader Board Updated")
        } else{
            console.log("Error")
        }
    } catch(err){
        console.log(err)
    }
})

ref.on("child_changed", async (snap)=>{
    try{
        const data = await ref.once("value")
        const sortedBoard = await database.sorter(data.val())
        const check = await database.updateLeaderBoard(sortedBoard)
        if(check){
            console.log("Leader Board Updated")
        } else{
            console.log("Error")
        }
    } catch(err){
        console.log(err)
    }
})

const port = process.env.PORT || 8000
app.listen(port, ()=>{
    console.log("Server started at: "+port)
})