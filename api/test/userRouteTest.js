const chai = require("chai")
const chaiHttp = require("chai-http")
const assert = require("assert")

chai.use(chaiHttp)

var requester = chai.request("http://localhost:8080")

//place a valid uid in the "uid" const variable
//make sure the uid user object points to the first question
//change the answer accordingly
const uid = "hjR7esAoLPZtDXLKDzPme28QyVv2"
const wrongUID = "ALv7Db1gn3aNVDgzsUc9QnzqJC03"

describe("User's Route for gameplay", ()=>{
    describe("Change profile", ()=>{
        name = "SomeRandomName"
        it("Correct Request", async (done)=>{
            await requester.post("/api/auth/changeProfile")
                .set("Authorization", "Bearer "+uid)
                .send({
                    name
                })
                .then(( resp )=>{
                    assert.equal(resp.status, 200)
                    assert.equal(resp.body.statusCode, 200)
                    assert.equal(resp.body.payload.user.name, name)
                })
        })

        it("Correct Request (name not unique)", async ()=>{
            await requester.post("/api/auth/changeProfile")
                .set("Authorization", "Bearer "+uid)
                .send({
                    name
                })
                .then(( resp )=>{
                    assert.equal(resp.status, 400)
                    assert.equal(resp.body.statusCode, 400)
                })
        })

        it("Correct Request (setting name to Sarthak)", async ()=>{
            await requester.post("/api/auth/changeProfile")
                .set("Authorization", "Bearer "+uid)
                .send({
                    name: "Sarthak"
                })
                .then(( resp )=>{
                    assert.equal(resp.status, 200)
                    assert.equal(resp.body.statusCode, 200)
                    assert.equal(resp.body.payload.user.name, name)
                })
        })

        it("Wrong Request (name has empty space)", async ()=>{
            await requester.post("/api/auth/changeProfile")
                .set("Authorization", "Bearer "+uid)
                .send({
                    name: "Name with spaces"
                })
                .then(( resp )=>{
                    assert.equal(resp.status, 400)
                    assert.equal(resp.body.statusCode, 400)
                })
        })

        it("Wrong Request (name is blank)", async ()=>{
            await requester.post("/api/auth/changeProfile")
                .set("Authorization", "Bearer "+uid)
                .send({
                    name: ""
                })
                .then(( resp )=>{
                    assert.equal(resp.status, 400)
                    assert.equal(resp.body.statusCode, 400)
                })
        })

        it("Wrong Request (invalid uid)", async ()=>{
            await requester.post("/api/auth/changeProfile")
                .set("Authorization", "Bearer "+wrongUID)
                .send({
                    name: "SomeName"
                })
                .then(( resp )=>{
                    assert.equal(resp.status, 400)
                    assert.equal(resp.body.statusCode, 400)
                    assert.equal(resp.body.payload.errorMsg, "Unauthorised")
                })
        })
    })

    describe("User Profile", ()=>{
        it("Correct Request", async ()=>{
            await requester.post("/api/auth/profile")
                .set("Authorization", "Bearer "+uid)
                .then(( resp )=>{
                    assert.equal(resp.body.statusCode, 200)
                })
        })

        it("Wrong Request (wrong uid)", async ()=>{
            await requester.post("/api/auth/profile")
                .set("Authorization", "Bearer "+wrongUID)
                .then(( resp )=>{
                    assert.equal(resp.status, 400)
                    assert.equal(resp.body.statusCode, 400)
                    assert.equal(resp.body.payload.errorMsg, "Unauthorised")
                })
        })
    })

    describe("Current Question", ()=>{
        it("Correct Request (wihtout using hint)",async ()=>{
            await requester.post("/api/auth/getCurrent")
                .set("Authorization", "Bearer "+uid)
                .then(( resp )=>{
                    assert.equal(resp.status, 200)
                    assert.equal(resp.body.statusCode, 200)
                    assert.equal(resp.body.payload.hint, null)
                })
        })

        it("**Using Hint", async ()=>{
            await requester.post("/api/auth/hintClicked")
                .set("Authorization", "Bearer "+uid)
                .then(( resp )=>{
                    assert.equal(resp.status, 200)
                    assert.equal(resp.body.statusCode, 200)
                    assert.equal(resp.body.wasHintUsed, false)
                })
        })

        it("Correct Request (after using hint)", async ()=>{
            await requester.post("/api/auth/getCurrent")
                .set("Authorization", "Bearer "+uid)
                .then(( resp )=>{
                    assert.equal(resp.status, 200)
                    assert.equal(resp.body.statusCode, 200)
                    assert.equal(typeof(resp.body.payload.hint), 'string')
                })
        })

        it("Wrong Request (wrong uid)",async ()=>{
            await requester.post("/api/auth/getCurrent")
                .set("Authorization", "Bearer "+wrongUID)
                .then(( resp )=>{
                    assert.equal(resp.status, 400)
                    assert.equal(resp.body.statusCode, 400)
                    assert.equal(resp.body.payload.errorMsg, "Unauthorised")
                })
        })
    })

    describe("Route for answering the current question", ()=>{
        const answer = "Aleksandr Kogan"
        it("Correct Request (wrong anwser)", async ()=>{
            await requester.post("/api/auth/checkAnswer")
                .set("Authorization", "Bearer "+uid)
                .send({
                    answer: "wrong answer"
                })
                .then(( resp )=>{
                    assert.equal(resp.status, 200)
                    assert.equal(resp.body.statusCode, 200)
                    assert.equal(resp.body.isAnswerCorrect, false)
                })
        })

        it("Correct Request", async ()=>{
            await requester.post("/api/auth/checkAnswer")
                .set("Authorization", "Bearer "+uid)
                .send({
                    answer
                })
                .then(( resp )=>{
                    assert.equal(resp.status, 200)
                    assert.equal(resp.body.statusCode, 200)
                    assert.equal(resp.body.isAnswerCorrect, true)
                })
        })

        it("Wrong Request (wrong uid)", async ()=>{
            await requester.post("/api/auth/checkAnswer")
                .set("Authorization", "Bearer "+wrongUID)                
                .send({
                    answer: "answer"
                })
                .then(( resp )=>{
                    assert.equal(resp.body.statusCode, 400)
                })
        })
    })

})