import React from 'react';
import AnswerField from '../../components/AnswerFieldMainPage/AnswerField'
import HintModal from '../../components/HintModal/HintModal';
import CorrectAnswerModal from '../../components/CorrectAnswerModal/CorrectAnswerModal.js'
import './MainQuestionPage.css'
import cookie from 'react-cookies';
import Loader from '../../components/loader/loader';
import Sponsor from '../../components/Sponsor/Sponsor';

const taunts = {
    1: [
        "Almost there! Think harder.",
        "You're nearly there!",
        "Quiet close! Come on!"
    ],
    2: [
        "Close, but not close enough.",
        "You are on the right path.",
        "Think. Think harder!"
    ],
    3: [
        "You might be thinking along those lines",
        "Nice approach. But, try harder",
        "Think you're smart?"
    ],
    4: [
        "Nope. Try using a hint?",
        "Ah, you're better than this. Use a hint.",
        "Faaar from home. Use your hint!"
    ]
}

class MainQuestionPage extends React.Component {
    constructor(){
        super()
        this.state = {
            question: "",
            hint: "",
            imgUrl: "",
            answer: "",
            confirmation: false,
            isOpen:false,
            level: "",
            closeness: "",
            borderColor: false,
            correctAnswerModal: false,
            closenessColor: 'black',
            buttonText: 'Submit',
            loading: false
        }
    }

    generateTaunt = (index) => {
        if (index === 1) {
            this.setState({closenessColor: "#007944"})
        } 
        
        if (index === 2) {
            this.setState({closenessColor: "FFBF00"})
        } 
        if (index === 3){
            this.setState({closenessColor: "#eb8242"})
        }

        else {
            this.setState({closenessColor: "#da2d2d"})
        }
        
        return taunts[index][Math.floor(Math.random() * 4)]
    }
    onSubmit=()=>{
        this.setState({buttonText: "Checking..."})
        this.setState({closeness: ""})
        fetch(`${process.env.REACT_APP_API_URL}/api/auth/checkAnswer`,{
            method: "POST",
                headers: {
                    'Content-type':'application/json',
                    'Authorization': "Bearer "+cookie.load('enigma6').uid//cookie.load('enigma6').uid//cookie.load('uid')
                },body: JSON.stringify({
                    answer: this.state.answer.toLowerCase()
                })
            }).then(data=>data.json())
            .then((data)=>{
                if(data.payload.msg==='Correct Answer'){
                    this.setState({correctAnswerModal: true});
                    // this.setState({loading: false});
                    this.setState({buttonText: "Submit"})
                    document.getElementById("AnswerField").value = "";
                    }
                else{
                    this.setState({closeness: this.generateTaunt(data.payload.howClose)});
                    this.setState({borderColor: true});
                    this.setState({buttonText: "Submit"})
                }
            })
            .catch(err => {
                this.setState({closeness: this.generateTaunt(4)});
                this.setState({buttonText: "Submit"});
            })
    }
    reloadPage = () => {
        window.location.reload()
    }

    onchange=(event)=>{
        this.setState({answer: event.target.value});
    }

    handleOpen=()=>{
        this.setState(()=>({isOpen: true }));
    }
    afterCorrectAnswer=()=>{
        fetch(`${process.env.REACT_APP_API_URL}/api/auth/getCurrent`,{
            method: "POST",
                headers: {
                    'Content-type':'application/json',
                    'Authorization': "Bearer "+cookie.load('enigma6').uid//cookie.load('enigma6').uid//cookie.load('uid')
                }
            }).then(data=>data.json())
            .then((data)=>{
                this.setState({closeness: ""});
                this.setState({borderColor: false});
                // this.setState({loading: false});
                this.setState({correctAnswerModal: false});
                this.setState({question: data.payload.question});
                this.setState({hint: data.payload.hint});
                this.setState({imgUrl: data.payload.imgURL});
                this.setState({level: data.payload.level});
            });
        }
    handleConfirmationChange = (resp) => {
        if(resp==='Use')
         {
            this.setState({confirmation: true});
            this.setState({isOpen: false });
            fetch(`${process.env.REACT_APP_API_URL}/api/auth/hintClicked`,{
            method: "POST",
                headers: {
                    'Content-type':'application/json',
                    'Authorization': "Bearer "+cookie.load('enigma6').uid//cookie.load('enigma6').uid//cookie.load('uid')
                }
            }).then(data=>data.json())
            .then((data)=>{
                if (data.payload.hint !== "Hint already used")
                this.setState({hint: data.payload.hint});
            });
         }
        else if(resp==="No"){
            //this.setState(()=>({confirmation: false, isOpen: false }));
            this.setState({confirmation: false});
            this.setState({isOpen: false });
        }
    }

    componentWillMount(){
        //fetch question here
        this.setState({loading: true})
        fetch(`${process.env.REACT_APP_API_URL}/api/auth/getCurrent`,{
            method: "POST",
                headers: {
                    'Content-type':'application/json',
                    'Authorization': "Bearer "+cookie.load('enigma6').uid//cookie.load('enigma6').uid//cookie.load('uid')
                }
            }).then(data=>data.json())
            .then((data)=>{
                this.setState({borderColor: false});
                this.setState({loading: false});
                this.setState({closeness: ""});
                this.setState({question: data.payload.question});
                this.setState({hint: data.payload.hint});
                this.setState({imgUrl: data.payload.imgURL});
                this.setState({level: data.payload.level});
            });
    }
    render(){
        return(
            <div style={{'minHeight':'100%'}}>
                {
                    this.state.loading ?
                    <div className="load">
                        <Loader/>
                    </div>
                    :
                    <div>
                    <div onClick={this.reloadPage}><button className='Back__button'> <span className='glyphicon glyphicon-chevron-left'></span> Go Back </button></div>
                    <div id="questions-container">
                        <h4 id="question-heading"><strong>Question {this.state.level}</strong></h4>
                        <br></br>
                        <p style={{'fontSize':'1.2em'}}><strong>{this.state.question}</strong></p>
                        <p style={{'fontSize':'1.2em'}}>
                            {this.state.hint ?
                                <div>
                                    <em>
                                    <strong>HINT - </strong>
                                    {this.state.hint}
                                    </em>
                                </div>
                                :
                                ""
                            }
                        </p>
                        <br></br>
                        <img id="q-img" src={this.state.imgUrl} alt="Question"></img>
                        <br></br>
                        <br></br>
                        <AnswerField
                            borderColor={this.state.borderColor}
                            isOpen={this.state.isOpen}
                            handleConfirmationChange={this.handleConfirmationChange}
                            handleOpen={this.handleOpen}
                            onchange={this.onchange}                        />
                        <HintModal
                        isOpen={this.state.isOpen}
                        handleConfirmationChange={this.handleConfirmationChange}
                        />
                        <div className="closeness">
                                <p style={{'color':'#454545'}}>
                                    {this.state.closeness}
                                </p>        
                        </div>
                        <div className='button_container_main_question'>
                            <button disabled={!this.state.answer.length} className='MainQuestionPage__SubmitButton' onClick={this.onSubmit}>{this.state.buttonText}</button>
                        </div>
                        <CorrectAnswerModal
                        correctAnswerModal={this.state.correctAnswerModal}
                        afterCorrectAnswer={this.afterCorrectAnswer}
                        />
                    </div>
                    </div>
                }
                <Sponsor pos="relative"/>
            </div>
        );
    }
}

export default MainQuestionPage;