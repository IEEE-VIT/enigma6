import React from 'react'
import Modal from 'react-modal'
import './QuitModal.css'

const QuitModal = ({isOpen,handleClose,handleQuit}) => (
    <Modal
        isOpen={!!isOpen}
        onRequestClose={handleClose}
        contentLabel = "Quit"
        closeTimeoutMS={200}
        className="Modal"
        styles={{ modal: {}, overlay: { background: "#ccc" } }}
    >
        <h3 className="modal__title">Are you sure you want to quit playing?</h3>
        <div className="Button_container_modal">
            <button onClick={handleClose} className="button__modal__use">No</button>
            <button onClick={handleQuit} className="button__modal__no">Quit</button>
        </div>
        
    </Modal>
)

export default QuitModal 