import  React, { Component } from 'react';
import Wallet from './Wallet/Wallet.js'
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

            </div>
        );
    }
}

export default Home;