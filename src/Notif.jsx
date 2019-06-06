import React from "react";

const Notif = props => {
  return (
    <div className="notification">
      <span className="notification-content">{props.content}</span>
    </div>
  );
};

export default Notif;
