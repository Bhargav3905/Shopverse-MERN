import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from "react-hot-toast";

import "./styles/theme.css";
import "./styles/components.css";
import "./styles/utilities.css";
import "./styles/animations.css";
import "./styles/responsive.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 2500,
      }}
    />
  </StrictMode>,
)
