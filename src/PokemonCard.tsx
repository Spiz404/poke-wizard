import {Card, CardContent, CardMedia, Typography } from '@mui/material'
interface Pokemon {
    name: string
    image: string 
}

const PokemonCard = ({pokemon}: {pokemon: Pokemon}) => {
    return (
        <Card sx={{ width: 150 }}>
            <CardMedia
                component="img"
                height="140"
                image={pokemon.image}
                alt={pokemon.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {pokemon.name}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default PokemonCard