// Search.js
import React from 'react';
import "../css/Search.css";

function Search({ onSearchChange }) { // Accept handler as prop
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Pokémon name, number, or type..."
        onChange={onSearchChange} // Call handler on input change
      />
      <button type="button" className="search-button">Search</button>
    </div>
  );
}

export default Search;
