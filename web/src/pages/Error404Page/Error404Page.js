import React from 'react';
import ErrorGif from '../../assets/errorgif.gif';
import CornerPage from '../CornerPage/CornerPage'

import './Error404Page.css';

const Error404Page = () => {
    return(
        <div>
           <div id="img-404-holder">
                <center>
                    <img id="img-404" src={ErrorGif} alt='error gif'></img>
                </center>
            </div> 
            <CornerPage/>
        </div>
        
    )
}

export default Error404Page;