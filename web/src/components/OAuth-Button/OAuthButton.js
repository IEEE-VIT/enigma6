import React from 'react';
import './OAuth.css';


class OAuthButton extends React.Component {

    render(){
        const {logo, title, clickEvent} = this.props;
        return(
            //For google

            <div id='oauth-btn' style={{'width':'23rem','margin':'8px 0','border':'1px solid #454545','padding':'8px','borderRadius':'10px'}} onClick={clickEvent}>
                <img style={{'float':'left'}} src = {logo} alt={title} height='20px' width='20px'/>
                <p style={{'marginBottom':'0'}}>Continue with Google</p>
            </div>

        )
    }

}

export default OAuthButton;