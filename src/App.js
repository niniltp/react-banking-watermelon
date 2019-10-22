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
import SignIn from './Form/SignIn.js';
import SignUp from './Form/SignUp.js';
import PwdForgot from './Form/PwdForgot.js';

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
    //this function fires after the initial render  
    //Set the database in localStorage
    localStorage.clear();
    localStorage.setItem("cards", JSON.stringify(cards));
    localStorage.setItem("payins",JSON.stringify(payins));
    localStorage.setItem("payouts",JSON.stringify(payouts));
    localStorage.setItem("transfers",JSON.stringify(transfers));
    localStorage.setItem("users",JSON.stringify(users));
    localStorage.setItem("wallets",JSON.stringify(wallets));
    localStorage.setItem("isAuth",false);
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
              </Switch>
          </BrowserRouter>
        </header>
      </div>
    );
  }
}

export default App;
