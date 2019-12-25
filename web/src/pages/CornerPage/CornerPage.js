import React from 'react';

import leftUpCorner from '../../assets/Group 1.svg';
import leftDownCorner from '../../assets/Group 4.svg';
import rightUpCorner from '../../assets/Group 2.svg';
import rightDownCorner from '../../assets/Group 3.svg';

import './CornerPage.css';

import '../HomePage/HomePage.js';

class CornerPage extends React.Component{
    render(){
        return(
            <div id="homeParent">
                <img className="img leftUp" src={leftUpCorner} alt=""/>
                <img className="img leftDown" src={leftDownCorner} alt=""/>
                <img className="img rightUp" src={rightUpCorner} alt=""/>
                <img className="img rightDown" src={rightDownCorner} alt=""/>
            </div>
        );
    }
}

export default CornerPage;