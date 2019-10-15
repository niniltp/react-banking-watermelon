import  React, { Component } from 'react';
import './Wallet.css';
import {getWalletByUserId} from "../../../backend/wallets_backend";

class Wallet extends Component {
    constructor(props){
        super(props);

        this.state = {
            wallet: getWalletByUserId(this.props.user_id)
        };
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