import { Card, CardContent, CardMedia, Chip } from "@mui/material";
import { PokemonAPIResponse } from "../types/pokemonAPI";
import { getPokemonImage } from "../utils/getPokemonImage";

const OpponentPokemonCard = ({pokemon  } : {pokemon : PokemonAPIResponse}) => {
        return (
            <Card sx={{ width: 200 }}>
                    <CardMedia
                        component="img"
                        height="140"
                        alt={pokemon.name}
                        src={getPokemonImage(pokemon)} />
                    <CardContent className='pokemon-card-content'>
                        <p style={{color: 'black', fontWeight: 'bold', textAlign: 'center'}}>{pokemon.name}</p>
                        <div className='pokemon-card-types'>
                            { pokemon.types.map((type: any) => {
                                return <Chip key={type.type.name} label={type.type.name}></Chip>
                            })}
                        </div>
                        <div className='pokemon-card-stats'>
                            { pokemon.stats.map((stat : any) => <p>{stat.stat.name}: {stat.base_stat}</p>)} 
                        </div>
                    </CardContent>
        </Card>
    );
}

export default OpponentPokemonCard;