import React, { Component } from "react";
import './Password.css';

class PasswordShowHide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hidden: true,
      password: ""
    };

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
    if (this.props.password) {
      this.setState({ password: this.props.password });
  }

  // onChange() {
    
  //   }
  }

  preventRefresh=(e)=>{
    e.preventDefault();
  }

  render() {
    return (
      <div id='temp'>
        <input
          className='password'
          type={this.state.hidden ? "password" : "text"}
          value={this.state.password}
          onChange={this.handlePasswordChange}
        >
            
        </input>
        <button id="eyebutton" type="button" onClick={this.toggleShow} onSubmit={this.preventRefresh}>
        <span id='eye' className="glyphicon glyphicon-eye-close"></span>   
        </button>
      </div>
    );
  }
}

export default PasswordShowHide;