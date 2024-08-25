import React from 'react'
import * as ReactDOM from 'react-dom'
import './index.css'
import {App} from './components/App/App'
import reportWebVitals from './reportWebVitals'
import {GameEngineProvider} from "./hooks/useGameEngine"
import {
    BrowserRouter as Router
} from "react-router-dom"
import {PrivateAccessProvider} from "./hooks/usePrivateAccess"


ReactDOM.render(
    <React.StrictMode>
        <Router basename="/creights">
            <PrivateAccessProvider>
                <GameEngineProvider>
                    <App />
                </GameEngineProvider>
            </PrivateAccessProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
