import {Card, CardContent, CardMedia, CardActionArea, Chip } from '@mui/material'
import { PokemonAPIResponse } from '../types/pokemonAPI'
import { getPokemonImage } from '../utils/getPokemonImage'

interface PokemonCardProps {
    pokemon : PokemonAPIResponse
    selectedPokemonList: PokemonAPIResponse[]
    showPokemon: (pokemon: PokemonAPIResponse) => void
}

const PokemonCard = ({pokemon , selectedPokemonList, showPokemon}: PokemonCardProps) => {

    const CommonCardContent = () => {
        return (
            <CardContent className='pokemon-card-content' sx = {{alignItems: 'center'}}>
                <p style = {{fontWeight: 'bold'}}>{pokemon.name}</p> 
                <div className='pokemon-card-types'>
                    { pokemon.types.map((type: any) => {
                        return <Chip key={type.type.name} label={type.type.name}></Chip>
                    })}
                </div>
            </CardContent>
        );
    }

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
                        image={getPokemonImage(pokemon)}
                        alt={pokemon.name}
                    />
                    <CommonCardContent />
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
                        image={getPokemonImage(pokemon)}
                        alt={pokemon.name}
                    />
                    <CommonCardContent />
                </Card>
            )
    }
}

export default PokemonCard