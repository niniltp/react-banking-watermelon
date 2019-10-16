import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import users from './data/users';
import Form from './Form/Form.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={running:false,
                email : '',
                password : ''
    };
  }
  
  

  render(){
    return(
      <div className="App">
        <header className="App-header">
          <Form />
        </header>
      </div>
    );

  }

}

export default App;

