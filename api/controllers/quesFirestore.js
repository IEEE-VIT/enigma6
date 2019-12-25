const gAdmin = require("firebase-admin")
const db = gAdmin.database()
const ref = db.ref("server/tiger-Team")
const question_tracker = db.ref("question_tracker")
const bcrypt = require('bcrypt');
const saltRounds = Number(process.env.BCRYPT_SALT)

const createQuestion = (name, level, question, answer, hint, imgURL, checker)=>{
    return new Promise(async (resolve, reject)=>{
        try{
            const questions = ref.child("questions");
            const questionData = await questions.once("value")
            const data = questionData.val()
            if( data !== null){
                Object.keys(data)
                .forEach((ques) => {
                    if(questionData.val()[ques].level === level || questionData.val()[ques].name === name){
                        throw new Error("Question with same level/name already uploaded")
                    }
                });
            }
            const hash = await bcrypt.hash(answer.toLowerCase(), saltRounds)
            await questions.child(name).set({
                name,
                level,
                question,
                answer: hash,
                hint,
                imgURL,
                checker
            })
            resolve({
                statusCode: 200,
                payload: {
                    msg: "Question Created",
                }
            })
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

const getAllQuestions = ()=>{
    return new Promise((resolve, reject)=>{
        const questions = ref.child("questions");
        questions.once("value")
            .then((data)=>{
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "All questions retrieved!",
                        questions: data.val()
                    }
                })
            })
            .catch((error)=>{
                console.log(error)
                reject({
                    statusCode: 400,
                    payload: {
                        errorMsg: "Wasn't able to retrive data from firestore"
                    }
                })
            })
        })
    }

const updateQuestion = (name, update)=>{
    return new Promise(async (resolve, reject)=>{
        const questions = ref.child("questions");
        questions.once("value")
            .then(async (data)=>{
                const ques = data.val()
                if(!Object.keys(ques).includes(name)){
                    throw new Error()
                } else{
                    if(update.answer){
                        update.answer = await bcrypt.hash(update.answer.toLowerCase(), saltRounds)
                    }
                    return questions.child(name).update(update)
                }
            })
            .then(()=>{
                resolve({
                        statusCode: 200,
                        payload: {
                            msg: "Question updated"
                        }
                    })
            })
            .catch((err)=>{
                reject({
                    statusCode: 400,
                    payload: {
                        errorMsg: "Question not updated"    
                    }
                })
            })
    })
    
}

const deleteQuestion = (name) => {
    return new Promise(async (resolve, reject) => {
        const questions = ref.child("questions");
        questions.child(name).remove()
            .then(()=>{
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: 'Question Deleted'
                    }
                })
            })
            .catch((err)=>{
                reject({
                    statusCode: 400,
                    payload: {
                        errormsg: 'Question not Deleted'
                    }
                })
            })
    })
}


const getPlayersQuestion = (level) =>{
    return new Promise( async (resolve, reject)=>{
        try{
            const questions = ref.child("questions");
            const currentQuestion = await questions.orderByChild("level").equalTo(level).limitToFirst(1).once("value")
            const questionData = currentQuestion.val()
            if(questionData === undefined || questionData === null){
                throw new Error("Question wasn't found")
            } else{
                const ques = questionData[Object.keys(questionData)[0]]
                resolve(ques)
            }
        } catch(err) {
            reject(err)
        }
    })
}

const getQuestionStats = (level)=>{
    return new Promise(async (resolve, reject)=>{
        try{
            const questionStats = await question_tracker.child(level).once("value")
            resolve(questionStats.val())
        } catch(err){
            reject(err)
        }
    })
}

module.exports = {
    createQuestion,
    getAllQuestions,
    updateQuestion,
    deleteQuestion,
    getPlayersQuestion,
    getQuestionStats,
}