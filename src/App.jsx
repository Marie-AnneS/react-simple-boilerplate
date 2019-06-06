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
          id: "2fa602f2-f806-4e7d-bea0-e24f0321cb67",
          username: "Bob",
          content: "Has anyone seen my marbles?"
        },
        {
          id: "b31184f2-3f23-4488-9832-cbe4761d6ffc",
          username: "Anonymous",
          content:
            "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
  }

  //listen connection with server
  wSocket = new WebSocket("ws://localhost:3001");

  addMessage = (username, content) => {
    const objNewChat = {
      type: 'postMessage',
      username: this.state.currentUser.name,
      content: content
    };

    this.wSocket.send(JSON.stringify(objNewChat));
    /*const newMessages = { messages: [objNewChat, ...this.state.messages]}
    this.setState(newMessages);
    console.log(`-----this.state.messages:  ${this.state.messages}`); 
  */
  };

  addUser = newName => {
    const newCurrentUser = Object.assign({}, this.state.currentUser);
    newCurrentUser.name = newName;
    this.setState({ currentUser: newCurrentUser });
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

    console.log("wss");
    this.wSocket.onopen = event => {
      //@@@ mettre
      console.log("* client connected *");
      //@@@ quoi
      //this.wSocket.send("Here's some text that the server is urgently awaiting!");
    };

    //when event recive message
    this.wSocket.onmessage = event => {
      /* console.log("merci pour le message ! ");
      const msg = JSON.parse(event.data);
      console.log(`-------${msg}`);

      const newMessages = { messages: [msg, ...this.state.messages] };
      this.setState(newMessages);
      //send the message
      //this.wSocket.send('yoooooooooooooo') */
      console.log(`event.data------ ${event.data}`);
      const dataObj = JSON.parse(event.data);
      console.log(`data------ ${dataObj}`);
      switch (dataObj.type) {
        case "incomingMessage":
          const newMessages = { messages: [dataObj, ...this.state.messages] };
          this.setState(newMessages);
          break;
        case "incomingNotification":
          // handle incoming notification
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + dataObj.type);
      }
    };
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

        <ChatBar
          username={this.state.currentUser.name}
          addMessage={this.addMessage}
          addUser={this.addUser}
        />
      </div>
    );
  }
}
export default App;
