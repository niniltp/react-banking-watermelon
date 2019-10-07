import  React, { Component } from 'react';
import wallets from '../data/wallets';

class Wallet extends Component {
    constructor(props){
        super(props);
        this.getWalletUser(1);
    }

    getWalletUser(user_id){
        const wallet = wallets.find( w => w.user_id === user_id);
        console.log(wallet);
        return wallet;
    }

    render() {
        return (
            <div>
                Wallet...
            </div>
        );
    }
}

export default Wallet;