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

  handleUsernameChange = event => {
    this.props.addUser(event.target.value);
  };

  handleInput = event => {
    //console.log({ this.state.username })
    event.preventDefault();
    this.setState({ content: event.target.value });
  };
//@@@ refacto voir si peu envoye des props a place
  handleKeyDown = event => {
    if (event.keyCode === 13 && event.target.name === "nameForm") {
      //@@@
      /* console.log("enter", event.target.value);
      console.log(`this.props.username:  ${this.props.username}`); */
      const content = event.target.value;
      this.props.addMessage(this.props.username, content);
      this.setState({ content: "" });
    } else if (event.keyCode === 13 && event.target.name === "userForm") {
      const newUserName = event.target.value;
      console.log(`oldUsername: ${this.props.username}, new username: ${newUserName}`)
      this.props.postUser(this.props.username, newUserName);
      //console.log(`event.target.value:  ${event.target.value}`);
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
