import React from "react";
import Logo from "../images/pokemon-23.svg"
import Search from"../images/icons8-search.svg"
import "../css/Nav.css"

function Nav() {
  return (
    <nav className="nav">
      <img className="logo" src={Logo} width="100px" alt="Pokemon Logo"/>
      <ul>
        <li>Pokedex</li>
        <li>Video Games</li>
        <li>Card Game</li>
        <li>Pokemon TV</li>
        <li>Events</li>
        <li>News</li>
      </ul>
      <img className="search" src={Search} width="30px" alt="Pokemon Logo"/>
    </nav>
  );
}

export default Nav;
