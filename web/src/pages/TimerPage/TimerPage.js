import React, { Component } from 'react';
import './TimerPage.css';
import Sponsor from '../../components/Sponsor/Sponsor';
import * as firebase from "firebase/app";
import "firebase/auth";
import cookie from 'react-cookies';

import arrow from '../../assets/right-arrow.svg';
import facebook from '../../assets/facebook.svg';
import twitter from '../../assets/twitter.svg';
import instagram from '../../assets/instagram.svg';
import github from '../../assets/github.svg';
import linkedin from '../../assets/linkedin.svg';   

class TimerPage extends Component {
    constructor(props) {
        super(props)
        this.count = this.count.bind(this)
        this.state = {
            days: 0,
            minutes: 0,
            hours: 0,
            secounds: 0,
            time_up:""
        }
        this.x = null
        this.deadline = null
    }
    count () {        
        var now = new Date().getTime();
        var t = this.deadline - now;
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((t % (1000 * 60)) / 1000);
        this.setState({days, minutes, hours, seconds})
        if (t < 0) {
                clearInterval(this.x);
                this.setState({ days: 0, minutes: 0, hours: 0, seconds: 0, time_up: "TIME IS UP" })
            }
    }
    componentDidMount() {
        this.deadline = new Date("dec 06, 2019 16:20:00").getTime();
 
        this.x = setInterval(this.count, 1000);
    }

    handleQuit=()=>{
        const that=this;
        firebase.auth().signOut().then(function() {
            cookie.remove('enigma6', { path: '/' })
            that.renderRedirect();
            that.handleClose();
            console.log("Logged out")
          }).catch(function(error) {
            console.log(error)
          });
        window.location.href = "/"
    }
    
    render() {
        const { days, seconds, hours, minutes } = this.state
        return ( 
            <div className='TimerPage'>
                <div class = "Timer__heading">
                    Enigma begins in
                </div>
                <br></br>
                <br></br>
                <div className="Timer">
                    <div className="Timer__days">{days} Days</div>
                    <div className="Timer__hours">{hours} Hours</div>
                    <div className="Timer__mins">{minutes} Minutes</div>
                    <div className="Timer__seconds">{seconds} Seconds</div>
                </div>
                <br></br>
                <div id="social">
                    <span className="icons"><a target="_blank" href="https://www.facebook.com/IEEEVIT"><img src={facebook}/></a></span>
                    <span className="icons"><a target="_blank" href="https://www.instagram.com/ieeevitvellore"><img src={instagram}/></a></span>
                    <span className="icons"><a target="_blank" href="https://twitter.com/ieeevitvellore"><img src={twitter}/></a></span>
                    <span className="icons"><a target="_blank" href="https://www.linkedin.com/company/ieee-vit-vellore/"><img src={linkedin}/></a></span>
                    <span className="icons"><a target="_blank" href="https://github.com/IEEE-VIT"><img src={github}/></a></span>
                </div>
                <br></br>
                <div className="Back_Button_Container_Timer"><button onClick={() => this.handleQuit()} className='Back__button__Timer'> <div className="Arrow"><span className='glyphicon glyphicon-chevron-left'></span></div>Log out</button></div>
                <Sponsor pos="relative"/>
            </div>
        )
    }
}

export default TimerPage