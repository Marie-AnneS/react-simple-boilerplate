import React, { Component } from "react";
/* import PropTypes from 'prop-types'; */
class ChatBar extends Component {
  constructor(props) {
    super();
    this.state = {
      content: '',
    };
  }

  handleInput = event => {
    event.preventDefault();
    this.setState({ content: event.target.value });
  };

  handleKeyDown = event => {
      if (event.keyCode === 13){
          console.log('enter',event.target.value)
          console.log(`this.props.username:  ${this.props.username}`)
          const content = event.target.value;
          this.props.addMessage(this.props.username, content)
          this.setState({content: ''});
      }
  }
  
  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder={this.props.username}
          
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onChange={ this.handleInput }
          onKeyDown={ this.handleKeyDown }
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
