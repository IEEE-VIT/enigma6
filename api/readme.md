# IEEE-VIT ENIGMA 6.0, 2019

Enigma is the most popular online event of VIT, Vellore conducted by the IEEEVIT student branch.
This repo is for the main-server backend service of the 6th edition of the event.

The Backend service for the 6th edition of Enigma was decided to be distributed cluster of micro services 
working together. The main-server hold all the player and control level functions and routes needed to 
set up the event. Where as other two micro services work hand in hand with this server to solve two major
parts - One is to maintain upto date player leader board which takes a lot of heavy computation away
from the main-server allowing it execute player level tasks faster with low latency. The other micro server
simply maintains a unique name record in the database which is again used later to make sure all players 
that are registered don't have duplicate names.

All three services use the Real Time Database services provided by Firebase.

## Instruction to start project
__Create New Project on firebase__

 1. Fetch Service Account Details from firebase
 2. Rename the file as "firebase-key.json"
 3. Now create an .env file the root directory of the project, and add the following:-

	 GOOGLE_APPLICATION_CREDENTIALS = "./firebase-key.json"

	 PLAYER_DB = "test-players"

	 TIGER_PASS = "theBlueisThenewEvil"

	 UNIQUE_MICROSERVICE = "url of the hosted micro service"

	 BOARD_MICROSERVICE = "url of the hosted micro service"
	
	* This will configure the Web App to use your firebase credential
	* Also it will set the database for the players to be "test-player". (The name of the database can be anything that you wish)
 4. Now start the project by typing "npm run dev" in the terminal for running the web app in development mode. 
	(For production use "npm run start" or "npm start")


## API Routes

__Register Player After OAuth/Auth__

- POST /api/registerPlayer :-
	- to register the player after authentication in firebase
	- set header as
	"Authorization", "Bearer <UID provided by google>"
	- set request body as follows
	```json
		{
			"email": "<player-email>"
		}
	```
	- response looks like
	(if user is already registered)
	```json
		{
			"statusCode": 200,
			"payload": {
				"msg": "User already registered, Signing In!"
			},
			"wasUserRegistered": true,
			"isRegSuccess": false
		}
	```
	(if user gets registered)
	```json
		{
			"statusCode": 200,
			"payload": {
				"msg": "Player registered, Let the game begin!!!"
			},
			"wasUserRegistered": false,
			"isRegSuccess": true
		}
	```
	(if uid improper)
	```json
		{
			"statusCode": 400,
			"payload": {
				"msg": "Unauthorized",
				"errorMsg": "Unauthorised"
			},
			"wasUserRegistered": false,
			"isRegSuccess": false
		}
	```
	(if there is any space in email)
	```json
		{
			"statusCode": 200,
			"payload": {
				"msg": "Sorry! Make sure Email has no blank spaces"
			},
			"wasUserRegistered": false,
			"isRegSuccess": false
		}
	```


__Authenticated User Routes:__

* All routes are secured by header, hence each request should have a header of the following format -> 
"Authorization", "Bearer 'UID provided by google'"
	- if the header is properly set then expect routes to work as mentioned, else 

	if header is not set at all
	```json
		{
		    "statusCode": 400,
			"payload": {
				"errorMsg": "Unauthorized"
			}
		}
	```

	if the header is set but uid passed is not valid
	```json
		{
		    "statusCode": 400,
			"payload": {
				"errorMsg": "Unauthorized",
				"error": "There is no user record corresponding to the provided identifier."
			}
		}
	```
	
- POST /api/auth/getCurrent :-
	- to find the current question of the player
	- set only header, no request body required
	- response looks like 
	(if the hint is still not used)
	```json
		{
			"statusCode": 200,
			"payload": {
				"question": "Test question 1?",
				"level": 1,
				"imgURL": "Http://google.com",
				"hint": null
			}
		}
	```
	(if the hint is used)
	```json
		{
			"statusCode": 200,
			"payload": {
				"question": "Test question 1?",
				"level": 1,
				"imgURL": "Http://google.com",
				"hint": "test question hint"
			}
		}
	```

- POST /api/auth/checkAnswer :-
	- to check if the player's answer is correct
	- set header and request body should be as follows
	```json
	{
		"answer": "test answer"
	}
	```
	- response looks like 
	(if answer was correct)
	```json
		{
			"statusCode": 200,
			"payload": {
				"msg": "Correct Answer",
				"howClose": "Accurate"
			},
			"isAnswerCorrect": true
		}
	```
	(if answer was wrong)
	```json
		{
			"statusCode": 200,
			"payload": {
				"msg": "Answer not correct",
				"howClose": "You are miles far!"
			},
			"isAnswerCorrect": false
		}
	```
	(if request body not set properly or blank answer)
	```json
		{
			"statusCode": 400,
			"payload": {
				"errorMsg": "Answer Can't be blank"
			}
		}
	```

- POST /api/auth/hintClicked :-
	- if the hint is clicked then this route keeps a track of it
	- set only header, no request body required
	- response looks like 
	(if hint was not used for that question)
	```json
		{
			"statusCode": 200,
			"payload": {
				"hint": "test question hint"
			},
			"wasHintUsed": false
		}
	```
	(if hint was used for that question)
	```json
		{
			"statusCode": 200,
			"payload": {
				"hint": "Hint already used"
			},
			"wasHintUsed": true
		}
	```

- POST /api/auth/changeProfile :-
	- to change the username of the player
	- set header and request body should be like
	- name should not contain any blank spaces and should be of at least 5 to at most of 30 characters
	```json
		{
			"name": "qwerty"
		}
	```
	- response looks like
	(if name is unique)
	```json
		{
			"statusCode": 200,
			"payload": {
				"user": {
					"name": "qwert",
					"points": 0,
					"level": 1,
					"email": "qwertyuiop@gmail.com",
					"isNameDefault": false
				}
			}
		}
	```
	(if name is not unique)
	```json
		{
			"statusCode": 400,
			"payload": {
				"msg": "Sorry! that username is already taken"
			}
		}
	```

- POST /api/auth/profile :-
	- to get the profile of the player
	- set header only, no request body required
	- response looks like 
	```json
		{
			"statusCode": 200,
			"payload": {
				"user": {
					"name": "Limph",
					"email": "someemail@gmail.com",
					"points": 10,
					"level": 2,
					"usedHint": [
						true
					],
					"rank": 1
				},
				"errorMsg": null
			}
		}
	```

- POST /api/auth/leaderBoard :-
	- to get the leader board
	- set only header, no request body required
	- response looks like
	```json
		{
		"statusCode": 200,
		"payload": {
			"leaderBoard": [
				{
					"name": "Limph",
					"points": 30,
					"rank": 1,
					"level": 3
				},
				{
					"name": "testPLayer3",
					"points": 10,
					"rank": 2,
					"level": 2
				},
				{
					"name": "googleplayer",
					"points": 0,
					"rank": 3,
					"level": 1
				},
				{
					"name": "Sanskar",
					"points": 0,
					"rank": 4,
					"level": 1
				},
				{
					"name": "Mayank",
					"points": 0,
					"rank": 5,
					"level": 1
				},
				{
					"name": "Yuvraj Singh",
					"points": 0,
					"rank": 6,
					"level": 1
				},
				{
					"name": "testPLayer4",
					"points": 0,
					"rank": 7,
					"level": 1
				}
			],
			"curPlayer": {
				"name": "Limph",
				"points": 30,
				"rank": 1,
				"level": 3
			}
		}
	```

## POSTMAN 
Link - [https://documenter.getpostman.com/view/7649159/SVfRsShD](https://documenter.getpostman.com/view/7649159/SVfRsShD)
