import  React, { Component } from 'react';
import './Wallet.css';
import wallets from '../../data/wallets';

class Wallet extends Component {
    constructor(props){
        super(props);

        this.state = {
            wallet: this.getWalletUser(props.user_id)
        };
    }

    getWalletUser(user_id){
        const wallet = wallets.find( w => w.user_id === user_id);
        console.log(wallet);
        return wallet;
    }

    render() {
        return (
            <div id="wallet">
                <h3>Wallet</h3>
                <span>{this.state.wallet.balance} ₩M</span>
            </div>
        );
    }
}

export default Wallet;