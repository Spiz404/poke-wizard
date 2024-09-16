import {Card, CardContent, CardMedia, CardActionArea, Typography, Chip } from '@mui/material'

const PokemonCard = ({pokemon , selectedPokemonList, showPokemon}: {pokemon : any , selectPokemon: (pokemon: any) => void, selectedPokemonList: any[], showPokemon: (pokemon: any) => void}) => {

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
                    <CardContent className='pokemon-card-content' sx = {{alignItems: 'center'}}>
                        <p style={{color: 'black', fontWeight: 'bold'}}>{pokemon.name}</p> 
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
                        <CardContent  className='pokemon-card-content' sx = {{alignItems: 'center'}}>
                            <p style={{color: 'black', fontWeight: 'bold'}}>{pokemon.name}</p> 
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