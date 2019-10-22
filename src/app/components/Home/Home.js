import  React, { Component } from 'react';
import {Route} from "react-router-dom";
import Wallet from './Wallet/Wallet.js';
import Cards from './Cards/Cards.js';
import Menu from './Menu/Menu';
import './Home.css';

class Home extends Component {
    render() {
        return (
            <div className="container" id="home">
                <Wallet user_id={this.props.user_id}/>
                <h1>Hi</h1>
                <Route exact path="/" component={Menu}/>
                <Route path="/cards" render={() => <Cards user_id={this.props.user_id}/>}/>
            </div>
        );
    }
}

export default Home;