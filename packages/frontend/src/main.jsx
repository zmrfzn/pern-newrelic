import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { PrimeReactProvider } from 'primereact/api';

import App from './App.jsx'
import './index.css'

import packageJSON from './../package.json'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <PrimeReactProvider value={{ ripple: true }}>
      <App />
    </PrimeReactProvider>
  </BrowserRouter>,
)
