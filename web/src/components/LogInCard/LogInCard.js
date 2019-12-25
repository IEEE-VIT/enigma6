import React from 'react';
import Header from '../Header/Header';
import OAuthButton from '../OAuth-Button/OAuthButton';
import RegisterLogin from '../Register-Login/RegisterLogin';
import Footer from '../Footer/Footer';
import InputField from '../Input-Field-LogIn/InputField';
import * as firebase from "firebase/app";
import "firebase/auth";
import cookie from 'react-cookies';
import Loader from '../../components/loader/loader';
import Sponsor from '../../components/Sponsor/Sponsor';
import './LoginCard.css';

require('dotenv').config();

class SignUpCard extends React.Component {

    constructor(){
        super();
        this.state={
            email: "",
            password: "",
            error:false,
            showPassword: false,
            loading: false,
            errMsg:"",
            buttonText: "Log In"
        };
    }

    handleChange = prop => event => {
        this.setState({[prop]: event.target.value });
      };

      handleClickShowPassword = () => {
        this.setState({showPassword: !this.state.showPassword });
      };

    signIn = async () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().languageCode = 'en';
        firebase.auth().signInWithRedirect(provider);
    }
    
    componentWillMount(){
        // temp
        if(document.cookie.indexOf('enigma6')===0){
            window.location.href="/play";
        }
        var that = this;
        this.setState({loading: true});
        firebase.auth().getRedirectResult().then(function(result) {
            if (result.credential) {
            //   var token = result.credential.accessToken;
              // ...
            }
            // The signed-in user info.
            var user = result.user;
            fetch(`${process.env.REACT_APP_API_URL}/api/registerPlayer`,{
                method: "post",
                headers: {
                    'Content-type':'application/json',
                    'Authorization': "Bearer "+user.uid
                },
                body: JSON.stringify({
                    name: user.displayName,
                    email: user.email
                })
            })
            .then(response => response.json())
            .then(data => {
                const expires = new Date()
                expires.setDate(Date.now() + 1000 * 60 * 60 * 1)
                that.setState({loading: false})
                cookie.save('enigma6', JSON.stringify({uid: user.uid}),{
                    expires
                });  
            })
            .then(() => {
                window.location.href = "/play";
            })
            .catch(e => {
                that.setState({loading: false});
            });
          }).catch(function(error) {
            this.setState({loading: false})
            // Handle Errors here.
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // The email of the user's account used.
            // var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            // var credential = error.credential;
            // ...
          }.bind(this));
          
    }

    onButtonPressSignIn=()=>{
        this.setState({buttonText: "Loading.."})
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((data)=>{

            if(data.user.emailVerified){
                const expires = new Date();
                expires.setDate(Date.now() + 1000 * 60 * 60 * 1);
                cookie.save('enigma6', JSON.stringify({uid: data.user.uid}),{
                expires
            })
            window.location.href = "/play";
            this.setState({buttonText: "Log In"})   
        }
        else{
            this.setState({error:true})
            this.setState({errMsg:'Please verify your email'});
            this.setState({buttonText: "Log In"})
        }
            fetch(`${process.env.REACT_APP_API_URL}/api/auth/profile`,{
                 method: "post",
                 headers: {
                     'Content-type':'application/json',
                     'Authorization': "Bearer "+data.user.uid//data.user.uid
                 },
             }).then((data1)=>{
                 if(data1.status!==400){
                    this.setState({error:false});
                 }
                 //this.setState({error:false});
                //  window.location.href="/play";
                 //return data1.json();
             })/*.then((data1)=>{
                this.setState({error:false});
                 alert(data1.payload.user);
             });*/
        })
        .catch((e)=>{
            this.setState({error:true});
            this.setState({errMsg:'Please check your credentials'});
            this.setState({buttonText: "Log In"})
       });
    } 


    render(){
        return(
            this.state.loading
            ?
            <div className="load">
                <Loader/>
            </div>
            :
            <div>
                <div className="auth-card">
                    <Header title="Log In"/>
                    <center>
                        <OAuthButton clickEvent={this.signIn} logo="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"/>
                        <br></br>
                        <span>
                        <hr class="line"></hr>
                        <strong>OR</strong>
                        <hr class="line"></hr>
                    </span>
                    <InputField handleChange={this.handleChange} handleClickShowPassword={this.handleClickShowPassword} showPassword={this.state.showPassword}/>
                    <br />
                    {this.state.error ? <div className="emailSent"><strong>{this.state.errMsg}<br></br><br></br></strong></div> : null }
                    <RegisterLogin title={this.state.buttonText} onclick={this.onButtonPressSignIn}/>
                    <br></br>
                    <Footer title="Don't have an account?" action="Sign Up" />
                    </center>
                </div>
                <Sponsor pos="absolute"/>
            </div>
            // <div className="card-container">
            //     <div className='signupcard'>
            //         <div className="scroll-handler">
            //             <br></br>
            //             <Header title="Log In"/>
            //             <center>
            //                 <OAuthButton clickEvent={this.signIn} logo="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"/>
            //             </center>
            //             <h5 className="Horizontal_line"><span>OR</span></h5>
            //             <InputField handleChange={this.handleChange} handleClickShowPassword={this.handleClickShowPassword} showPassword={this.state.showPassword}/>
            //             <br />
            //             {this.state.error ? <div className="emailSent"><strong>{this.state.errMsg}</strong></div> : null }
            //             <RegisterLogin title={this.state.buttonText} onclick={this.onButtonPressSignIn}/>
            //             <Footer title="Don't have an account?" action="Sign Up" />
            //         </div>
            //     </div>
            //     <Sponsor pos="absolute"/>
            // </div>
        );
    }
}

export default SignUpCard;