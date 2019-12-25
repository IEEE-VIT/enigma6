const gAdmin = require("firebase-admin")

//use this one config in the firebase-key credentials in .env
const creds = JSON.parse(process.env.creds)

//use this when using firebase-key.json
// const creds = process.env.GOOGLE_APPLICATION_CREDENTIALS;

gAdmin.initializeApp({
    credential: gAdmin.credential.cert(creds),
    databaseURL: process.env.databaseURL,
  });
  
const db = gAdmin.database();
console.log("Firebase Connected")

module.exports = gAdmin