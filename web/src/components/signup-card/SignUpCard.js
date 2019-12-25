import React from 'react';
import './signup-card.css';
import Header from '../Header/Header';
// import OAuthButton from '../OAuth-Button/OAuthButton';
import RegisterLogin from '../Register-Login/RegisterLogin';
import Footer from '../Footer/Footer';
import InputField from '../Input-Field-SignUp/InputField';
import * as firebase from "firebase/app";
// import cookie from 'react-cookies';
import "firebase/auth";
import Recaptcha from 'react-recaptcha';
import Loader from '../../components/loader/loader';
import Sponsor from '../../components/Sponsor/Sponsor';

require('dotenv').config();

let recaptchaInstance;

const executeCaptcha = function () {
        recaptchaInstance.execute();
};

//DO NOT TOUCH THIS SECTION OF THE CODE NO MATTER WHAT.
firebase.initializeApp({
    apiKey: "AIzaSyAF9tG0eaNcyij9xCBtZ1jVTJueThdnQiA",
    authDomain: "app.enigma.ieeevit.com"
});

class SignUpCard extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            password: '',
            name: '',
            email: '',
            confirmpassword: '',
            showPassword: false,
            showConPassowrd: false,
            isVerified: false,
            emailSent:false,
            registerButtonText: "Register"
        };
    }

    that = this;
    
    handleChange = prop => event => {
        this.setState({[prop]: event.target.value });
      };
    
    handleClickShowPassword = () => {
        this.setState({showPassword: !this.state.showPassword });
      };
    
    handleClickShowConPassword = () => {
        this.setState({showConPassword: !this.state.showConPassword });
      };

    recaptchaVerify=()=>{
        if(this.state.isVerified){
            this.onButtonPressSignIn();
        }
        else{
            alert("Failed to verify reCapcha! Check your connectivity or refresh the page!");
        }
    }

    verifyCallback=(token)=>{
        if (token) {
            this.setState({isVerified: true}, () => {
                console.log("Verified recaptcha!");
            })
        }
        else {
            this.setState({isVerified: false})
            console.log("failed to verify recaptcha!")
        }
    }

    componentWillMount(){

        if(document.cookie.indexOf('enigma6')===0){
            console.log("Redirecting!");
            window.location.href="/play";
        }
    }
    componentDidMount(){
        setTimeout(function(){
            executeCaptcha();
        }, 3000);
    }

   onButtonPressSignIn=()=>{

        this.setState({registerButtonText: "Loading.."})
       if(this.state.password === this.state.confirmpassword){
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((data)=>{
                var user = firebase.auth().currentUser
                user.sendEmailVerification().then(()=>{
                    this.setState({emailSent:true})
                }).catch((e)=>{
                    //Email not
                })
                //console.log(Object.keys(data));
                fetch(`${process.env.REACT_APP_API_URL}/api/registerPlayer`,{
                    method: "post",
                    headers: {
                        'Content-type':'application/json',
                        'Authorization': "Bearer "+data.user.uid
                    },
                    body: JSON.stringify({
                        name: this.state.name,
                        email: this.state.email
                    })
                }).then((data1)=>{
                    return data1.json();
                }).then((data1)=>{
                    if (data1.statusCode !== 200) {
                        this.setState({emailSent:false})
                        alert(data1.payload.msg)
                        this.setState({registerButtonText: "Register"})
                    } else {

                        alert("A verification Email has been sent! Wait up to 5mins.")
                    }
                    this.setState({registerButtonText: "Register"})
                })
            })
            .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode === 'auth/weak-password') {
            alert('The password is too weak.');
            } else {
            alert(errorMessage);
            this.setState({registerButtonText: "Register"})
            }
            // [END_EXCLUDE]
        }.bind(this));
       }
       else{
           alert('Seems like your passwords do not match!');
           this.setState({registerButtonText: "Register"})
       }
   }
    render() {
        return(
            <div>
            {
                this.state.loading ?
                <div className="load">
                    <Loader/>
                </div>
                    :
                <div>
                    <div className="auth-card">
                        <Header title="Join ENIGMA"/>
                        <br></br>
                        {this.state.emailSent ? 
                        <div>
                            <div className="emailSent"><strong>A verification E-mail has been sent!</strong><br></br></div> 
                        <br></br>
                        </div>
                        : null}
                        <center>
                            <InputField 
                            handleChange={this.handleChange}
                            handleClickShowPassword={this.handleClickShowPassword}
                            handleClickShowConPassword={this.handleClickShowConPassword}
                            showPassword={this.state.showPassword}
                            showConPassword={this.state.showConPassword}
                            />
                            <br />
                            <RegisterLogin title={this.state.registerButtonText} onclick={this.recaptchaVerify}/>
                            <br></br>
                            <Footer title="Have an account?" action="Log In" />
                        </center>
                    </div>
                    <Sponsor pos="absolute"/>
                </div>
                // <div className="card-container">
                //     <div className='signupcard'>
                //         <div className="scroll-handler">
                //             <br></br>
                //             <Header title="Join ENIGMA"/>
                //             <br></br>
                //             {/* <div className="OAuthcontainer">
                //                 <OAuthButton clickEvent={this.signIn} title="Continue using Google" logo="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"/>
                //             </div>
                //             <h5 className="Horizontal_line"><span>OR</span></h5> */}
                //             {this.state.emailSent ? 
                //             <div>
                //                 <div className="emailSent"><strong>A verification E-mail has been sent!</strong><br></br></div> 
                //             <br></br>
                //             </div>
                //             : null}
                //             <InputField 
                //                 handleChange={this.handleChange}
                //                 handleClickShowPassword={this.handleClickShowPassword}
                //                 handleClickShowConPassword={this.handleClickShowConPassword}
                //                 showPassword={this.state.showPassword}
                //                 showConPassword={this.state.showConPassword}
                //             />
                //             <br />
                //             <RegisterLogin title={this.state.registerButtonText} onclick={this.recaptchaVerify}/>
                            
                //             <Footer title="Have an account?" action="Log In" />
                //         </div>
                //     </div>
                //     <Sponsor pos="absolute"/>
                // </div>
            }
            <div style={{'display':'none'}} className="recaptcha">
                <Recaptcha
                ref={e => recaptchaInstance = e}
                sitekey={process.env.REACT_APP_SITE_KEY}
                size="invisible"
                theme="dark"
                verifyCallback={this.verifyCallback}
                onloadCallback={(res)=>{
                    console.log("Loaded captcha")
                }}
            />
            </div>
        </div>
        );
}
}

export default SignUpCard;