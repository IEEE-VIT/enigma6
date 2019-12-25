const gAdmin = require("firebase-admin")
const db = gAdmin.database()
const question_tracker = db.ref("question_tracker")
const question = db.ref("server/tiger-Team/questions")

const updateQuestionTracker = (players)=>{
    return new Promise(async (resolve, reject)=>{
        const totalPlayers = Object.values(players).length
        await question.once("value")
                .then((snap)=>{
                    const update = {}
                    const quesData = snap.val()
                    Object.values(quesData).forEach((ques)=>{
                        var usersNotSolved = 0
                        Object.values(players).forEach((player)=>{
                            if(player.level<=ques.level){
                                usersNotSolved = usersNotSolved + 1
                            }
                        })
                        update[ques.level] = {
                            usersNotSolved,
                            totalPlayers
                        }
                    })
                    return question_tracker.update(update)
                })
                .then((resp)=>{
                    resolve(true)
                })
                .catch((err)=>{
                    console.log(err)
                    reject(err)
                })
    })
}

module.exports = {
    updateQuestionTracker,
}