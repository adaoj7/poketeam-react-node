const Pokemon = ({ pokemon }: any) => {
    console.log(pokemon);
    return (
        <div className="flex flex-col justify-center m-4">
            {/* <img src={pokemon.sprites.front_shiny} alt="" /> */}
            <img src={pokemon.sprites.front_default} alt="" />
            <div className="flex justify-center">{pokemon.name}</div>
        </div>
    );
};

export default Pokemon;
