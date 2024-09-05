import React from "react";
import Logo from "../images/pokemon-23.svg"
import "../css/Nav.css"

function Nav() {
  return (
    <nav className="nav">
      <img className="logo" src={Logo} width="100px" alt="Pokemon Logo"/>
      <ul>
      </ul>
    </nav>
  );
}

export default Nav;
