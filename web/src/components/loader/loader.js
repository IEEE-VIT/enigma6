import React from 'react';
import './loader.css';

export default class Loader extends React.Component {
    render(){
        return(
            <div>
                <center>
                    <div class="lds-ripple">
                        <center>
                            <div></div>
                            <div></div>
                        </center>
                    </div>
                    <h4 id="loading-text">Loading...</h4>
                </center>
            </div>
        );
    }
}