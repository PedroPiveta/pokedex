import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { css, keyframes } from "@stitches/react";
import { UpdateIcon } from "@radix-ui/react-icons";

const spin = keyframes({
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
});

const pokemonCards = css({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    listStyle: "none",
});

const pokemonCard = css({
    display: "flex",
    flexDirection: "column",
    border: "1px solid black",
    boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.25)",
    padding: "1rem",
    margin: "1rem",
    borderRadius: "5px",
    textTransform: "capitalize",
    transition: "box-shadow 0.3s ease-out",

    "&:hover": {
        boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.5)",
    }
});

const buttonContainer = css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBlock: "2rem",
});

const button = css({
    variants: {
        variant: {
            generate: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: ".5em",
                fontSize: 16,
                padding: "0.5em 1em",
                border: "none",
                borderRadius: ".5em",

                "&:hover": {
                    cursor: "pointer",
                    boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.5)",
                },

                "& .rotate": {
                    animation: `${spin} 1s linear infinite`,
                },
            }
        }
    }
});

const PokemonCard = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [generating, setGenerating] = useState(false);
    const [limit, setLimit] = useState(18);
    const { data: pokemon, loading, error } = useFetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`);

    const handleGenerate = () => {
        setGenerating(true);
        setTimeout(() => { 
            setLimit(prevLimit => prevLimit + 18);
            setGenerating(false);
        }, 500);
    }

    // useEffect(() => {
    //     function handleScroll() {
    //         const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    //         const isAtBottom = scrollTop + clientHeight >= scrollHeight;
    //         if (isAtBottom && !loading && !error && limit < pokemon.count) {
    //             handleGenerate()
    //         }
    //     }

    //     window.addEventListener("scroll", handleScroll);

    //     return () => {
    //         window.removeEventListener("scroll", handleScroll);
    //     };
    // }, [loading, error, limit, pokemon]);


    useEffect(() => {
        async function fetchPokemon() {
            try {
                if (pokemon && pokemon.results) {
                    const pokemonData = await Promise.all(
                        pokemon.results.map(async (pokemonData) => {
                            const response = await fetch(pokemonData.url);
                            const data = await response.json();
                            return data;
                        })
                    );
                    setPokemonList(pokemonData);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchPokemon();
    }, [pokemon]);

    return (
        <>
            <h1>Pokédex with PokéApi by <a href="https://github.com/PedroPiveta" target="_blank" rel="noreferrer" >Pedro Piveta</a></h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error...</p>}
            {pokemonList && (
                <div>
                    {/* <button onClick={loadMore} >Load</button> */}
                    <ul className={pokemonCards()}>
                        {pokemonList.map((pokemon, index) => (
                            <li className={pokemonCard()} key={index}>
                                <h2>{pokemon.name}</h2>
                                <img src={pokemon.sprites.front_default} alt="pokemon" />
                                <p>Heigth: {pokemon.height}</p>
                                <h3>Type:</h3>{pokemon.types.map((pokemon, index) => (
                                    <p key={index}>{pokemon.type.name}</p>
                                ))}
                                <h3>Abilities:</h3>
                                {
                                    pokemon.abilities.map((ability, index) => (
                                        <p key={index}>{ability.ability.name}</p>
                                    ))
                                }
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div className={buttonContainer()}>
                <button onClick={handleGenerate} className={button({ variant: 'generate' })}>Generate more Pokémon <UpdateIcon className={generating ? 'rotate' : ''} /></button>
            </div>
        </>
    );
};

export default PokemonCard;