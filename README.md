# Enigma 6.0
> This repository contains the code for microservices developed by IEEE-VIT for Enigma 6.0 (Dec, 2019)

Enigma is an online cryptic hunt conducted every year by IEEE VIT Vellore. Participants have to solve a series of mind boggling questions to win cash prizes!

## Application Architecture
<img alt="architecture" src="https://github.com/mayankshah1607/enigma6/blob/master/static/architecture.jpg"/>

## Service Description

* **API** - The API is responsible for all the communication taking place between the frontend and the backend services.
* **Web** - This service is responsible for providing a frontend web application for the users to interact with
* **Firebase** - For data storage and real-time data streaming
* **Naming** - This service is responsible for ensuring consistency and uniqueness in the userdata stored in firebase RTDB
* **Leaderboard** - Manages the scoring mechanism for providing a leaderboard to the users
* **Questions** - This is an internal service accessible only by the admins for feeding questions into the database

## Tools and technology used
* React.js
* Node.js
* Firebase (Real-time database)
* Docker
* Travis-CI
* AWS ElasticBeanstalk
* Heroku

## Contributors
* Mayank Shah (<a href="https://github.com/mayankshah1607">@mayankshah1607</a>)
* Sarthak Pranesh (<a href="https://github.com/sarthakpranesh">@sarthakpranesh</a>)
* Ziyan Karmali (<a href="https://github.com/ZiyanK">@ZiyanK</a>)
* Fenil Jain (<a href="https://github.com/Devil39">@Devil39</a>)
* Yuvraj Singh (<a href="https://github.com/iamuv2000">@iamuv2000</a>)
* Divyansh (<a href="https://github.com/noob-master147">@noob-master147</a>)
