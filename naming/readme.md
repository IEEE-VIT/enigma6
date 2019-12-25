# IEEE-VIT ENIGMA 6.0 - leader board microservice, 2019

Enigma is the most popular online event of VIT, Vellore conducted by the IEEEVIT student branch.
This microservice is created to maintain a list of usernames that get registered

## Instruction to start project
__Create New Project on firebase__

 1. Fetch Service Account Details from firebase
 2. Now create an .env file the root directory of the project, and add the following:-
	 GOOGLE_APPLICATION_CREDENTIALS = "./firebase-key.json"
	 PLAYER_DB = "test-players"
	 creds = '<admin app credentials of firebase>'
	
	* This will configure the Web App to use your firebase credential
	* Also it will set the database for the players to be "test-player". (The name of the database can be anything that you wish)
 3. Now start the project by typing "npm run dev" in the terminal for running the web app in development mode. 
	(For production use "npm run start" or "npm start")