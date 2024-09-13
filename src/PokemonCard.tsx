import {Card, CardContent, CardMedia, Typography, Button } from '@mui/material'
import { useState } from 'react'

interface Pokemon {
    name: string
    image: string 
}

const PokemonCard = ({pokemon, selectPokemon, selectedPokemonList}: {pokemon: Pokemon, selectPokemon: (pokemon: any) => void, selectedPokemonList: any[]}) => {


    const selectCurrentPokemon = () => {
        selectPokemon(pokemon)
    }

    const selected = selectedPokemonList.filter((p) => p.name === pokemon.name).length > 0

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
                {  !selected? <Button onClick={() => selectCurrentPokemon()}> select</Button> : <p style={{textAlign: 'center'}}> selected </p> }
            </CardContent>
        </Card>
    )
}

export default PokemonCard