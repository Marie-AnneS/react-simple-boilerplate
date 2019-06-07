import React, { Component } from "react";
/* import PropTypes from 'prop-types'; */

class ChatBar extends Component {
  constructor(props) {
    super();
    this.state = {
      username: 'Anonymous',
      content: ""
    };
  }

  handleUsernameChange = event =>{
    this.setState({ username: event.target.value });
  }

  handleInput = event => {
    event.preventDefault();
    this.setState({ content: event.target.value });
  };
//@@@ refacto voir si peu envoye des props a place
  handleKeyDown = event => {
    const oldUser= this.props.username;
    const newUserName = this.state.username;
    if (event.keyCode === 13 && event.target.name === "nameForm") {
      const content = event.target.value;      
      if (oldUser !== newUserName){
        this.props.postUser(oldUser, newUserName);
      }      
      this.props.addMessage(this.state.username, content);
      this.setState({ content: "" });

    } else if (event.keyCode === 13 && event.target.name === "userForm") {           
      this.props.postUser(oldUser, newUserName);     

    }
  };

  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder={this.props.username}
          onChange={this.handleUsernameChange}
          onKeyDown={this.handleKeyDown}
          name="userForm"
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onChange={this.handleInput}
          onKeyDown={this.handleKeyDown}
          value={this.state.content}
          name="nameForm"
        />
      </footer>
    );
  }
}

/* ChatBar.propTypes = {
    
}; */

export default ChatBar;
