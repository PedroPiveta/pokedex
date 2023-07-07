import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { css, keyframes } from "@stitches/react";
import { UpdateIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

const spin = keyframes({
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
});

const pokemonCards = css({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    listStyle: "none",
});

const pokemonCard = css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    border: "1px solid black",
    boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.25)",
    padding: "3em",
    margin: "1em",
    borderRadius: "5px",
    textTransform: "capitalize",
    transition: "box-shadow 0.3s ease-out",

    "&:hover": {
        boxShadow: "3px 3px 10px rgba(0, 150, 0, 0.5)",
    },

    "& a": {
        textDecoration: "none",
        color: "white",
    },

    "& .types": {
        display: "inline-block",
    },

    variants: {
        type: {
            normal: {
                background: "linear-gradient(180deg, #a4acaf, #a4acaf 50%, #fff 50%)",
                "&:hover": {
                    background: "#a4acaf",
                },
            },
            fighting: {
                background: "linear-gradient(180deg, #d56723, #d56723 50%, #fff 50%)",
                "&:hover": {
                    background: "#d56723",
                },
            },
            flying: {
                background: "linear-gradient(180deg, #3dc7ef, #3dc7ef 50%, #fff 50%)",
                "&:hover": {
                    background: "#3dc7ef",
                },
            },
            poison: {
                background: "linear-gradient(180deg, #b97fc9, #b97fc9 50%, #fff 50%)",
                "&:hover": {
                    background: "#b97fc9",
                },
            },
            ground: {
                background: "linear-gradient(180deg, #f7de3f, #f7de3f 50%, #fff 50%)",
                "&:hover": {
                    background: "#f7de3f",
                },
            },
            rock: {
                background: "linear-gradient(180deg, #a38c21, #a38c21 50%, #fff 50%)",
                "&:hover": {
                    background: "#a38c21",
                },
            },
            bug: {
                background: "linear-gradient(180deg, #729f3f, #729f3f 50%, #fff 50%)",
                "&:hover": {
                    background: "#729f3f",
                },
            },
            ghost: {
                background: "linear-gradient(180deg, #7b62a3, #7b62a3 50%, #fff 50%)",
                "&:hover": {
                    background: "#7b62a3",
                },
            },
            steel: {
                background: "linear-gradient(180deg, #9eb7b8, #9eb7b8 50%, #fff 50%)",
                "&:hover": {
                    background: "#9eb7b8",
                },
            },
            fire: {
                background: "linear-gradient(180deg, #fd7d24, #fd7d24 50%, #fff 50%)",
                "&:hover": {
                    background: "#fd7d24",
                },
            },
            water: {
                background: "linear-gradient(180deg, #4592c4, #4592c4 50%, #fff 50%)",
                "&:hover": {
                    background: "#4592c4",
                },
            },
            grass: {
                background: "linear-gradient(180deg, #9bcc50, #9bcc50 50%, #fff 50%)",
                "&:hover": {
                    background: "#9bcc50",
                },
            },
            electric: {
                background: "linear-gradient(180deg, #eed535, #eed535 50%, #fff 50%)",
                "&:hover": {
                    background: "#eed535",
                },
            },
            psychic: {
                background: "linear-gradient(180deg, #f366b9, #f366b9 50%, #fff 50%)",
                "&:hover": {
                    background: "#f366b9",
                },
            },
            ice: {
                background: "linear-gradient(180deg, #51c4e7, #51c4e7 50%, #fff 50%)",
                "&:hover": {
                    background: "#51c4e7",
                },
            },
            dragon: {
                background: "linear-gradient(180deg, #f16e57, #f16e57 50%, #fff 50%)",
                "&:hover": {
                    background: "#f16e57",
                },
            },
            dark: {
                background: "linear-gradient(180deg, #707070, #707070 50%, #fff 50%)",
                "&:hover": {
                    background: "#707070",
                },
            },
            fairy: {
                background: "linear-gradient(180deg, #fdb9e9, #fdb9e9 50%, #fff 50%)",
                "&:hover": {
                    background: "#fdb9e9",
                },
            },
            unknown: {
                background: "linear-gradient(180deg, #68a090, #68a090 50%, #fff 50%)",
                "&:hover": {
                    background: "#68a090",
                },
            },
            shadow: {
                background: "linear-gradient(180deg, #707070, #707070 50%, #fff 50%)",
                "&:hover": {
                    background: "#707070",
                },
            },
        },
    },
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
    // eslint-disable-next-line no-unused-vars
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
    };

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
                    <ul className={pokemonCards()}>
                        {pokemonList.map((pokemon, index) => {
                            const type = pokemon.types[0].type.name;

                            return (
                                <li className={pokemonCard({ type: type })} key={index}>
                                    <Link to={`/pokemon/${pokemon.id}`} >
                                        <h2>{pokemon.name}</h2>
                                        {pokemon.types.map((pokemon, index) => (
                                            <div className="types" key={index}>
                                                <abbr title={pokemon.type.name}><img key={index} src={`/sprites/${pokemon.type.name}.png`} alt="" /></abbr>
                                            </div>
                                        ))}
                                        <div className="sprite">
                                            <img src={pokemon.sprites.front_default} alt="pokemon" />
                                        </div>
                                    </Link>
                                </li>
                            )
                        })}
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