import React, { useEffect, useState } from "react";
import Card from "./Card";
import Search from "./Search";

function CardList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
      .then((response) => response.json())
      .then((json) => fetchPokeData(json.results))
      .catch((error) => console.log(error));
  }, []);

  async function fetchPokeData(poke) {
    const pokemonDetails = await Promise.all(
       poke.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          return res.json();
        })
      );
      
      setData(pokemonDetails);
  }

  return (
    <div>
      {data?.map((pokemon) => {
      console.log(pokemon)
       return <img src={pokemon.sprites.front_default}></img>;
      })}
    </div>
  );
}

export default CardList;
