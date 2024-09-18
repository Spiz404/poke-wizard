import { useEffect, useState } from "react";
import { Button, Grid } from '@mui/material';
import CircularIndeterminate from "../CircularIndeterminate";
import axios from "axios";
import OpponentPokemonCard from "./OpponentPokemonCard";
import { PokemonAPIResponse } from "../types/pokemonAPI";
import { PokemonSpecieAPIResponse } from "../types/pokemonSpeciesAPI";
import { Result } from "../types/pokemonAPI";

interface OpponentTeamComponentProps {
    selectedPokemons: PokemonAPIResponse[];
    pokemonsList: Result[];
    opponentTeam: PokemonAPIResponse[];
    setOpponentTeam: React.Dispatch<React.SetStateAction<PokemonAPIResponse[]>>;
}

const OpponentTeamComponent = ({selectedPokemons, pokemonsList}: OpponentTeamComponentProps) => {

    const [generations, setGenerations] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [opponentTeam, setOpponentTeam] = useState<PokemonAPIResponse[]>([]);

    const genereteOpponentTeam = async () => {
        
        const opponentTeam : Array<PokemonAPIResponse> = [];

        while (opponentTeam.length < 4) {

            const randomPokemon = pokemonsList[Math.floor(Math.random() * pokemonsList.length)];
            const pokemonDetails = await axios.get<PokemonAPIResponse>(randomPokemon.url);
            const data = pokemonDetails.data.species.url;
            const pokemonSpecie = await axios.get<PokemonSpecieAPIResponse>(data);

            if (!generations.includes(pokemonSpecie.data.generation.name)) {
                opponentTeam.push(pokemonDetails.data);
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
                const species_data = await axios.get<PokemonSpecieAPIResponse>(species);
                gens.add(species_data.data.generation.name);
            }
            
            setGenerations(Array.from(gens) as string[]);
            const team = await genereteOpponentTeam();
            setOpponentTeam(team);
            setLoading(false);
        }

        if (opponentTeam.length == 0) fetchPokemonsGenerationsAndGenerateTeam();
        
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
                {opponentTeam.map(pokemon => <OpponentPokemonCard key = {pokemon.name} pokemon={pokemon} />)}
            </Grid>

                <Button variant="contained" onClick={() => newTeam()} >
                    Generate New Team
                </Button>
        </div>
    )
}

export default OpponentTeamComponent