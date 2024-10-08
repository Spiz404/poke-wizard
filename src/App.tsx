import './App.css'
import { useState } from 'react'
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import TrainerComponent from './trainer-details/TrainerComponent'
import TeamSelectionComponent from './pokemon-team-selection/TeamSelectionComponent'
import OpponentTeamComponent from './opponent-team-generation/OpponentTeamComponent'
import SuccessPage from './SuccessPage'
import { Snackbar, Alert, Button } from '@mui/material'
import { TypeResult  } from './types/pokemonTypeAPI'
import { TrainerDetails } from './types/appTypes'
import { PokemonAPIResponse } from './types/pokemonAPI'
import { Result } from './types/pokemonAPI'


function App() {

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
    stored in the App component to avoid re-fetching on every render 
    of TeamSelectionComponent 
  */

  const [pokemonTypes, setPokemonTypes] = useState<TypeResult[]>([])

  // currentFavoritePokemonTyped contains the current favorite pokemon type that is listed as first in the select team pokemon page.
  // it is used to determine if is necessary to rearrange the pokemon selection list to show the modified favorite pokemon type first
  const [currentFavoritePokemonType, setCurrentFavoritePokemonType] = useState<string>("")

  // list of all pokemons, used to display the pokemons in the team selection page  
  const [pokemonsResultList, setPokemonsResultList] = useState<Result[]>([])

  // list of selected pokemons by user, in App component to avoid loosing selected pokemons on page change
  const [selectedPokemons, setSelectedPokemons] = useState<PokemonAPIResponse[]>([])

  const [opponentTeam, setOpponentTeam] = useState<PokemonAPIResponse[]>([])

  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);

  // team is selected if 7 pokemons are selected
  const isTeamSelected = selectedPokemons.length == 7

  // this function checks if a step forward is possible and updates the active step
  const switchStep = (step: number) => {

    if (step < 0 || step > 3) {
      return;
    }

    // can switch from step 0 to step 1 ONLY if all the trainer details are set    
    if (step > activeStep && activeStep === 0 && !isTrainerDetailsComplete) {
      setErrorMessage("Please set your trainer details before proceeding")
      setError(true)
      return 
    }

    if (step == 2 && activeStep >= 0  && !isTeamSelected) {
      setErrorMessage("Please set your pokemon team before proceeding")
      setError(true)
      return
    }

    setActiveStep(step)
  }

  return (
    <>
    <div className="main-container">
      <Stepper activeStep={activeStep} className="stepper">
        {steps.map((step, index) => (
            <Step key={index} onClick={() => switchStep(index)}>
              <StepLabel onClick={() => switchStep(index)}>{step}</StepLabel>
            </Step>
        ))}
      </Stepper>

        <div style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
          <Button variant="contained" onClick={() => switchStep(activeStep - 1)}>back</Button>
          <Button variant="contained" onClick={() => switchStep(activeStep + 1)}>next</Button>
        </div>

      {activeStep === 0 && <div>
        <TrainerComponent 
          setTrainerDetails={setTrainerDetails} 
          trainerDetails={trainerDetails} 
          setPokemonTypes={setPokemonTypes}
          listPokemonTypes={pokemonTypes}/>
      </div>}

      {activeStep === 1 && <div>
        <TeamSelectionComponent  
            currentFavoritePokemonType={currentFavoritePokemonType} 
            setCurrentFavoritePokemonType={setCurrentFavoritePokemonType} 
            selectedPokemons={selectedPokemons} 
            pokemonsList={pokemonsResultList} 
            setPokemonsList={setPokemonsResultList} 
            favoritePokemonType={trainerDetails.pokemonType} 
            setSelectedPokemons={setSelectedPokemons} />
      </div>}

      {activeStep === 2 && <div>
        <OpponentTeamComponent 
          opponentTeam={opponentTeam}  
          setOpponentTeam={setOpponentTeam} 
          pokemonsList={pokemonsResultList} 
          selectedPokemons={selectedPokemons} />
      </div>}

      {activeStep === 3 && <div>
       <SuccessPage/> 
      </div>}

    </div>

    <Snackbar id="error-snackbar" onClose={() => setError(false)} anchorOrigin={{vertical: 'top', horizontal: 'center'}} autoHideDuration={2000}  open={error}>
      <Alert severity="error">{errorMessage}</Alert>
    </Snackbar>
    </>
  )
}

export default App
