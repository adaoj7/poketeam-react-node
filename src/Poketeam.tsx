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

    const handleInputChange = (e: any) => {
        setName(e.target.value);
    };
    const randomPokemon = (num: number): string[] => {
        const numArr: string[] = [];
        for (let i = 0; i < num; i++) {
            const num = getRandomArbitrary(1, 152).toString();
            numArr.push(num);
        }
        return numArr;
    };

    const searchPokemon = async () => {
        const randomPokemonNum: string = randomPokemon(1)[1];
        console.log(randomPokemon);
        try {
            const response = await axios.get(`/api/getPokemon`, {
                params: {
                    name: randomPokemonNum,
                },
            });
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

    const searchTeam = async () => {
        const teamArr = randomPokemon(6);
        try {
            const responses = await Promise.all(
                teamArr.map((id) =>
                    axios.get(`/api/getPokemon`, {
                        params: {
                            name: id,
                        },
                    })
                )
            );
            const data = responses.map((response) => response.data);
            setPokeTeam(data);
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
                        <input
                            type="text"
                            value={name}
                            onChange={handleInputChange}
                            placeholder="Enter Pokemon Name or Id"
                            className="p-4 m-4"
                        />
                        <button
                            className="btn flex"
                            onClick={async () => {
                                const data = await searchPokemon();
                                setPokemon(data);
                            }}
                        >
                            Search
                        </button>
                        <button className="btn flex" onClick={searchTeam}>
                            Create team
                        </button>
                    </div>
                    <br />
                    {error && <p>Error: {error}</p>}
                    {pokemon && (
                        <div className="flex flex-row justify-center items-center">
                            <img src={pokemon.sprites.front_default} alt="" />
                            <img src={pokemon.sprites.front_shiny} alt="" />
                        </div>
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
