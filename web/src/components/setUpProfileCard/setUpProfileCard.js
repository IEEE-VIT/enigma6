import React from 'react';
import './setUpProfileCard.css';
//import Header from '../Header/Header';
//import OAuthButton from '../OAuth-Button/OAuthButton';
//import RegisterLogin from '../Register-Login/RegisterLogin';
//import Footer from '../Footer/Footer';
import PageImage from '../../images/Group 470.svg';
import editPen from '../../images/editPen.png';
import '../../pages/CornerPage/CornerPage.js';
//import CornerPage from '../../pages/CornerPage/CornerPage.js';

//const SetUpProfile = () => {
class SetUpProfile extends React.Component{
    constructor(){
        super();
        this.state={
            nameInputFieldState: true,
            usernameInputFieldState: true,
            nameInput: "First Last Name",
            usernameInput: "Username"
        };
    }

    changeNameState=(event)=>{
        this.setState({nameInputFieldState: !this.state.nameInputFieldState});
    }

    changeUserNameState=(event)=>{
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
            usernameInput: event.target.value
        });
    }

    render(){
        return(
            <div className='setUpProfileCard'>
                <div className="heading">Set up your profile</div>
                <div className="horizontal_line"></div>
                <div className="inputField">
                    <div className="dot">
                    </div>
                    <div>Email Address:</div>
                    <div className="emailID">emailid@email.com</div>
                </div>
                <div className="inputField">
                    <div className="dot">
                    </div>
                    <div>Full Name:</div>
                    {
                        this.state.nameInputFieldState
                        ?(<div className="name1">{this.state.nameInput}</div>)
                        :(<div className="name1"><input onChange={this.changenameInput} className=""/></div>)
                    }
                    <div className="iconContainer"><img className="editPen" onClick={this.changeNameState} src={editPen} alt="" /></div>
                </div>
                <div className="inputField">
                    <div className="dot">
                    </div>
                    <div>Username:</div>
                    {
                        this.state.usernameInputFieldState
                        ?(<div className="name1">{this.state.usernameInput}</div>)
                        :(<div className="name1"><input onChange={this.changeusernameInput} className=""/></div>)
                    }
                    <div className="iconContainer"><img className="editPen" onClick={this.changeUserNameState} src={editPen} alt="" /></div>
                </div>
                <img src={PageImage} alt=""/>
                <div className="buttonContainer">
                    <div className="doneButton">Done</div>
                </div>
            </div>
        );
    }
}

export default SetUpProfile;
//<input type="text" className="nameInput"/>