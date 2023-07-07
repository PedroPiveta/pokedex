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
    background: "#fff",
    overflow: "hidden",
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
    position: "relative",
    zIndex: "1",

    "&:hover": {
        boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.5)",
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
                "&:hover": {
                    boxShadow: "3px 3px 10px #a4acaf50",
                },

                "&::before": {
                    content: "''",
                    background: "#a4acaf",
                    position: "absolute",
                    transform: "scale(1)",
                    top: "0",
                    width: "100%",
                    height: "50%",
                    zIndex: "-1",
                    transition: "transform 0.5s ease-out",
                },

                "&:hover::before": {
                    transform: "scale(3)",
                    transformOrigin: "top",
                },
            },
            fighting: {
                position: "relative",

                "&:hover": {
                    boxShadow: "3px 3px 10px #d5672350",
                },

                "&::before": {
                    content: "''",
                    background: "#d56723",
                    position: "absolute",
                    transform: "scale(1)",
                    top: "0",
                    width: "100%",
                    height: "50%",
                    zIndex: "-1",
                    transition: "transform 0.5s ease-out",
                },

                "&:hover::before": {
                    transform: "scale(3)",
                    transformOrigin: "top",
                },
            },
            flying: {
                background: "linear-gradient(180deg, #3dc7ef, #3dc7ef 50%, #fff 50%)",
                "&:hover": {
                    background: "#3dc7ef",
                    boxShadow: "3px 3px 10px #3dc7ef50",
                },
            },
            poison: {
                background: "linear-gradient(180deg, #b97fc9, #b97fc9 50%, #fff 50%)",
                "&:hover": {
                    background: "#b97fc9",
                    boxShadow: "3px 3px 10px #b97fc950",
                },
            },
            ground: {
                background: "linear-gradient(180deg, #f7de3f, #f7de3f 50%, #fff 50%)",
                "&:hover": {
                    background: "#f7de3f",
                    boxShadow: "3px 3px 10px #f7de3f50",
                },
            },
            rock: {
                background: "linear-gradient(180deg, #a38c21, #a38c21 50%, #fff 50%)",
                "&:hover": {
                    background: "#a38c21",
                    boxShadow: "3px 3px 10px #a38c2150",
                },
            },
            bug: {
                background: "linear-gradient(180deg, #729f3f, #729f3f 50%, #fff 50%)",
                "&:hover": {
                    background: "#729f3f",
                    boxShadow: "3px 3px 10px #729f3f50",
                },
            },
            ghost: {
                background: "linear-gradient(180deg, #7b62a3, #7b62a3 50%, #fff 50%)",
                "&:hover": {
                    background: "#7b62a3",
                    boxShadow: "3px 3px 10px #7b62a350",
                },
            },
            steel: {
                background: "linear-gradient(180deg, #9eb7b8, #9eb7b8 50%, #fff 50%)",
                "&:hover": {
                    background: "#9eb7b8",
                    boxShadow: "3px 3px 10px #9eb7b850",
                },
            },
            fire: {
                background: "linear-gradient(180deg, #fd7d24, #fd7d24 50%, #fff 50%)",
                "&:hover": {
                    background: "#fd7d24",
                    boxShadow: "3px 3px 10px #fd7d2450",
                },
            },
            water: {
                background: "linear-gradient(180deg, #4592c4, #4592c4 50%, #fff 50%)",
                "&:hover": {
                    background: "#4592c4",
                    boxShadow: "3px 3px 10px #4592c450",
                },
            },
            grass: {
                "&:hover": {
                    boxShadow: "3px 3px 10px #9bcc5050",
                },

                "&::before": {
                    content: "''",
                    background: "#9bcc50",
                    position: "absolute",
                    transform: "scale(1)",
                    top: "0",
                    width: "100%",
                    height: "50%",
                    zIndex: "-1",
                    transition: "transform 0.5s ease-out",
                },

                "&:hover::before": {
                    transform: "scale(2)",
                    transformOrigin: "top",
                },

            },
            electric: {
                "&:hover": {
                    boxShadow: "3px 3px 10px #eed53550",
                },

                "&::before": {
                    content: "''",
                    background: "#eed535",
                    position: "absolute",
                    transform: "scale(1)",
                    top: "0",
                    width: "100%",
                    height: "50%",
                    zIndex: "-1",
                    transition: "transform 0.5s ease-out",
                },

                "&:hover::before": {
                    transform: "scale(3)",
                    transformOrigin: "top",
                },
            },
            psychic: {
                "&:hover": {
                    boxShadow: "3px 3px 10px #f366b950",
                },

                "&::before": {
                    content: "''",
                    background: "#f366b9",
                    position: "absolute",
                    transform: "scale(1)",
                    top: "0",
                    width: "100%",
                    height: "50%",
                    zIndex: "-1",
                    transition: "transform 0.5s ease-out",
                },

                "&:hover::before": {
                    transform: "scale(3)",
                    transformOrigin: "top",
                },
            },
            ice: {
                background: "linear-gradient(180deg, #51c4e7, #51c4e7 50%, #fff 50%)",
                "&:hover": {
                    background: "#51c4e7",
                    boxShadow: "3px 3px 10px #51c4e750",
                },
            },
            dragon: {
                background: "linear-gradient(180deg, #f16e57, #f16e57 50%, #fff 50%)",
                "&:hover": {
                    background: "#f16e57",
                    boxShadow: "3px 3px 10px #f16e5750",
                },
            },
            dark: {
                background: "linear-gradient(180deg, #707070, #707070 50%, #fff 50%)",
                "&:hover": {
                    background: "#707070",
                    boxShadow: "3px 3px 10px #70707050",
                },
            },
            fairy: {
                background: "linear-gradient(180deg, #fdb9e9, #fdb9e9 50%, #fff 50%)",
                "&:hover": {
                    background: "#fdb9e9",
                    boxShadow: "3px 3px 10px #fdb9e950",
                },
            },
            unknown: {
                background: "linear-gradient(180deg, #68a090, #68a090 50%, #fff 50%)",
                "&:hover": {
                    background: "#68a090",
                    boxShadow: "3px 3px 10px #68a09050",
                },
            },
            shadow: {
                background: "linear-gradient(180deg, #707070, #707070 50%, #fff 50%)",
                "&:hover": {
                    background: "#707070",
                    boxShadow: "3px 3px 10px #70707050",
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
        setLimit(prevLimit => prevLimit + 18);
    };

    useEffect(() => {
        async function fetchPokemon() {
            try {
                setGenerating(true)
                if (pokemon && pokemon.results) {
                    const pokemonData = await Promise.all(
                        pokemon.results.map(async (pokemonData) => {
                            const response = await fetch(pokemonData.url);
                            const data = await response.json();
                            return data;
                        })
                    );
                    setGenerating(false);
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
                                <Link to={`/pokemon/${pokemon.id}`} className={pokemonCard({ type: type })} key={index}>
                                    <li >
                                        <h2>{pokemon.name}</h2>
                                        {pokemon.types.map((pokemon, index) => (
                                            <div className="types" key={index}>
                                                <abbr title={pokemon.type.name}><img key={index} src={`/sprites/${pokemon.type.name}.png`} alt="" /></abbr>
                                            </div>
                                        ))}
                                        <div className="sprite">
                                            <img src={pokemon.sprites.front_default} alt="pokemon" />
                                        </div>
                                    </li>
                                </Link>
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