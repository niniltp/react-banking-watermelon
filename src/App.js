import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import cards from './database/cards';
import payins from './database/payins';
import payouts from './database/payouts';
import transfers from './database/transfers';
import users from './database/users';
import wallets from './database/wallets';

import SignIn from './app/components/Form/SignIn.js';
import SignUp from './app/components/Form/SignUp.js';
import PwdForgot from './app/components/Form/PwdForgot.js';
import Account from "./app/components/Form/Account.js";

import { ProtectedRoute } from './ProtectedRoute';
import {setDataInLS} from "./app/services/localStorageManager.js";
import {disconnectUser} from "./app/services/authenticationManager.js";

//Code written by CHEONG Loïc

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      email : '',
      password : ''
    };
  }


  componentDidMount(){
    //this fonction fires after the initial render  
    //Set the database in localStorage
    localStorage.clear();
    setDataInLS("cards", cards);
    setDataInLS("payins",payins);
    setDataInLS("payouts",payouts);
    setDataInLS("transfers",transfers);
    setDataInLS("users",users);
    setDataInLS("wallets",wallets);
    disconnectUser();
    //localStorage.setItem("isAuth",false);
    localStorage.setItem("UserID",null);
  }

  render(){
    return(
      <div className="App">
        <header className="App-header">
          <BrowserRouter>
              <Switch>
                <Route exact path="/"  component={SignIn}></Route>
                <Route path="/signUp" component={SignUp}></Route>
                <Route path="/pwdForgot" component={PwdForgot}></Route> 
                <ProtectedRoute path="/Account" component={Account}></ProtectedRoute>
                <Route path="*" component={()=> "ERROR 404 PAGE NOT FOUND" }></Route>
              
              </Switch>
          </BrowserRouter>
        </header>
      </div>
    );
  }
}

export default App;
