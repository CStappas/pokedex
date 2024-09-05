import React, { useEffect, useState } from "react";
import Card from "./Card";
import Search from "./Search";
import "../css/Card.css";

function CardList() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
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
            url:poke.url
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
  async function handleCardClick(pokemon) {
    const res = await fetch(pokemon.url);
    const data = await res.json();

    setSelectedPokemon({
      name: data.name,
      imageUrl: data.sprites.front_default,
      number: data.id,
      height: data.height,
      weight: data.weight,
      abilities: data.abilities,
      types: data.types,
    });
    console.log("Selected Pokémon Details:", data)
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
          Page {currentPage} of{" "}
          {Math.ceil(filteredPokemon.length / itemsPerPage)}
        </span>
        <button
          onClick={goToNextPage}
          disabled={
            currentPage === Math.ceil(filteredPokemon.length / itemsPerPage)
          }
        >
          Next
        </button>
      </div>
      {selectedPokemon && (
        <div className="pokemon-details">
          <h2>{selectedPokemon.name}</h2>
          <img src={selectedPokemon.imageUrl} alt={selectedPokemon.name} />
          <p>Number: {selectedPokemon.number}</p>
          <p>Height: {selectedPokemon.height}</p>
          <p>Weight: {selectedPokemon.weight}</p>
          <p>Abilities:</p>
          <ul>
            {selectedPokemon.abilities.map((ability, index) => (
              <li key={index}>{ability.ability.name}</li>
            ))}
          </ul>
          <p>Types:</p>
          <ul>
            {selectedPokemon.types.map((type, index) => (
              <li key={index}>{type.type.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CardList;
