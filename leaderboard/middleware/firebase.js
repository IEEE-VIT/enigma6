const gAdmin = require("firebase-admin")
const creds = JSON.parse(process.env.creds)
gAdmin.initializeApp({
    credential: gAdmin.credential.cert(creds),
    databaseURL: process.env.databaseURL,
  });
const db = gAdmin.database();
console.log("Firebase Connected")

module.exports = gAdmin