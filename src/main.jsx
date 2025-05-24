import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.min.css'
import MortgageCalculator from './MortgageCalculator.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MortgageCalculator />
  </StrictMode>,
)
