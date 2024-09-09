import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../css/PokemonDetails.css';

function PokemonDetails() {
  const [pokemon, setPokemon] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(response => response.json())
      .then(data => {
        setPokemon({
          name: data.name,
          imageUrl: data.sprites.front_default,
          number: data.id,
          height: data.height,
          weight: data.weight,
          abilities: data.abilities,
          types: data.types,
        });
      })
      .catch(error => console.error('Error fetching Pokemon details:', error));
  }, [id]);

  if (!pokemon) return <div>Loading...</div>;

  const capitalizedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  return (
    <div className="pokemon-details">
      <Link to="/" className="back-button">Back to list</Link>
      <h2>{capitalizedName}</h2>
      <img src={pokemon.imageUrl} alt={pokemon.name} />
      <p>Number: {pokemon.number}</p>
      <p>Height: {pokemon.height / 10} m</p>
      <p>Weight: {pokemon.weight / 10} kg</p>
      <p>Abilities:</p>
      <div className="abilities">
        {pokemon.abilities.map((ability, index) => (
          <span key={index} className="ability">{ability.ability.name}</span>
        ))}
      </div>
      <p>Types:</p>
      <ul className="types">
        {pokemon.types.map((type, index) => (
          <li key={index} className={type.type.name.toLowerCase()}>{type.type.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default PokemonDetails;