import {TextField, Autocomplete } from "@mui/material"
import { useState, useEffect } from "react"
import { TypeResult, PokemonTypeListAPIResponse } from "../types/pokemonTypeAPI"
import { TrainerDetails } from "../types/appTypes"
import axios from "axios"

interface TrainerComponentProps {
    setTrainerDetails: (trainerDetails: TrainerDetails) => void
    setPokemonTypes: (pokemonTypes: TypeResult[]) => void
    trainerDetails: TrainerDetails
    listPokemonTypes: TypeResult[]
}

const TrainerComponent = ({setTrainerDetails, trainerDetails, listPokemonTypes, setPokemonTypes }: TrainerComponentProps) => {
    
    const [playerName, setPlayerName] = useState<string>("")
    const [teamName, setTeamName] = useState<string>("")
    const [pokemonType, setPokemonType] = useState<string>("")

    useEffect(() => {

        // fetching pokemon types if not already fetched
        // this is done only when the component is mounted for the first time
        // or when the App component is reloaded

        if (listPokemonTypes.length === 0) {
            axios.get<PokemonTypeListAPIResponse>(`${import.meta.env.VITE_BASE_API_URL}/type`)
            .then(res => res.data)
            .then(data => {
                setPokemonTypes(data.results)
            })
        }

        setPlayerName(trainerDetails.playerName)
        setTeamName(trainerDetails.teamName)
        setPokemonType(trainerDetails.pokemonType)
    }, [])

    useEffect(() => {
        // updating trainer details when playerName or teamName changes
        setTrainerDetails({playerName, teamName, pokemonType})
    }, [playerName, teamName, pokemonType])

    return (
        <div className="trainer-form">

            <TextField onChange={(e) => setPlayerName(e.target.value)} id="player-name" label="Player name" variant="outlined" value={playerName}/>
            <TextField onChange={(e) => setTeamName(e.target.value)} id="team-name" label="Team name" variant="outlined" value={teamName}/>            
            <Autocomplete
                disablePortal
                options={listPokemonTypes.map(t => t.name)}
                sx={{ width: 300 }}
                value={pokemonType}
                onChange={(_e, value) => setPokemonType(value ?? "")}
                renderInput={(params) => <TextField {...params} label="Favorite Pokemon type" />}
            />
        </div>
    )
}

export default TrainerComponent