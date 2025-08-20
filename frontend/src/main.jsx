import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SubjectContextProvider } from './context/SubjectContext.jsx'
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SubjectContextProvider>
        <App />
      </SubjectContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
