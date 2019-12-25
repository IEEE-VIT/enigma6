const chai = require("chai")
const chaiHttp = require("chai-http")
const assert = require("assert")

chai.use(chaiHttp)

var requester = chai.request("http://localhost:8080")

describe("Tiger Team Questions route", ()=>{


    describe("Question Upload route", ()=>{
        it("Correct upload with wrong secret",async ()=>{
            await requester.post("/api/tigerTeam/quesUpload")
                    .send({
                        secret: "qwertyuiop",

                        name: "TestQuestion",
                        level : "10",
                        question : "lipsum lipsum",
                        answer : "qwertyuiop",
                        hint: "qwertyuiopasdfghjkl",
                        imgURL: "http://google.com",
                        checker: ["qwerty", "uiop", "asdfg", "hjkl"]
                    })
                    .then((resp)=>{
                        assert.equal(resp.body.statusCode, 400)
                    })
        })

        it("Correct upload with correct secret",async ()=>{
            await requester.post("/api/tigerTeam/quesUpload")
                    .send({
                        secret: "theBlueisThenewEvil",

                        name: "TestQuestion",
                        level : "10",
                        question : "lipsum lipsum",
                        answer : "qwertyuiop",
                        hint: "qwertyuiopasdfghjkl",
                        imgURL: "http://google.com",
                        checker: ["qwerty", "uiop", "asdfg", "hjkl"]
                    })
                    .then((resp)=>{
                        assert.equal(resp.body.statusCode, 200)
                    })
        })

        it("Making the request with the same question level",async ()=>{
            await requester.post("/api/tigerTeam/quesUpload")
                    .send({
                        secret: "theBlueisThenewEvil",

                        name: "TestQuestion1",
                        level : "10",
                        question : "lipsum lipsum lipsum",
                        answer : "qwertyuiop",
                        hint: "qwertyuiopasdfghjkl",
                        imgURL: "http://google.com",
                        checker: ["qwerty", "uiop", "asdfg", "hjkl"]
                    })
                    .then((resp)=>{
                        assert.equal(resp.body.statusCode, 400)
                    })
        })

    })

    describe("Question Update Route", ()=>{

        it("Correct request with wrong secret",async ()=>{
            await requester.post("/api/tigerTeam/updateQuestion")
                .send({
                    secret: "qwertyuiop",

                    name: "TestQuestion",
                    update:{
                        level: "1",
                        question: "Better then lipsum"
                    }
                })
                .then((resp)=>{
                    assert.equal(resp.body.statusCode, 400)
                })
        })

        it("Correct request with correct secret",async ()=>{
            await requester.post("/api/tigerTeam/updateQuestion")
                .send({
                    secret: "theBlueisThenewEvil",

                    name: "TestQuestion",
                    update:{
                        level: "1",
                        question: "Better then lipsum"
                    }
                })
                .then((resp)=>{
                    assert.equal(resp.body.statusCode, 200)
                })
        })

        it("Incorrect request",async ()=>{
            await requester.post("/api/tigerTeam/updateQuestion")
                .send({
                    secret: "theBlueisThenewEvil",

                    name: "asdfgh",
                    update: {
                        level: "2",
                        question: "back to using lipsum"
                    }
                })
                .then((resp)=>{
                    assert.equal(resp.body.statusCode, 400)
                })
        })
    })

    describe("Question Delete route", ()=>{

        it("Correct request with wrong secret", async ()=>{
            await requester.post("/api/tigerTeam/deleteQuestion")
                .send({
                    secret: "qwertyuiop",

                    name: "TestQuestion"
                })
                .then((resp)=>{
                    assert.equal(resp.body.statusCode, 400)
                })
        })

        it("Correct request with correct secret", async ()=>{
            await requester.post("/api/tigerTeam/deleteQuestion")
                .send({
                    secret: "theBlueisThenewEvil",

                    name: "TestQuestion"
                })
                .then((resp)=>{
                    assert.equal(resp.body.statusCode, 200)
                })
        })
    })
})