import { useEffect, useState } from "react";
import { Button, Grid } from '@mui/material';
import CircularIndeterminate from "../CircularIndeterminate";
import axios from "axios";
import OpponentPokemonCard from "./OpponentPokemonCard";
import { PokemonAPIResponse } from "../types/pokemonAPI";
import { PokemonSpecieAPIResponse } from "../types/pokemonSpeciesAPI";

const OpponentTeamComponent = ({selectedPokemons}: {selectedPokemons: any[]}) => {

    const [generations, setGenerations] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [opponentTeam, setOpponentTeam] = useState<PokemonAPIResponse[]>([]);

    const genereteOpponentTeam = async () => {
        
        console.log("generating opponent team");
        const opponentTeam : Array<PokemonAPIResponse> = [];

        while (opponentTeam.length < 4) {

            const randomId = Math.floor(Math.random() * 1302) + 1;

            try {

                const pokemon = await axios.get<PokemonAPIResponse>(`${import.meta.env.VITE_BASE_API_URL}/pokemon/${randomId}`);
                
                const pokemonSpecie = await axios.get<PokemonSpecieAPIResponse>(pokemon.data.species.url);

                if (!generations.includes(pokemonSpecie.data.generation.name)) {
                    opponentTeam.push(pokemon.data);
                }
            } catch (error) {
                //console.error(error);
            }
        }

        return opponentTeam;
    };

    useEffect(() => {

        // getting user's pokemons generations
        const fetchPokemonsGenerationsAndGenerateTeam = async () => {

            const gens = new Set();
            for (let pokemon of selectedPokemons) {
                const species = pokemon.species.url;
                const species_data = await fetch(species).then(res => res.json());
                gens.add(species_data.generation.name);
            }
            
            setGenerations(Array.from(gens) as string[]);
            const team = await genereteOpponentTeam();
            setOpponentTeam(team);
            setLoading(false);
        }

        fetchPokemonsGenerationsAndGenerateTeam();
    }, [])


    const newTeam = () => {
        setLoading(true);
        genereteOpponentTeam().then(team => {setOpponentTeam(team); setLoading(false)});
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