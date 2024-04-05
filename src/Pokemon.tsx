const Pokemon = ({ pokemon }: any) => {
    console.log(pokemon);
    return (
        <>
            <img src={pokemon.sprites.front_shiny} alt="" />
            {pokemon.name}
        </>
    );
};

export default Pokemon;
