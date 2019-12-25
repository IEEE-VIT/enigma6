import React from 'react';
import './profilePage.css';
//import Header from '../Header/Header';
//import OAuthButton from '../OAuth-Button/OAuthButton';
//import RegisterLogin from '../Register-Login/RegisterLogin';
//import Footer from '../Footer/Footer';
// import PageImage from '../../images/Group 470.svg';
import editPen from '../../images/editPen.png';
import '../../pages/CornerPage/CornerPage.js';
//import CornerPage from '../../pages/CornerPage/CornerPage.js';
import DisplayNameModal from '../ChangeDisplayName/ChangeDisplayName'
import cookie from 'react-cookies';
import Loader from '../../components/loader/loader';
import Sponsor from '../../components/Sponsor/Sponsor';

//const SetUpProfile = () => {
class ProfilePage extends React.Component{
    constructor(){
        super();
        this.state={
            loading: false,
            nameInputFieldState: true,
            usernameInputFieldState: true,
            nameInput: "",
            level:"",
            points:"",
            email: "",
            isOpen:false,
            newName:"",
            position: 58,
            errMsg:'',
            errMsgStatus:false
        };
    }

    reloadPage = () => {
        window.location.reload()
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
                    console.log(response);
                    if(response.payload.hasOwnProperty('errorMsg')){
                         this.setState({errMsgStatus:true})
                         this.setState({errMsg: response.payload.errorMsg})
                         console.log(this.state.errMsg)
                         this.setState(()=>({isOpen: true }))    
                    }
                    else{
                        console.log("don't enter")  
                        this.setState({errMsg:''})
                        this.setState({errMsgStatus:false})
                        this.setState(()=>({usernameInput: response.payload.user.name}));//response.statusCode
                        this.setState({email: response.payload.user.email});
                        this.setState({points: response.payload.user.points});
                        this.setState({level: response.payload.user.level});
                        //this.setState({position: response.payload.user.rank});
                        //this.setState({points: response.user.points});
                        this.setState(()=>({isOpen: false }))
                    }
                    
                })
                .catch(function(error) {
                    // Handle Errors here.
                    // var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorMessage)
                    // The email of the user's account used.
                    // var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    // var credential = error.credential;
                    // ...
                    this.setState({loading: false})
                  }.bind(this));

                  
    }

    handleOpen=()=>{
        this.setState(()=>({isOpen: true }))
    }
    handleClose=()=>{
        this.setState(()=>({isOpen: false }))     
    }
    handleConfirmationChange = () => {
       this.setState(()=>({confirmation: true, isOpen: false }));
    }

    changeNameState=(event)=>{
        console.log("Here!");
        this.setState({nameInputFieldState: !this.state.nameInputFieldState});
    }

    changeUserNameState=(event)=>{
        console.log("Here1!");
        this.setState({usernameInputFieldState: !this.state.usernameInputFieldState});
    }

    changenameInput=(event)=>{
        //console.log(event.target.value);
        this.setState({
            nameInput: event.target.value
        });
    }

    changeusernameInput=(event)=>{
        //console.log(event.target.value);
        this.setState({
            nameInput: event.target.value
        });
    }

    handleOnChange=(event)=>{
        this.setState({nameInput: event.target.value})
    }

    componentWillMount(){
        this.setState({ uid: cookie.load('enigma6') });
        this.setState({loading: true});
        this.setState({uid: cookie.load('enigma6',true)})
            
            fetch(`${process.env.REACT_APP_API_URL}/api/auth/profile`,{
                    method: "post",
                    headers: {"Authorization": "Bearer "+cookie.load('enigma6').uid}
                }) 
                .then(response => response.json())
                .then((response)=>{
                    console.log(response)
                    //console.log(this.state.uid)
                    this.setState(()=>({
                        usernameInput: response.payload.user.name,
                        email: response.payload.user.email,
                        points:  response.payload.user.points,
                        level:  response.payload.user.level,
                        position: response.payload.user.rank
                    }))
                    this.setState({loading: false})
                })
                .catch(function(error) {
                    // Handle Errors here.
                    // var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorMessage)
                    // The email of the user's account used.
                    // var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    // var credential = error.credential;
                    // ...
                    this.setState({loading: false})
                  }.bind(this));
        }


    render(){
        return(
            this.state.loading ? 
            <div className="load">
                <Loader/>
            </div>
                :
            <div className='maindiv'>
                <div onClick={this.reloadPage}><button className='Back__button'> <span className='glyphicon glyphicon-chevron-left'></span> Go Back </button></div>
                <div className='setUpProfileCard'>
                <div className="heading">Profile</div>
                <div className="horizontal_line"></div>
                <div className="container">
                    <div className="questionsContainer">
                        <div className=".containerHeading">Level</div>
                        <div className="containerContent">{this.state.level}</div>
                    </div>
                    <div className="pointsContainer">
                        <div className=".containerHeading">Points</div>
                        <div className="containerContent">{this.state.points}</div>
                    </div>
                    <div className="positionContainer">
                        <div className=".containerHeading">Position</div>
                        <div className="containerContent">{this.state.position}</div>
                    </div>
                </div>
                <div>
                    <div className="nameContainer">
                        <div className="inputHeader">Name</div>
                        <div className="Name_Container">
                            <div className="Display_Name">{this.state.usernameInput}</div>
                          <div className="iconContainer"><button className="displayName__edit" onClick={this.handleOpen}><img src={editPen} className="editPen" alt=""/></button></div>
                        </div>
                    </div>
                    <div className="inputHeader">EmailID</div>
                    <div className="emailField">{this.state.email}</div>
                    
                </div>
                <div className="buttonContainer">
                    <div onClick={() => window.location.href = "/play"} className="doneButton test"><center>Okay</center></div>
                </div>
            </div>

            <DisplayNameModal 
                    isOpen={this.state.isOpen}
                    handleConfirmationChange={this.handleConfirmationChange}
                    changeusernameInput={this.changeusernameInput}
                    handleNewName={this.handleNewName}
                    handleClose={this.handleClose}
                    errMsg={this.state.errMsg}
            />
            <Sponsor pos="absolute"/>
            </div>
        );
    }
}

export default ProfilePage;
//<input type="text" className="nameInput"/>
/*<div className="inputHeader">Username</div>
                    <div className="usernameField">{this.state.usernameInput}</div>*/