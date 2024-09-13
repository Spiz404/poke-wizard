import {TextField, Autocomplete } from "@mui/material"
import { useState, useEffect } from "react"
import { TypeResult } from "./types/pokemonTypeAPI"
import { TrainerDetails } from "./types/appTypes"

const TrainerComponent = ({setTrainerDetails, trainerDetails, listPokemonTypes}: {setTrainerDetails: (trainerDetails: TrainerDetails) => void, trainerDetails: TrainerDetails, listPokemonTypes: TypeResult[]}) => {
    
    const [playerName, setPlayerName] = useState<string>("")
    const [teamName, setTeamName] = useState<string>("")
    const [pokemonType, setPokemonType] = useState<string>("")

    useEffect(() => {
        console.log("TRAINER DETAILS IN FORM", trainerDetails)
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
                onChange={(e, value) => setPokemonType(value ?? "")}
                renderInput={(params) => <TextField {...params} label="Favorite Pokemon type" />}
            />
        </div>
    )
}

export default TrainerComponent