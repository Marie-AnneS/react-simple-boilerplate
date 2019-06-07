import React from "react";

const Navbar = props => {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand" target="_blank">
        Chatty
      </a>
      <span>{props.userCount} Users online</span>
    </nav>
  );
};

export default Navbar;
