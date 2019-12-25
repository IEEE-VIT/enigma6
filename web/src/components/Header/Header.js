import React from 'react'
import './Header.css'

const Header = ({title}) => {
    return (
        <div className="Header">
            {title}
        </div>
    )
}

export default Header;
//git commit -m "Updating various files across components, all console errors removed, css fixes on signup-login"