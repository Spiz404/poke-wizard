import {TextField } from "@mui/material"
import { useState, useEffect } from "react"

interface TrainerDetails {
    playerName: string
    teamName: string
}

const TrainerComponent = ({setTrainerDetails, trainerDetails}: {setTrainerDetails: (trainerDetails: TrainerDetails) => void, trainerDetails: TrainerDetails}) => {
    
    const [playerName, setPlayerName] = useState<string>("")
    const [teamName, setTeamName] = useState<string>("")


    useEffect(() => {
        console.log("TRAINER DETAILS IN FORM", trainerDetails)
        setPlayerName(trainerDetails.playerName)
        setTeamName(trainerDetails.teamName)
    }, [])

    useEffect(() => {
        // updating trainer details when playerName or teamName changes
        setTrainerDetails({playerName, teamName})
    }, [playerName, teamName])

    return (
        <div className="trainer-form">

            <TextField onChange={(e) => setPlayerName(e.target.value)} id="player-name" label="Player name" variant="outlined" value={playerName}/>
            <TextField onChange={(e) => setTeamName(e.target.value)} id="team-name" label="Team name" variant="outlined" value={teamName}/>            

        </div>
    )
}

export default TrainerComponent