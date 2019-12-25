import React from 'react';

import './EnigmaLogo.css';
import logo from '../../assets/logo.png';
import ENIGMA from '../../assets/ENIGMA.gif';
import arrow from '../../assets/right-arrow.svg';
import facebook from '../../assets/facebook.svg';
import twitter from '../../assets/twitter.svg';
import instagram from '../../assets/instagram.svg';
import github from '../../assets/github.svg';
import linkedin from '../../assets/linkedin.svg';

const EnigmaLogo=()=>{
    return (
        <div className="logo-container">
            <div className="logo-div">
                <center>
                    <a without rel="noopener noreferrer" target="_blank" href="https://ieeevit.com"><img alt="IEEE" width="128em" src={logo}/></a>    
                </center>
                <img without rel="noopener noreferrer" className="enigmaSVG" src={ENIGMA} alt="logo"/><br></br>
                {/* <p className="ClickAnywhere flash">Click anywhere to play</p> */}
                <center>
                <img without rel="noopener noreferrer" onClick={() => window.location.href ="/login"} id="arrow" src={arrow}/><br></br>
                <p style={{"color":"white"}}>Play now</p>
                <br></br>
                <div id="social">
                    <span without rel="noopener noreferrer" className="icons"><a target="_blank" href="https://www.facebook.com/IEEEVIT"><img src={facebook}/></a></span>
                    <span without rel="noopener noreferrer" className="icons"><a target="_blank" href="https://www.instagram.com/ieeevitvellore"><img src={instagram}/></a></span>
                    <span without rel="noopener noreferrer" className="icons"><a target="_blank" href="https://twitter.com/ieeevitvellore"><img src={twitter}/></a></span>
                    <span without rel="noopener noreferrer" className="icons"><a target="_blank" href="https://www.linkedin.com/company/ieee-vit-vellore/"><img src={linkedin}/></a></span>
                    <span without rel="noopener noreferrer" className="icons"><a target="_blank" href="https://github.com/IEEE-VIT"><img src={github}/></a></span>
                </div>
                </center>
            </div>
        </div>
           );
}

export default EnigmaLogo;