const route = require("express")()
const quesFirestore = require("../controllers/quesFirestore")
const authTiger = require("../middlewares/question/authTiger")
const quesValidator = require("../middlewares/question/quesValidator")
const quesUpdate = require("../middlewares/question/quesUpdate")

//route for uploading questions
route.post("/api/tigerTeam/quesUpload", [authTiger, quesValidator], (req, res)=>{
    const ques = req.quesData
    quesFirestore.createQuestion(ques.name, ques.level, ques.question, ques.answer, ques.hint, ques.imgURL, ques.checker)
        .then(resp => res.status(200).send(resp))
        .catch(err => res.status(400).send(err))
})

//route for retriveing all the questions uploaded
route.post("/api/tigerTeam/getQuestions", authTiger, (req, res)=>{
    quesFirestore.getAllQuestions()
        .then(resp => res.send(resp))
        .catch(err => res.send(err))
})

//route for updating a perticular question
route.post("/api/tigerTeam/updateQuestion", [authTiger, quesUpdate] , (req, res)=>{
    const update = req.update
    quesFirestore.updateQuestion(update.name, update.allowedUpdates)
        .then( resp => res.status(200).send(resp))
        .catch( err => res.status(400).send(err))
})

//route for deleteing a question from the database
route.post('/api/tigerTeam/deleteQuestion', authTiger, (req, res)=>{
    if( req.body.name === undefined ){
        res.send({
            statusCode: 400,
            payload: {
                errorMsg: "Question Name wasn't Provided"
            }
        })
    } else{
        const del = req.body
        quesFirestore.deleteQuestion(del.name)
            .then(resp => res.send(resp))
            .catch(err => res.send(err))
    }
})

module.exports = route