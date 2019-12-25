const gAdmin = require("firebase-admin")
const db = gAdmin.database()
const unique = db.ref("unique")

const updateUniqueName = (names)=>{
    var uniqueNames = []
    Object.values(names).forEach(element => {
        uniqueNames.push(element.name)
    });
    return new Promise((resolve, reject)=>{
        unique.child("names").set(uniqueNames)
            .then((resp)=>{
                resolve(true)
            })
            .catch((err)=>{
                resolve(false)
            })
    })
}

module.exports = {
    updateUniqueName,
}