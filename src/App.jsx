import React, { Component } from "react";
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";

/* var rand = require("random-key"); */

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Bob" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          
          username: "Bob",
          content: "Has anyone seen my marbles?"
        },
        {
          username: "Anonymous",
          content:
            "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
  }

//listen connection with server
  wSocket = new WebSocket("ws://localhost:3001");

  addMessage = (content) => {
    const objNewChat = {
      username: this.state.currentUser.name,
      content: content
    }; 

    this.wSocket.send(JSON.stringify(objNewChat))
     /*const newMessages = { messages: [objNewChat, ...this.state.messages]}
    this.setState(newMessages);
    console.log(`-----this.state.messages:  ${this.state.messages}`); 
  */
  };  

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {
        id: 3,
        username: "Michelle",
        content: "Hello there!"
      };
      const messages = this.state.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages });
    }, 3000);

    
    
    console.log('wss')
    this.wSocket.onopen = (event) => {
      //@@@ mettre
      console.log('* client connected *')
      //@@@ quoi
      //this.wSocket.send("Here's some text that the server is urgently awaiting!"); 
    };
    //when event recive message 
    this.wSocket.onmessage = (event) => {
      console.log('merci pour le message ! ')

      //send the message
      this.wSocket.send('yoooooooooooooo')
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            Chatty
          </a>
        </nav>
        <h1>Hello React :)</h1>
        <main className="messages">
          <MessageList messages={this.state.messages} />
        </main>

        <ChatBar username={this.state.currentUser.name} addMessage={this.addMessage} />
      </div>
    );
  }
}
export default App;
