import React from "react";
import Message from "./Message.jsx";
import Notif from "./Notif.jsx";

const MessageList = props => {

  const messagesList = props.messages.map(messageObj => {
    if (messageObj.type === 'incomingNotification') {
      return <Notif content={messageObj.content } key={messageObj.id}/>;
    } else {
      return <Message username={messageObj.username} content={messageObj.content} key={messageObj.id} />
    }
  });

  return (
    <main className="messages">
      {messagesList} 
    </main>
  );
};

export default MessageList;
