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

  addMessage = (username, content) => {
    const objNewChat = {
      username,
      content, 
    }; 
    
    const newMessages = { messages: [objNewChat, ...this.state.messages]}
    this.setState(newMessages);
    console.log(`-----this.state.messages:  ${this.state.messages}`);
  
    /* 
      tasks.push(newTask);
      return newObjChat({ ...newTask }); */
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
  }

  render() {
    //this.addMessage("patate", "chose que");
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
