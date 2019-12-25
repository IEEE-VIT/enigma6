import React from 'react';
import LoginInCard from '../../components/LogInCard/LogInCard';
import CornerPage from '../CornerPage/CornerPage.js';

const SignUpPage = () => {
    return(
        <div className='SignUpPage'>
            <CornerPage />
            <LoginInCard />
        </div>
    );
}

export default SignUpPage;