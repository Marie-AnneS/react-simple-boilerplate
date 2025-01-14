import React, { Component } from "react";
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";
import Navbar from "./Navbar.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userCount: 0,
      currentUser: { name: "Anonymous" },
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

  wSocket = new WebSocket("ws://localhost:3001");
  addMessage = (username, content) => {
    const objPostMessage = {
      type: "postMessage",
      username: username,
      content: content
    };

    this.wSocket.send(JSON.stringify(objPostMessage));
  };

  postUser = (oldName, newName) => {
    const objPostNotification = {
      type: "postNotification",
      username: newName,
      content: `${oldName} has changed their name to ${newName}.`
    };

    this.setState({ currentUser: { name: newName } });
    this.wSocket.send(JSON.stringify(objPostNotification));
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
      this.setState({ messages: messages });
    }, 3000);

    this.wSocket.onopen = event => {
      console.log("* client connected *");
    };

    this.wSocket.onmessage = event => {
      const dataObj = JSON.parse(event.data);
      let newMessages;
      switch (dataObj.type) {
        case "incomingMessage":
          newMessages = { messages: [...this.state.messages, dataObj] };
          this.setState(newMessages);
          break;
        case "incomingNotification":
          newMessages = { messages: [...this.state.messages, dataObj] };
          this.setState(newMessages);
          break;
        case "postNbUser":
          this.setState({ userCount: dataObj.nbClient });
          break;
        default:
          throw new Error("Unknown event type " + dataObj.type);
      }
    };
  }

  render() {
    return (
      <div className="flex-content">
        <Navbar userCount={this.state.userCount} />
        <MessageList messages={this.state.messages} />

        <ChatBar
          username={this.state.currentUser.name}
          addMessage={this.addMessage}
          addUser={this.addUser}
          postUser={this.postUser}
        />
      </div>
    );
  }
}
export default App;
