import React from 'react'
import './RegisterLogin.css'

const RegisterLogin = ({title, onclick})=>{
    return (
        <center>
            <button onClick={onclick} id="reg-btn">{title}</button>
        </center>
    )

}

export default RegisterLogin