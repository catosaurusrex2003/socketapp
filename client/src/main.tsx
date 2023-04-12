import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { AllProvider } from './context/allContext'

//@ts-ignore
ReactDOM.createRoot(document.getElementById('root')).render(
    <AllProvider>
        <App />
    </AllProvider>
)
