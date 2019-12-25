import React from 'react';
import './Footer.css';
import {Link} from 'react-router-dom';

const Footer = ({title,action}) =>{
    return (
        <div className="Footer_Text">
            {title} {action==="Log In"?<Link to={`/login`}>{action}</Link>:<Link to={`/signup`}>{action}</Link>}
        </div>
    )
}

export default Footer;