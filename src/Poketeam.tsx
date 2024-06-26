﻿import { useState } from "react";
import axios from "axios";
import Pokemon from "./Pokemon";

const Poketeam = () => {
    const [count, setCount] = useState(0);

    interface PokemonData {
        name: string;
        id: number;
        sprites: {
            front_default: string;
            front_shiny: string;
        };
    }

    const [pokemon, setPokemon] = useState<PokemonData | null>(null);
    const [pokeTeam, setPokeTeam] = useState<PokemonData[]>([]);
    const [error, setError] = useState("");

    const searchPokemon = async () => {
        try {
            const response = await axios.get(`/api/randomPokemon`);
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
            const response = await axios.get("api/getTeamGenOne");
            console.log(response);
            // setCount(count + 1);
            setPokeTeam(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const searchGenTwo = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.get("api/getTeamGenTwo");
            console.log(response);
            setPokeTeam(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const searchGenThree = async () => {
        try {
            const response = await axios.get("api/getTeamGenThree");
            console.log(response);
            setPokeTeam(response.data);
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
                        <form onSubmit={searchGenTwo}>
                            <button className="btn flex m-4">
                                Create team gen2
                            </button>
                        </form>
                        <button
                            className="btn flex m-4"
                            onClick={searchGenThree}
                        >
                            Create team gen3
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
                        {/* Here I would like to create a button that allows you to click and send the pokemon selected to view more info */}
                        {pokeTeam.map((pokemon, index) => (
                            <>
                                {/* <div key={index} className="flex">
                                    <p className="flex items-center">
                                        {pokemon.name}
                                    </p>
                                    <img src={pokemon.sprites.front_default} />
                                    <img src={pokemon.sprites.front_shiny} />
                                </div> */}
                                <Pokemon pokemon={pokemon} count={count} />
                            </>
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
