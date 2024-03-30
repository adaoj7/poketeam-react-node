import { useState } from "react";
import axios from "axios";

const Poketeam = () => {
    // const [count, setCount] = useState(0);

    interface PokemonData {
        name: string;
        id: number;
        sprites: {
            front_default: string;
            front_shiny: string;
        };
    }

    // const [searchCount, setSearchCount] = useState(0);
    const [name, setName] = useState("");
    const [pokemon, setPokemon] = useState<PokemonData | null>(null);
    const [pokeTeam, setPokeTeam] = useState<PokemonData[]>([]);
    const [error, setError] = useState("");

    const getRandomArbitrary = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min) + min);
    };

    // useEffect(() => {
    //     const response: any = async () => {
    //         try {
    //             const response = await axios.get(`/api/getCount`);
    //             setSearchCount(response.data);
    //         } catch (err: any) {
    //             console.log(err);
    //         }
    //     };
    //     response();
    // }, []);

    const searchPokemon = async () => {
        try {
            const response = await axios.get(`/api/getPokemon`);
            console.log(response);
            if (!response) {
                throw new Error(`Failed to fetch: ${response}`);
            }
            const data = await response.data;
            setError("");
            return data;
        } catch (err: any) {
            setError(err.message);
            setPokemon(null);
        }
    };

    const searchGenOne = async () => {
        try {
            const data = await axios.get("api/getTeamGenOne");
            console.log(data);
            setPokeTeam(data.data);
        } catch (err) {
            console.log(err);
        }
    };

    const searchGenTwo = async () => {
        try {
            const data = await axios.get("api/getTeamGenTwo");
            console.log(data);
            setPokeTeam(data.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div className="flex justify-center flex-col mt-40">
                <h2 className="flex justify-center text-lg">
                    This project is going to help me to build teams when I play
                    through Pokemon games
                </h2>
                <div className="flex flex-col justify-center">
                    <div className="flex justify-center p-4 mt-4 items-center">
                        <button
                            className="btn flex m-4"
                            onClick={async () => {
                                const data = await searchPokemon();
                                setPokemon(data);
                            }}
                        >
                            Search
                        </button>
                        <button className="btn flex m-4" onClick={searchGenOne}>
                            Create team gen1
                        </button>
                        <button className="btn flex m-4" onClick={searchGenTwo}>
                            Create team gen2
                        </button>
                    </div>
                    <br />
                    {error && <p>Error: {error}</p>}
                    {pokemon && (
                        <>
                            <div className="flex justify-center">
                                {pokemon.name}
                            </div>
                            <div className="flex flex-row justify-center items-center">
                                <img
                                    src={pokemon.sprites.front_default}
                                    alt=""
                                />
                                <img src={pokemon.sprites.front_shiny} alt="" />
                            </div>
                        </>
                    )}
                    <div className="flex justify-center flex-row items-center">
                        {pokeTeam.map((pokemon, index) => (
                            <div key={index} className="flex">
                                <p className="flex items-center">
                                    {pokemon.name}
                                </p>
                                {/* <img src={pokemon.sprites.front_default} /> */}
                                <img src={pokemon.sprites.front_shiny} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col items-center justify-end">
                    {/* <div>Pokemon generated:</div> */}
                    <a href="https://pokeapi.co/" className="hover:underline">
                        PokeAPI
                    </a>
                </div>
            </div>
        </>
    );
};

export default Poketeam;
