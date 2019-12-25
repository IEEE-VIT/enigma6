import React from 'react';

import './MainPageButton.css';

const MainPageButton = ({name, clickFunc}) => {
    return(
        <div className='mainpagebutton'>
            <button name={name} onClick={clickFunc} className='button'> {name} </button>
        </div>
    );
}

export default MainPageButton;