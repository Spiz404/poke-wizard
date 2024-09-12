import './App.css'
import { useState } from 'react'
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import StepContent from "@mui/material/StepContent"
import Button from "@mui/material/Button"

function App() {

  const steps = [
    "Pokemon trainer details",
    "Pokemon team selection",
    "Opponent team selection"
  ]

  const [activeStep, setActiveStep] = useState<number>(0)
  
  return (
    <div className="main-container">
      <Stepper activeStep={activeStep} className="stepper">
        {steps.map((step, index) => (
          <Step key={index} onClick={() => setActiveStep(index)}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && <div>
        <h1>Pokemon trainer details</h1>
      </div>}

      {activeStep === 1 && <div>
        <h1>Pokemon team selection</h1>
      </div>}

      {activeStep === 2 && <div>
        <h1>Opponent team selection</h1>
      </div>}

    </div>
  )
}

export default App
