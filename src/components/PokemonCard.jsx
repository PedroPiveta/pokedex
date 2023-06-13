import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import InfiniteScroll from 'react-infinite-scroll-component';
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
            <InfiniteScroll
                dataLength={pokemon.length} 
                next={() => setLimit(prevLimit => prevLimit + 12)}
                loader={<h4>Carregando...</h4>} 
            >
                <h1>Pokédex with PokéApi by <a href="https://github.com/PedroPiveta" target="_blank" rel="noreferrer" >Pedro Piveta</a></h1>
                {loading && <p>Loading...</p>}
                {error && <p>Error...</p>}
                {pokemonList && (
                    <div>
                        {/* <button onClick={loadMore} >Load</button> */}
                        <ul className={pokemonCards()}>
                            {pokemonList.map((pokemon, index) => (
                                <li className={pokemonCard()} key={index}>
                                    {pokemon.name}
                                    <img src={pokemon.sprites.front_default} alt="pokemon" />
                                    <p>Heigth: {pokemon.height}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </InfiniteScroll>
        </>
    );
};

export default PokemonCard;
