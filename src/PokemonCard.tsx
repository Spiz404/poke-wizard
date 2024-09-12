import {Card, CardContent, CardMedia, Typography, Button } from '@mui/material'
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
            <CardContent sx={{height: 100}} style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <Typography gutterBottom variant="h5" component="div" style={{textAlign: 'center'}}>
                    {pokemon.name}
                </Typography>
                <Button> select</Button>
            </CardContent>
        </Card>
    )
}

export default PokemonCard