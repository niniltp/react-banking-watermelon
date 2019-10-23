import React, {Component} from 'react';
import {Route} from "react-router-dom";
import Wallet from './Wallet/Wallet.js';
import Cards from './Cards/Cards.js';
import Menu from './Menu/Menu';
import Withdraw from "./fundsMng/Withdraw";
import './Home.css';
import {getUserIDAuth} from "../../services/authenticationManager";

class Home extends Component {
    render() {
        return (
            <div className="container" id="home">
                <Wallet user_id={getUserIDAuth()}/>
                <h1>Hi</h1>
                <Route exact path="/account" component={Menu}/>
                <Route path="/cards" component={Cards}/>
                <Route path="/withdraw" component={Withdraw}/>
            </div>
        );
    }
}

export default Home;