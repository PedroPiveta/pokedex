import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { css } from "@stitches/react";
import { useEffect, useState } from "react";

const pokemonDetails = css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textTransform: "capitalize",
    margin: "2rem",

    "& span" : {
        display: "flex",
        alignItems: "center",
        // justifyContent: "center",
        gap: ".5em",
    },
});

const PokemonDetails = () => {
    const [sprites, setSprites] = useState([]);


    const { id } = useParams();
    const { data: pokemon, loading, error } = useFetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    useEffect(() => {
        if (pokemon) {
            const sprites = pokemon.sprites;
            const spritesArray = Object.values(sprites);
            setSprites(spritesArray);
        }
    }, [pokemon]);


    return (
        <div className={pokemonDetails()}>
            {loading && <div>Loading ...</div>}
            {error && <div>Something went wrong ...</div>}
            {pokemon && (
                <div>
                    <h1>{pokemon.name}</h1>

                    <h2>Types:</h2>{pokemon.types.map((pokemon, index) => (
                        <span key={index}>
                            {pokemon.type.name}
                            <img src={`/sprites/${pokemon.type.name}.png`} alt="" />
                        </span>
                    ))}

                    <h2>Sprites:</h2>
                    {
                        sprites.map((sprite, index) => (
                            <img key={index} src={sprite} alt="" />
                        ))
                    }
                    {/* <img src={pokemon.sprites.front_default} alt={pokemon.name} /> */}
                    <p>Heigth: {pokemon.height}</p>

                    <h3>Abilities:</h3>
                    {
                        pokemon.abilities.map((ability, index) => (
                            <p key={index}>{ability.ability.name}</p>
                        ))
                    }
                </div>
            )}
        </div>
    );
}

export default PokemonDetails;