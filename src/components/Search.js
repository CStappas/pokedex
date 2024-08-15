import React from 'react'
import "../css/Search.css"

function Search() {
  return (
    <div class="search-container">
      <input type="text" placeholder="Pokémon name or number or type..."/>
      <button type="button" class="search-button">Search</button>
    </div>
  )
}

export default Search;