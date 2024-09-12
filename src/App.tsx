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
    </div>
  )
}

export default App
