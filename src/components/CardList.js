import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import Search from "./Search";
import "../css/Card.css";

function CardList() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => response.json())
      .then((json) => fetchPokeData(json.results))
      .catch((error) => console.log(error));

    async function fetchPokeData(pokeList) {
      const pokemonDetails = await Promise.all(
        pokeList.map(async (poke) => {
          const res = await fetch(poke.url);
          const data = await res.json();
          return {
            name: data.name,
            imageUrl: data.sprites.front_default,
            number: data.id,
            types: data.types.map((typeInfo) => typeInfo.type.name),
            url: poke.url,
          };
        })
      );

      setData(pokemonDetails);
      setTotalPages(Math.ceil(pokemonDetails.length / itemsPerPage));
    }
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
    setCurrentPage(1);
  };

  function handleCardClick(pokemon) {
    navigate(`/pokemon/${pokemon.number}`);
  }

  const filteredPokemon = data.filter(
    (pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery) ||
      pokemon.number.toString().includes(searchQuery) ||
      pokemon.types.some((type) => type.toLowerCase().includes(searchQuery))
  );

  const paginatedPokemon = filteredPokemon.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="card-section">
      <Search onSearchChange={handleSearchChange} />
      <div className="card-list">
        {paginatedPokemon.map((pokemon) => (
          <Card
            key={pokemon.number}
            name={pokemon.name}
            imageUrl={pokemon.imageUrl}
            number={pokemon.number}
            types={pokemon.types}
            onClick={() => handleCardClick(pokemon)}
          />
        ))}
      </div>
      <div className="pagination">
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(filteredPokemon.length / itemsPerPage)}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === Math.ceil(filteredPokemon.length / itemsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CardList;