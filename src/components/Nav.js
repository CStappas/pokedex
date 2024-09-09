import React from "react";
import { Link } from "react-router-dom";
import Logo from "../images/pokemon-23.svg";
import "../css/Nav.css";

function Nav() {
  return (
    <nav className="nav">
      <Link to="/">
        <img className="logo" src={Logo} width="100px" alt="Pokemon Logo" />
      </Link>
      <ul>
      </ul>
    </nav>
  );
}

export default Nav;