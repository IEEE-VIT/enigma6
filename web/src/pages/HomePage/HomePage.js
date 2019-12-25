import React from 'react';

//import '../../animate.css';

import EnigmaLogo from '../../components/EnigmaLogo/EnigmaLogo.js';
import Sponsor from '../../components/Sponsor/Sponsor';

import leftUpCorner from '../../assets/Group 1.svg';
import leftDownCorner from '../../assets/Group 4.svg';
import rightUpCorner from '../../assets/Group 2.svg';
import rightDownCorner from '../../assets/Group 3.svg';
import './HomePage.css';


class HomePage extends React.Component{
    render(){
        return(
            <div id="homeParent">
                <img className="img leftUp" src={leftUpCorner} alt=""/>
                <img className="img leftDown" src={leftDownCorner} alt=""/>
                <img className="img rightUp" src={rightUpCorner} alt=""/>
                <img className="img rightDown" src={rightDownCorner} alt=""/>
                <Sponsor pos="absolute"/>
                <EnigmaLogo />
            </div>
        );
    }
}

export default HomePage;