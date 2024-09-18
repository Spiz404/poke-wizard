import { Card, CardContent, CardMedia, CardActionArea } from '@mui/material'
import { getPokemonImage } from '../utils/getPokemonImage'
import { PokemonAPIResponse } from '../types/pokemonAPI'

interface SelectedPokemonCardProps {
    pokemon: PokemonAPIResponse
    removePokemon: (pokemonName: string) => void // function to remove a pokemon from the selected team
}

const SelectedPokemonCard = ({pokemon, removePokemon}: SelectedPokemonCardProps) => {

    return (
        <Card className="selected-pokemon-card" sx={{ width: 150, height: 250}} >
            <CardActionArea onClick={() => removePokemon(pokemon.name)} sx={{ height: '100%', color: 'red'}}>
            <CardMedia
                component="img"
                height="170px"
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

export default SelectedPokemonCard