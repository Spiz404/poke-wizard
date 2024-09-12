import './App.css'
import { useState, useEffect } from 'react'
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import StepContent from "@mui/material/StepContent"
import TrainerComponent from './TrainerComponent'
import TeamSelectionComponent from './TeamSelectionComponent'
import OpponentTeamComponent from './OpponentTeamComponent'

function App() {

  interface TrainerDetails {
    playerName: string
    teamName: string
  }

  const steps = [
    "Trainer details",
    "Pokemon team selection",
    "Opponent team selection"
  ]

  const [trainerDetails, setTrainerDetails] = useState<TrainerDetails>({playerName: "", teamName: ""})
  const [activeStep, setActiveStep] = useState<number>(0)
  const isTrainerDetailsComplete = trainerDetails.playerName !== "" && trainerDetails.teamName !== ""
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

  useEffect(() => {
    console.log("trainer details modificati");
    console.log(trainerDetails)
  }, [trainerDetails]);



  return (
    <div className="main-container">
      <Stepper activeStep={activeStep} className="stepper">
        {steps.map((step, index) => (
          <Step key={index} onClick={() => switchStep(index)}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && <div>
        <TrainerComponent setTrainerDetails={setTrainerDetails} trainerDetails={trainerDetails}/>
      </div>}

      {activeStep === 1 && <div>
        <TeamSelectionComponent />
      </div>}

      {activeStep === 2 && <div>
        <OpponentTeamComponent />
      </div>}

    </div>
  )
}

export default App
