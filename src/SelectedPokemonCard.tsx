import {Card, CardContent, CardMedia, Typography, Button } from '@mui/material'
import { useState } from 'react'

interface Pokemon {
    name: string
    image: string 
}

const PokemonCard = ({pokemon, removePokemon}: {pokemon: Pokemon, removePokemon: (pokemonName: string) => void}) => {

    const [isHovered, setIsHovered] = useState(false);

    

    return (
        <Card className="selected-pokemon-card" sx={{ width: 150 }}  onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <CardMedia
                component="img"
                height="100"
                image={pokemon.image}
                alt={pokemon.name}
            />
            <CardContent  style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <Typography gutterBottom variant="h5" component="div" style={{textAlign: 'center'}}>
                    {pokemon.name}
                </Typography>

                {isHovered && <Button variant="contained" color="error" onClick={() => removePokemon(pokemon.name)}>Remove</Button>}
            </CardContent>
        </Card>
    )
}

export default PokemonCard