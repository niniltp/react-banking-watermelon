import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import cards from './data/cards';
import payins from './data/payins';
import payouts from './data/payouts';
import transfers from './data/transfers';
import users from './data/users';
import wallets from './data/wallets';
import SignIn from './Form/SignIn.js';
import SignUp from './Form/SignUp.js';
import PwdForgot from './Form/PwdForgot.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      running:false,
      email : '',
      password : '' ,
      card : [],
      payin : [],
      payout : [],
      transfer : [],
      user : [],
      wallet : []
    };
  }
  componentDidMount(){
    //this fonction fires after the initial render  
    //Set the database in localStorage
    localStorage.clear();
    localStorage.setItem("cards", JSON.stringify(cards));
    localStorage.setItem("payins",JSON.stringify(payins));
    localStorage.setItem("payouts",JSON.stringify(payouts));
    localStorage.setItem("transfers",JSON.stringify(transfers));
    localStorage.setItem("users",JSON.stringify(users));
    localStorage.setItem("wallets",JSON.stringify(wallets));
    
    
    const A  = JSON.parse(localStorage.getItem("cards"));/*
    const B  = localStorage.getItem('payins');
    const payout  = localStorage.getItem("payouts");
    const transfer  = localStorage.getItem("transfers");
    const user  = localStorage.getItem("users");
    const wallet  = localStorage.getItem("wallets");*/

    console.log(this.state.card);
    this.setState({
      card : this.state.card.concat(A)/*,
      payin : this.state.payin.concat(JSON.parse(localStorage.getItem("payins"))),
      payout : this.state.payout.concat(JSON.parse(localStorage.getItem("payouts"))),
      transfer : this.state.transfer.concat(JSON.parse(localStorage.getItem("transfers"))),
      user : this.state.user.concat(this.state.card.concat(JSON.parse(localStorage.getItem("users"))),
      wallet : this.state.wallet.concat(JSON.parse(localStorage.getItem("wallets")))*/
    });

    console.log(this.state.card);
    console.log(A);
    console.log("hello");
    console.log(Array.isArray(this.state.card));
    console.log(Array.isArray(A));
/*
    const people = JSON.parse(localStorage.getItem("cards"));
    console.log(people);
    console.log(people[0]);*/
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
