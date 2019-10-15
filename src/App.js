import React from 'react';
import logo from './logo.svg';
import {Route, Link} from "react-router-dom";
import './App.css';
import Home from './app/components/Home/Home.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Link exact to="/"><img src={logo} className="App-logo" alt="logo" /></Link>
          <Route exact path="/" component={Home}/>
      </header>
    </div>
  );
}

export default App;
