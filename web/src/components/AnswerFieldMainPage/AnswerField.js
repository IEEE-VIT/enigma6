import React from 'react';
import './AnswerField.css';
import hint from '../../assets/unusedHint.png';

//class AnswerField extends React.Component{
class AnswerField extends React.Component {
//const AnswerField = ({handleOpen, onchange}) => {\
    constructor(props){
        super(props);
        this.state = {
        }
    }
    componentDidMount=()=>{
        if(this.props.borderColor){
            document.getElementById("AnswerField").style.borderColor="red";
        }
    }
    render(){
        return (
            <center>
            <div className="answer-field-container">
                <center>
                    <input id="AnswerField" className='MainQuestionPage__Answer' 
                        placeholder='Type your answer here'
                        onChange={this.props.onchange}
                        />
                    <button
                        className = "hint_image"
                        onClick={this.props.handleOpen}
                        >
                        <img alt="Take a hint?"src = {hint}></img>
                    </button>
                </center>
            </div>
            </center>
        )
    }
}

export default AnswerField;