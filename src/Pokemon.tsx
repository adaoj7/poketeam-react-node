import { useState } from "react";
import axios from "axios";

const Pokemon = ({ pokemon }: any) => {
    const [pokemonData, setPokemonData] = useState(pokemon);
    const [input, setInput] = useState("");

    const searchPokemon = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(input);
        try {
            const data = await axios.get("/api/getPokemon", {
                params: {
                    name: input,
                },
            });
            console.log(data.data);
            setPokemonData(data.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex flex-col justify-center m-4">
            {/* <img src={pokemon.sprites.front_shiny} alt="" /> */}
            <img src={pokemonData.sprites.front_default} alt="" />
            <div className="flex justify-center">{pokemonData.name}</div>
            <form onSubmit={searchPokemon}>
                <input
                    type="text"
                    placeholder="Search a Pokemon"
                    value={input}
                    onChange={(e: any) => {
                        console.log(e.target.value);
                        setInput(e.target.value);
                    }}
                />
                <button>Search</button>
            </form>
            {pokemonData.stats.map((stat: any) => {
                // console.log(stat);
                return (
                    <div>
                        {stat.stat.name}: {stat.base_stat}
                    </div>
                );
            })}
        </div>
    );
};

export default Pokemon;
