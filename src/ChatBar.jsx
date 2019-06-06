import React, { Component } from "react";
/* import PropTypes from 'prop-types'; */

class ChatBar extends Component {
  constructor(props) {
    super();
    this.state = {
      username: props.username,
      content: ""
    };
  }


  handleInput = event => {
    event.preventDefault();
    this.setState({ content: event.target.value });
  };
//@@@ refacto voir si peu envoye des props a place
  handleKeyDown = event => {
    if (event.keyCode === 13 && event.target.name === "nameForm") {
      const content = event.target.value;
      this.props.addMessage(this.props.username, content);
      this.setState({ content: "" });

    } else if (event.keyCode === 13 && event.target.name === "userForm") {
      const newUserName = event.target.value;
      const oldUser= this.props.username;
      this.props.postUser(oldUser, newUserName);
      
      console.log(`oldUsername: ${oldUser}, new username: ${newUserName}`)

    }
  };

  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder={this.props.username}
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
