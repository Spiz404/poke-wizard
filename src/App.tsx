import './App.css'
import { useState, useEffect } from 'react'
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import TrainerComponent from './TrainerComponent'
import TeamSelectionComponent from './TeamSelectionComponent'
import OpponentTeamComponent from './OpponentTeamComponent'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL
const DEBUG = false
function App() {

  interface TrainerDetails {
    playerName: string,
    teamName: string,
    pokemonType: string
  }

  interface PokemonType {
    name: string,
    url : string
  }

  const steps = [
    "Trainer details",
    "Pokemon team selection",
    "Opponent team selection"
  ]

  const [trainerDetails, setTrainerDetails] = useState<TrainerDetails>({playerName: "", teamName: "", pokemonType: ""})
  const [activeStep, setActiveStep] = useState<number>(0)
  // trainer details are complete if playerName, teamName and pokemonType are set
  const isTrainerDetailsComplete = trainerDetails.playerName !== "" && trainerDetails.teamName !== "" && trainerDetails.pokemonType !== "" 
  /* 
    list of all pokemon types, 
    inserted in the App component to avoid re-fetching on every render 
    of TeamSelectionComponent 
  */
  const [pokemonTypes, setPokemonTypes] = useState<PokemonType[]>([])

  // fetching pokemon types on App component mount
  useEffect(() => {
    axios.get(`${API_BASE_URL}/type`)
    .then(res => setPokemonTypes(res.data.results))
  }, []);

  // debug stuff
  useEffect(() => {

    if (DEBUG) {
      console.log("TRAINER DETAILS IN APP", trainerDetails)
    }

  }, [trainerDetails])

  const isTeamSelected = true 

  // this function checks if a step forward is possible and updates the active step
  const switchStep = (step: number) => {

    
    // can switch from step 0 to step 1 ONLY if all the trainer details are set    
    if (step > activeStep && step === 1 && !isTrainerDetailsComplete) {
      return 
    }

    // can switch from step 0 or 1 to step 2 ONLY if trainerDetails are set and pokemon team is selected
    if (step > activeStep && step === 2 && (!isTrainerDetailsComplete || !isTeamSelected)) {
      return
    }

    setActiveStep(step)
  }

  return (
    <div className="main-container">
      <Stepper activeStep={activeStep} className="stepper">
        {steps.map((step, index) => (
            <Step key={index} onClick={() => switchStep(index)}>
              <StepLabel onClick={() => switchStep(index)}>{step}</StepLabel>
            </Step>
        ))}
      </Stepper>

      {activeStep === 0 && <div>
        <TrainerComponent setTrainerDetails={setTrainerDetails} trainerDetails={trainerDetails} listPokemonTypes={pokemonTypes}/>
      </div>}

      {activeStep === 1 && <div>
        <TeamSelectionComponent favoritePokemonType={trainerDetails.pokemonType} />
      </div>}

      {activeStep === 2 && <div>
        <OpponentTeamComponent />
      </div>}

    </div>
  )
}

export default App
