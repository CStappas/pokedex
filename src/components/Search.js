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
    </div>
  );
}

export default Search;
