import { Card, CardContent, CardMedia, Typography, Chip } from "@mui/material";

const OpponentPokemonCard = ({pokemon  } : {pokemon : any}) => {
        return (
            <Card sx={{ width: 200 }}>
                    <CardMedia
                        component="img"
                        height="140"
                        alt={pokemon.name}
                        src={pokemon.sprites.front_default} />
                    <CardContent className='pokemon-card-content'>
                        <Typography gutterBottom variant="h5" component="div" style={{textAlign: 'center', color: 'black'}}>
                            {pokemon.name}
                        </Typography>
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