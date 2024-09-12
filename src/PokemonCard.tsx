
interface Pokemon {
    name: string
    image: string 
}

const PokemonCard = ({pokemon}: {pokemon: Pokemon}) => {
    return (
        <div>
            <img src={pokemon.image} alt={pokemon.name} />
            <h2>{pokemon.name}</h2>
        </div>
    )
}

export default PokemonCard