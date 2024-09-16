import { Card, CardContent, CardMedia, Chip } from "@mui/material";
import { PokemonAPIResponse } from "../types/pokemonAPI";

const OpponentPokemonCard = ({pokemon  } : {pokemon : PokemonAPIResponse}) => {
        return (
            <Card sx={{ width: 200 }}>
                    <CardMedia
                        component="img"
                        height="140"
                        alt={pokemon.name}
                        src={pokemon.sprites.front_default || pokemon.sprites.front_shiny || pokemon.sprites.front_female || pokemon.sprites.other?.home.front_default || "../../public/question-mark.png"} />
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