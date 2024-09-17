import { Card, CardContent, CardMedia, CardActionArea } from '@mui/material'
import { getPokemonImage } from '../utils/getPokemonImage'

const PokemonCard = ({pokemon, removePokemon}: {pokemon: any, removePokemon: (pokemonName: string) => void}) => {

    return (
        <Card className="selected-pokemon-card" sx={{ width: 150 }} >
            <CardActionArea onClick={() => removePokemon(pokemon.name)} sx={{color: 'red'}}>
            <CardMedia
                component="img"
                height="100"
                image={getPokemonImage(pokemon)}
                alt={pokemon.name}
            />
            <CardContent  style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
                <p style={{color: 'black', fontWeight: 'bold', textAlign: 'center'}}>
                    {pokemon.name}
                </p>

            </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default PokemonCard