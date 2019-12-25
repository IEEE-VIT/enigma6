import React from 'react'
import Modal from 'react-modal'
import './ChangeDisplayName.css'

const DisplayNameModal = ({isOpen,handleConfirmationChange, changeusernameInput, handleNewName, handleClose,errMsg}) => (
    <Modal
        isOpen={!!isOpen}
        onRequestClose={handleClose}
        contentLabel = "Hint"
        closeTimeoutMS={200}
        className="Modal"
    >
        <h3 className="modal__title">Pick a new username</h3>
        {<div className="errMsg_username_modal">{errMsg}</div>}
        <input style={{'padding':'0.6em'}} className="NewDisplayName" placeholder="Your username" onChange={changeusernameInput}></input>
        <div className="Button_container_modal_changeUser">
            <button onClick={handleNewName}
                className="button__modal__use">Use</button>
            <button onClick={handleClose} className="button__modal__no">Close</button>
        </div>
        
    </Modal>
)

export default DisplayNameModal;