import { useEffect, useState } from "react";
import { Button, Grid } from '@mui/material';
import CircularIndeterminate from "../CircularIndeterminate";
import axios from "axios";
import OpponentPokemonCard from "./OpponentPokemonCard";
import { PokemonAPIResponse } from "../types/pokemonAPI";
import { PokemonSpecieAPIResponse } from "../types/pokemonSpeciesAPI";

interface OpponentTeamComponentProps {
    selectedPokemons: PokemonAPIResponse[];
    pokemonsList: PokemonAPIResponse[];
    opponentTeam: PokemonAPIResponse[];
    setOpponentTeam: React.Dispatch<React.SetStateAction<PokemonAPIResponse[]>>;
}

const OpponentTeamComponent = ({selectedPokemons, pokemonsList, opponentTeam, setOpponentTeam}: OpponentTeamComponentProps) => {

    const [generations, setGenerations] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    //const [opponentTeam, setOpponentTeam] = useState<PokemonAPIResponse[]>([]);

    const genereteOpponentTeam = async () => {
        
        const opponentTeam : Array<PokemonAPIResponse> = [];

        while (opponentTeam.length < 4) {

            const randomPokemon = pokemonsList[Math.floor(Math.random() * pokemonsList.length)];

            const pokemonSpecie = await axios.get<PokemonSpecieAPIResponse>(randomPokemon.species.url);

            if (!generations.includes(pokemonSpecie.data.generation.name)) {
                opponentTeam.push(randomPokemon);
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