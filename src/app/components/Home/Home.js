import  React, { Component } from 'react';
import {Route} from "react-router-dom";
import Wallet from './Wallet/Wallet.js';
import Cards from './Cards/Cards.js';
import Menu from './Menu/Menu';
import './Home.css';

class Home extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="container" id="home">
                <Wallet user_id={1}/>
                <h1>Hi</h1>
                <Menu/>
                <Route path="/cards" component={Cards}/>
            </div>
        );
    }
}

export default Home;