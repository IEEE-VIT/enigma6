const gAdmin = require("firebase-admin")
const sortBy = require("sort-by")
const db = gAdmin.database()
const leaderBoard = db.ref("leader-board")

const sorter = (jsonObject)=>{
    return new Promise((resolve, reject)=>{
        try{
            var arrTopPlayers = [];
            var count = 1;
            Object.values(jsonObject).forEach((element)=>{
                arrTopPlayers.push({uid: element.uid, name: element.name, points: element.points, level: element.level})
            })
            sortedTopPlayers = arrTopPlayers.sort(sortBy("-points"))
            var rankedArrya = []
            sortedTopPlayers.forEach((element)=>{
                rankedArrya.push({ ...element, rank: count})
                count = count + 1
            })
            resolve(rankedArrya)
        } catch(err){
            reject("Some error")
        }
    })
}

const updateLeaderBoard = (sortedBoard)=>{
    return new Promise((resolve, reject)=>{
        leaderBoard.child("board").set(sortedBoard)
            .then((resp)=>{
                resolve(true)
            })
            .catch((err)=>{
                resolve(false)
            })
    })
}

module.exports = {
    sorter,
    updateLeaderBoard,
}