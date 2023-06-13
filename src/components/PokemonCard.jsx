import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { css } from "@stitches/react";

const pokemonCards = css({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    listStyle: "none",
});

const pokemonCard = css({
    display: "flex",
    flexDirection: "column",
    border: "1px solid black",
    padding: "1rem",
    margin: "1rem",
    borderRadius: "5px",
    textTransform: "capitalize",
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
          <ul className={pokemonCards()}>
            {pokemon.results.map((pokemon, index) => (
              <li className={pokemonCard()} key={pokemon.name}>
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
