import React from 'react';
import logo from './logo.svg';
import {Route, Link} from "react-router-dom";
import './App.css';
import Home from './app/components/Home/Home.js'

//TODO: Home -> change user_id with user auth
function App() {
    localStorage.clear(); //TODO: delete this line ?
    return (
        <div className="App">
            <header className="App-header">
                <Link exact to="/"><img src={logo} className="App-logo" alt="logo"/></Link>
            </header>
            <Route path="/" render={() => <Home user_id={2}/>}/>
        </div>
    );
}

export default App;
