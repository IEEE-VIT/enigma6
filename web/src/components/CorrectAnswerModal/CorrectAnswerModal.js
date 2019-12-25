import React from 'react'
import Modal from 'react-modal'
import './CorrectAnswerModal.css'

const CorrectAnswerModal = ({correctAnswerModal, afterCorrectAnswer}) => {
    return (
    <Modal
        isOpen={correctAnswerModal}
        onRequestClose={afterCorrectAnswer}
        contentLabel = "Hint"
        closeTimeoutMS={200}
        className="Modal"
    >
        <h3 className="modal__title">Congratulations your answer is correct</h3>
        <div className="Button_container_modal">
            <button onClick={()=>{afterCorrectAnswer();}} className="button__modal__use">Continue</button>
        </div>
        
    </Modal>
);}

export default CorrectAnswerModal;