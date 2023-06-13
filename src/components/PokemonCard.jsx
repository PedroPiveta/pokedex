import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { css } from "@stitches/react";

const pokemonCard = css({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    listStyle: "none",
})

const PokemonCard = () => {
  const { data: pokemon, loading, error } = useFetch("https://pokeapi.co/api/v2/pokemon/");
  const [spriteLinks, setSpriteLinks] = useState([]);

  useEffect(() => {
    async function fetchSprites() {
      try {
        if (pokemon && pokemon.results) {
          const links = await Promise.all(
            pokemon.results.map(async (pokemonData) => {
              const response = await fetch(pokemonData.url);
              const spriteData = await response.json();
              const sprite = spriteData.sprites.front_default;
              return sprite;
            })
          );

          setSpriteLinks(links);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchSprites();
  }, [pokemon]);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error...</p>}
      {pokemon && (
        <div>
          <h1>Pokémons</h1>
          <ul className={pokemonCard()}>
            {pokemon.results.map((pokemon, index) => (
              <li key={pokemon.name}>
                {pokemon.name}
                {spriteLinks[index] && (
                  <img src={spriteLinks[index]} alt="pokemon" />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default PokemonCard;
