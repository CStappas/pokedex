// Search.js
import React from 'react';
import "../css/Search.css";

function Search({ onSearchChange }) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Pokémon name, number, or type..."
        onChange={onSearchChange}
      />
      <button type="button" className="search-button">Search</button>
    </div>
  );
}

export default Search;
