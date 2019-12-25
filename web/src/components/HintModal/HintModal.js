import React from 'react'
import Modal from 'react-modal'
import './HintModal.css'

const HintModal = ({isOpen,handleConfirmationChange}) => (
    <Modal
        isOpen={!!isOpen}
        onRequestClose={handleConfirmationChange}
        contentLabel = "Hint"
        closeTimeoutMS={200}
        className="Modal"
    >
        <h3 className="modal__title">Are you sure you want to use a hint?</h3>
        <p><em>This may cost you some points! Check the rules for more info.</em></p>
        <div className="Button_container_modal">
            <button onClick={()=>{handleConfirmationChange("Use");}} className="button__modal__use">Use</button>
            <button onClick={()=>{handleConfirmationChange("No")}} className="button__modal__no">No</button>
        </div>
        
    </Modal>
)

export default HintModal 