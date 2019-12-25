const gAdmin = require("firebase-admin")
const quesFirestore = require("./quesFirestore")
const db = gAdmin.database()
const ref = db.ref("server/"+process.env.PLAYER_DB)
const bcrypt = require("bcrypt")


const isUniqueName = (name)=>{
    return new Promise( async (resolve, reject)=>{
        try{
            names = await db.ref("unique/names").once("value")
            if(names.val().includes(name)){
                resolve(false)
            } else{
                resolve(true)
            }
        } catch(err){
            reject(err)
        }
    })
}

const registerPlayer = (user)=>{
    return new Promise((resolve, reject)=>{
        var randomName = "enigmaUser" + String(Math.random()*100000).split(".")[0]
        ref.child(user.uid).set({
            uid: user.uid,
            name: randomName,
            email: user.email,
            hint: false,
            points: 0,
            level: 1,
            isNameDefault: true,
        })
        .then(( resp )=>{
            resolve({
                statusCode: 200,
                payload: {
                    msg: "Player registered, Let the game begin!!!",
                },
                wasUserRegistered: false,
                isRegSuccess: true,
            })
        })
        .catch(( err )=>{
            console.log(err)
            reject({
                statusCode: 400,
                payload: {
                    msg: "Server Side error contact support"
                },
                wasUserRegistered: false,
                isRegSuccess: false,
            })
        })
    })
}

const checkPlayerUid = (uid)=>{
    return new Promise((resolve, reject)=>{
        gAdmin.auth().getUser(uid)
            .then((resp)=>{
                resolve(resp)
            })
            .catch((err)=>{
                reject({ error: err.message, message: "Unauthorised"})
            })
    })
}

const getPlayerInfo = (uid)=>{
    return new Promise((resolve, reject)=>{
        ref.child(uid).once("value")
            .then((resp)=>{
                resolve(resp.val())
            })
            .catch((err)=>{
                reject(err)
            })
    })
}

const updatePlayer = (uid, update)=>{
    return new Promise(async (resolve, reject)=>{
        ref.child(uid).update( update )
        .then((resp)=>{
            return getPlayerInfo(uid)
        })
        .then((updatedPlayer)=>{
            resolve({
                statusCode: 200,
                payload:{
                    user: {
                        name: updatedPlayer.name,
                        points: updatedPlayer.points,
                        level: updatedPlayer.level,
                        email: updatedPlayer.email,
                        isNameDefault: updatedPlayer.isNameDefault,
                    }
                }
            })
        })
        .catch((err)=>{
            reject({
                statusCode: 400,
                payload: {
                    errorMsg: err.message
                }
            })
        })
    })
}

const playerCurQuestion = (level, hint) => {
    return new Promise(async (resolve, reject)=>{
        quesFirestore.getPlayersQuestion(level)
            .then(( question )=>{
                if(hint){
                    resolve({
                        statusCode: 200,
                        payload:{
                            question: question.question,
                            level: question.level,
                            imgURL: question.imgURL,
                            hint: question.hint
                        }
                    })
                } else{
                    resolve({
                        statusCode: 200,
                        payload: {
                            question: question.question,
                            level: question.level,
                            imgURL: question.imgURL,
                            hint: null
                        }
                    })
                }
            })
            .catch((err)=>{
                reject({
                    statusCode: 400,
                    payload: {
                        errorMsg: err.message
                    }
                })
            })
    })
}

const questionHint = (uid, level) => {
    return new Promise(async (resolve, reject)=>{
        try{
            const question = await quesFirestore.getPlayersQuestion(level)
            if(question.hint){
                await updatePlayer(uid, {hint: true})
                resolve({
                    statusCode: 200,
                    payload:{
                        hint: question.hint
                    }
                })
            } else{
                console.log(question)
                throw new Error("Please contact support")
            }
        } catch(err){
            reject({
                statusCode: 400,
                payload: {
                    errorMsg: err.message
                }
            })
        }
    })
}

const answerValidator = (answer)=>{
    return new Promise((resolve, reject)=>{
        if(answer !== undefined && answer !== null && answer !== ""){
            if(answer.match(/^[a-zA-Z0-9 .,]*$/) && answer.length<=50){
                resolve(true)
            }else{
                reject("Answer Cannot have Special Characters")
            }
        } else {
            reject("Answer Cannot Be Blank")
        }
    })
}

const checkPlayerAnswer = (player, answer) => {
    return new Promise( async (resolve, reject)=>{
        try{
            console.log(Date() + "-->" + "Player Name:" + player.name + " with email Id: " + player.email + " Trying To Solve: " + player.level + " with answer: " + answer);
            await answerValidator(answer)
            const playerQuestion = await quesFirestore.getPlayersQuestion(player.level)
            console.log("answer: " + await bcrypt.compare(answer.toLowerCase(), playerQuestion.answer))
            if(await bcrypt.compare(answer.toLowerCase(), playerQuestion.answer)){
                const questionStats = await quesFirestore.getQuestionStats(player.level)
                var points = 100*(questionStats.usersNotSolved)/(questionStats.totalPlayers)
                if(player.hint){
                    points = points*0.85
                }
                var usedHint
                if(player.usedHint === undefined ){
                    usedHint = [player.hint]
                } else{
                    usedHint = [...player.usedHint, player.hint]
                }
                updates = {
                    points: Number((player.points + points).toFixed(2)),
                    usedHint,
                    hint: false,
                    level: player.level + 1
                }
                await updatePlayer(player.uid, updates)
                console.log(Date() + "-->" + "Player Name:" + player.name + " with email Id: " + player.email + " Solved Question: " + player.level + " with answer: " + answer);
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Correct Answer",
                        howClose: "Accurate"
                    },
                    isAnswerCorrect: true
                })
            } else{
                const checked = howClose(playerQuestion.checker, answer)
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Answer not correct",
                        howClose: checked
                    },
                    isAnswerCorrect: false,
                })
            }
        }catch(err){
            reject({
                statusCode: 400,
                payload: {
                    errorMsg: err
                }
            })
        }
    })
}

const howClose = (checker, userAnswer)=>{
    const found = checker.find((check)=>{
        // if(userAnswer.toLowerCase().match(RegExp(`${check.toLowerCase()}`, 'g')) || check.toLowerCase().match(RegExp(`${userAnswer.toLowerCase()}`, 'g'))){
        //     return check
        // }
        if(check.toLowerCase() === userAnswer.toLowerCase()){
            return check
        }
    })
    if(found){
        const index = checker.indexOf(found)
        const ripple = Math.round(checker.length/3)
        if(index<=ripple){
            return 1
        } else if(index<=ripple*2){
            return 2
        } else{
            return 3
        }
    } else{
        return 4
    }
}

const getLeaderBoard = (player)=>{
    return new Promise(async (resolve, reject)=>{
        try{
            const data = await db.ref("leader-board/board").once("value")
            var board = []
            var curPlayer = {}
            data.val().forEach(element => {
                board.push({name: element.name, points: element.points, rank: element.rank, level: element.level})
                if(element.uid === player.uid ){
                    curPlayer = {
                        name: element.name,
                        points: element.points,
                        rank: element.rank,
                        level: element.level
                    }
                    return
                }
            });
            resolve({
                statusCode: 200,
                payload:{
                    leaderBoard: board.slice(0,25),
                    curPlayer,
                }
            })
        }catch(err){
            reject({
                statusCode: 400,
                payload:{
                    errorMsg: err.message
                }
            })
        }
        
    })
}

const rank = (uid)=>{
    return new Promise(async (resolve, reject)=>{
        try{
            var curPlayerRank;
            const data = await db.ref("leader-board/board").once("value")
            data.val().some(element => {
                if(element.uid === uid ){
                    curPlayerRank = element.rank
                    return
                }
            });
            resolve(curPlayerRank)
        } catch(err){
            reject(err)
        }
    })
}

module.exports = {
    isUniqueName,
    registerPlayer,
    checkPlayerUid,
    getPlayerInfo,
    playerCurQuestion,
    questionHint,
    checkPlayerAnswer,
    updatePlayer,
    getLeaderBoard,
    rank,
}