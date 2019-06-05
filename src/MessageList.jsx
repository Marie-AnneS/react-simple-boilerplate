import React from "react";
import Message from "./Message.jsx";

const MessageList = props => {

  console.log(props);
  const messagesList = props.messages.map(messageObj => (
    
    <Message username={messageObj.username} content={messageObj.content} key={props.messages.indexOf(messageObj)} />
  ));

  return (
    <main className="messages">
      {messagesList}
      
      {/* <div class="message system">Anonymous1 changed their name to nomnom.</div> */}
    </main>
  );
};

export default MessageList;
