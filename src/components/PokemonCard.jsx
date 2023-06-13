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
    boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.25)",
    padding: "1rem",
    margin: "1rem",
    borderRadius: "5px",
    textTransform: "capitalize",
    transition: "box-shadow 0.3s ease-out",

    "&:hover": {
        boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.5)",
    }
})

const PokemonCard = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(18);
    const { data: pokemon, loading, error } = useFetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`);

    useEffect(() => {
        function handleScroll() {
            const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
            const isAtBottom = scrollTop + clientHeight >= scrollHeight;

            if (isAtBottom && !loading && !error && limit < pokemon.count) {
                setLimit(prevLimit => prevLimit + 18);
            }
        }

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [loading, error, limit, pokemon]);


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
            {loading && <p>Loading...</p>}
            {error && <p>Error...</p>}
            {pokemonList && (
                <div>
                    <h1>Pokémons</h1>
                    {/* <button onClick={loadMore} >Load</button> */}
                    <ul className={pokemonCards()}>
                        {pokemonList.map((pokemon, index) => (
                            <li className={pokemonCard()} key={index}>
                                {pokemon.name}
                                <img src={pokemon.sprites.front_default} alt="pokemon" />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default PokemonCard;
