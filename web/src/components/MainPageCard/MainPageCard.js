import React from 'react';
import './MainPageCard.css';
import MainPageButton from '../MainPageButton/MainPageButton';
import MainQuestionPage from '../../pages/MainQuestionPage/MainQuestionPage';
import ProfilePage from '../../components/profilePage/profilePage';
import GetFamiliarPage from '../../pages/GetFamiliarPage/GetFamiliarCard';
import Leaderboard from '../../components/LeaderBoard/LeaderBoard';
import DisplayNameModal from '../../components/ChangeDisplayName/ChangeDisplayName'
import cookie from 'react-cookies';
import QuitModal from '../../components/QuitModal/QuitModal';
import * as firebase from "firebase/app";
import "firebase/auth";
import CookieConsent from "react-cookie-consent";
import Sponsor from '../../components/Sponsor/Sponsor';
import TimerPage from '../../pages/TimerPage/TimerPage';


class MainPageCard extends React.Component {
    constructor(){
        super()
        this.state = {
            pageName: "home",
            isOpen:false,
            isNameDefault:false,
            nameInput:'',
            errMsg:'',
            errMsgStatus:false
        }
    }

    handleNewName=()=>{
        fetch(`${process.env.REACT_APP_API_URL}/api/auth/changeProfile`,{
                    method: "post",
                    headers: {
                        'Content-type':'application/json',
                        "Authorization":"Bearer "+cookie.load('enigma6').uid//this.state.uid
                    },
                    body: JSON.stringify({
                        "name": this.state.nameInput
                    })
                })
                .then(response => response.json())
                .then((response)=>{
                    //console.log(this.state.uid);
                    //this.setState({user});
                    if(response.payload.hasOwnProperty('errorMsg')){
                         this.setState({errMsgStatus:true})
                         this.setState({errMsg: response.payload.errorMsg})
                         this.setState(()=>({isNameDefault: true }))    
                    } else{
                        this.setState(()=>({isNameDefault: false }))
                    }
                })
                .catch(function(error) {
                    // Handle Errors here.
                    // var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    // var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    // var credential = error.credential;
                    // ...
                    this.setState({loading: false})
                  }.bind(this));
                 
    }

    changeusernameInput=(event)=>{
        //console.log(event.target.value);
        this.setState({
            nameInput: event.target.value
        });
    }
    
    handleCloseUserName=()=>{
        this.setState(()=>({isNameDefault: false }))
    }
    handleConfirmationChangeUsername = () => {
       this.setState(()=>({confirmation: true, isNameDefault: false }));
    }

    componentWillMount=()=>{
        //console.log("Here!");
        //console.log(cookie.load('enigma6').uid);
        //console.log(document.cookie.indexOf('enigma6'));//cookie_name=
        if(document.cookie.indexOf('enigma6')===(-1)){
            window.location.href="/signup";
        }
        if(cookie.load('enigma6')!=null || true){
            fetch(`${process.env.REACT_APP_API_URL}/api/auth/profile`,{
                method: "post",
                headers: {
                    'Content-type':'application/json',
                    'Authorization': "Bearer "+cookie.load('enigma6').uid//cookie.load('enigma6').uid//user.uid
                }
            }).then(res=>res.json())
            .then((data)=>{
                //console.log(data);
                this.setState({isNameDefault: data.payload.user.isNameDefault});
                if(data.statusCode===400){
                    console.log("Unauthorized!");
                }
            });
        }
        else{
            console.log("Unauthorized!");
        }
    }
    handleClose=()=>{
        this.setState({isOpen:false});
    }

    renderRedirect = () => {
         window.location.href='/';
    }

    handleOpen=()=>{
        this.setState(()=>({isOpen: true }));
    }

    handleQuit=()=>{
        const that=this;
        firebase.auth().signOut().then(function() {
            cookie.remove('enigma6', { path: '/' })
            that.renderRedirect();
            that.handleClose();
            console.log("Logged out")
          }).catch(function(error) {
          });
    }

    changePage = (event) => {
        this.setState({pageName: event.target.name});
    }
    render(){
        if (process.env.REACT_APP_ENV === "prod") {
            return(
                <div>
                    <TimerPage/>
                    <DisplayNameModal 
                    isOpen={this.state.isNameDefault}
                    handleConfirmationChange={this.handleConfirmationChangeUsername}
                    changeusernameInput={this.changeusernameInput}
                    handleNewName={this.handleNewName}
                    handleClose={this.handleCloseUserName}
                    errMsg={this.state.errMsg}
                    />
                </div>
            );
        } else {
            if (this.state.pageName === "home") {
                return(
                    <div className='div0'>
                        <div className='div1'>
                            <div className='div2'>
                                <MainPageButton clickFunc={this.changePage} name={'Play now'} />
                                <MainPageButton clickFunc={this.changePage} name={'Rules'} />
                                <MainPageButton clickFunc={this.changePage} name={'Leaderboard'} />
                                <MainPageButton clickFunc={this.changePage} name={'Profile'} />
                                <MainPageButton clickFunc={this.handleOpen} name={'Quit'} />
                            </div>
                            <QuitModal 
                                isOpen={this.state.isOpen}
                                handleClose={this.handleClose}
                                handleQuit={this.handleQuit}
                            />
                            <DisplayNameModal 
                                isOpen={this.state.isNameDefault}
                                handleConfirmationChange={this.handleConfirmationChangeUsername}
                                changeusernameInput={this.changeusernameInput}
                                handleNewName={this.handleNewName}
                                handleClose={this.handleCloseUserName}
                                errMsg={this.state.errMsg}
                            />
                        </div>
                        <CookieConsent
                        buttonText="Got it!"
                        cookieName="e_n_i_g_m_a"
                        style={{ background: "#fafafa"}}
                        buttonStyle={{ color: "white", fontSize: "13px" ,borderRadius:"6px",background:"black"}}
                        expires={150}
                        className="cookieToast"
                        >
                        <span style={{color: "black"}}>Enigma 6.0 uses cookies to give its users one of the best cryptic hunt experiences online</span>
                        </CookieConsent>
                        <Sponsor pos="absolute"/>
                    </div>
                );
            } else if (this.state.pageName === "Play now") {
                return <MainQuestionPage/>
            } else if (this.state.pageName === "Profile") {
                return (<ProfilePage/>)
            } else if (this.state.pageName === "Rules") {
                return (<GetFamiliarPage/>)
            } else if (this.state.pageName === "Leaderboard") {
                return <Leaderboard/>
            } else {
                this.setState({pageName: "home"})
            }
        }
        
    }
}

export default MainPageCard;