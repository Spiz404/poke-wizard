import {Card, CardContent, CardMedia, CardActionArea, Typography, Button } from '@mui/material'
import { useState } from 'react'

interface Pokemon {
    name: string
    image: string 
}

const PokemonCard = ({pokemon, selectPokemon, selectedPokemonList, showPokemon}: {pokemon: Pokemon, selectPokemon: (pokemon: any) => void, selectedPokemonList: any[], showPokemon: (pokemon: any) => void}) => {

    const selected = selectedPokemonList.filter((p) => p.name === pokemon.name).length > 0

    const selectCurrentPokemon = () => {
        showPokemon(pokemon)
        /*
        if (!selected) {
            selectPokemon(pokemon)
        }
            */

    }

    if (!selected) {

        return (
            <Card sx={{ width: 150, height: 200 }}>
                <CardActionArea onClick={() => selectCurrentPokemon()} sx={{color: 'green'}}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={pokemon.image}
                        alt={pokemon.name}
                    />
                    <CardContent  style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                        <Typography gutterBottom variant="h5" component="div" style={{textAlign: 'center', color: 'black'}}>
                            {pokemon.name}
                        </Typography>
                        </CardContent>
                </CardActionArea>
            </Card>
        )

    }
    else {
        return (
                    <Card sx={{ width: 150, height: 200, opacity: 0.5 }}>

                        <CardMedia
                            component="img"
                            height="140"
                            image={pokemon.image}
                            alt={pokemon.name}
                        />
                        <CardContent  style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                            <Typography gutterBottom variant="h5" component="div" style={{textAlign: 'center'}}>
                                {pokemon.name}
                            </Typography>
                            </CardContent>
                    </Card>
                )
    }
}

export default PokemonCard