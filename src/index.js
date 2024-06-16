import React from 'react';
import * as ReactDOM from 'react-dom'
import './index.css'
import {App} from './components/App/App'
import reportWebVitals from './reportWebVitals'
import {GameEngineProvider} from "./hooks/useGameEngine"
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom"

//const root = ReactDOM.createRoot(document.getElementById('root'));
ReactDOM.render(
    <React.StrictMode>
      <GameEngineProvider>
          <Router basename="/creights">
              <App />
          </Router>
      </GameEngineProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
