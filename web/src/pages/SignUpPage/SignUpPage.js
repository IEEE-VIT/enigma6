import React from 'react';
import SignUpCard from '../../components/signup-card/SignUpCard';
import CornerPage from '../CornerPage/CornerPage.js';

const SignUpPage = () => {
    return(
        <div className='SignUpPage'>
            <CornerPage />
            <SignUpCard />
        </div>
    );
}

export default SignUpPage;