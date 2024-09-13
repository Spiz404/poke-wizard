import { useEffect, useState } from "react";
import { Button, Grid } from '@mui/material';
import CircularIndeterminate from "./CircularIndeterminate";
import axios from "axios";
import OpponentPokemonCard from "./OpponentPokemonCard";
import { PokemonAPIResponse } from "./types/pokemonAPI";
import { PokemonSpecieAPIResponse } from "./types/pokemonSpeciesAPI";

const OpponentTeamComponent = ({selectedPokemons}: {selectedPokemons: any[]}) => {

    const [generations, setGenerations] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [opponentTeam, setOpponentTeam] = useState<any[]>([]);

    const genereteOpponentTeam = async () => {

        const opponentTeam : Array<any> = [];

        while (opponentTeam.length < 4) {

            const randomId = Math.floor(Math.random() * 1302) + 1;

            try {

                const pokemon = await axios.get<PokemonAPIResponse>(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
                
                const pokemonSpecie = await axios.get<PokemonSpecieAPIResponse>(pokemon.data.species.url);

                if (!generations.includes(pokemonSpecie.data.generation.name)) {
                    opponentTeam.push(pokemon.data);
                }
            } catch (error) {
                console.error(error);
            }
        }

        return opponentTeam;
    };

    useEffect(() => {

        // getting user's pokemons generations
        const fetchPokemonsGenerations = async () => {

            const gens = new Set();
            for (let pokemon of selectedPokemons) {
                const species = pokemon.species.url;
                const species_data = await fetch(species).then(res => res.json());
                gens.add(species_data.generation.name);
            }
            
            return gens;
        }

        fetchPokemonsGenerations().then(gens => setGenerations(Array.from(gens) as string[]));
        
        genereteOpponentTeam().then(team => {setOpponentTeam(team); setLoading(false)});

    }, [])


    const newTeam = () => {
        setLoading(true);
        genereteOpponentTeam().then(team => {setOpponentTeam(team); setLoading(false)});
    }

    const acceptTeam = async () => {
        
        setLoading(true);

        await setTimeout(() => {
            setLoading(false);
        }, 3000);
    }

    if (loading) {
        return <CircularIndeterminate />
    }
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40}}>
            <h1>Opponent Team</h1>
            <Grid container spacing={2} sx={{display: 'flex', justifyContent: 'center', gap: 10}}>
                {opponentTeam.map(pokemon => <OpponentPokemonCard  key = {pokemon.id} pokemon={pokemon} />)}
            </Grid>

                <Button variant="contained" onClick={() => newTeam()} >
                    Generate New Team
                </Button>
        </div>
    )
}

export default OpponentTeamComponent