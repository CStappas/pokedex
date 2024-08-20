import React, { useEffect, useState } from "react";
import Card from "./Card";
import Search from "./Search";

function CardList() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => response.json())
      .then((json) => fetchPokeData(json.results))
      .catch((error) => console.log(error));
  }, []);

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
        };
      })
    );

    setData(pokemonDetails);
  }
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
};

 const filteredPokemon = data.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchQuery) ||
    pokemon.number.toString().includes(searchQuery) ||
    pokemon.types.some(type => type.toLowerCase().includes(searchQuery))
);


  return (
    <div>
      <Search onSearchChange={handleSearchChange} />
      <div className="card-list">
        {filteredPokemon.map((pokemon) => (
          <Card
            name={pokemon.name}
            imageUrl={pokemon.imageUrl}
            number={pokemon.number}
            types={pokemon.types}
          />
        ))}
      </div>
    </div>
  );
}

export default CardList;
