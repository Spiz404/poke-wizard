import {Card, CardContent, CardMedia, CardActionArea, Typography, Button, Chip } from '@mui/material'
import { useState } from 'react'

interface Pokemon {
    name: string
    image: string 
}

const PokemonCard = ({pokemon, selectPokemon, selectedPokemonList, showPokemon}: {pokemon : any , selectPokemon: (pokemon: any) => void, selectedPokemonList: any[], showPokemon: (pokemon: any) => void}) => {

    const selected = selectedPokemonList.filter((p) => p.name === pokemon.name).length > 0

    const selectCurrentPokemon = () => {
        showPokemon(pokemon)
    }
    
    if (!selected) {

        return (
            <Card sx={{ width: 150, height: 275}}>
                <CardActionArea onClick={() => selectCurrentPokemon()} sx={{color: 'green', height: '100%'}}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={pokemon.sprites.front_default}
                        alt={pokemon.name}
                    />
                    <CardContent className='pokemon-card-content'>
                        <Typography gutterBottom variant="h5" component="div" style={{textAlign: 'center', color: 'black'}}>
                            {pokemon.name}
                        </Typography>
                        <div className='pokemon-card-types'>
                            { pokemon.types.map((type: any) => {
                                return <Chip key={type.type.name} label={type.type.name}></Chip>
                            })}
                        </div>
                        </CardContent>
                </CardActionArea>
            </Card>
        )

    }
    else {
        return (
                    <Card sx={{ width: 150, height:275, opacity: 0.5 }}>

                        <CardMedia
                            component="img"
                            height="140"
                            image={pokemon.sprites.front_default}
                            alt={pokemon.name}
                        />
                        <CardContent  className='pokemon-card-content'>
                            <Typography gutterBottom variant="h5" component="div" style={{textAlign: 'center'}}>
                                {pokemon.name}
                            </Typography>
                            <div className='pokemon-card-types'>
                            { pokemon.types.map((type: any) => {
                                    return <Chip key={type.type.name} label={type.type.name}></Chip>
                                })}
                            </div>
                        </CardContent>
                    </Card>
                )
    }
}

export default PokemonCard