import React, {Component} from 'react';
import './Wallet.css';
import {convertInWM} from "../../../services/fundsManager";

class Wallet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            prevIsFetching: this.props.isFetching,
            prevWallet: this.props.wallet
        };
    }

    static getDerivedStateFromProps(props, state) {
        // Re-run the filter whenever props change
        if (state.prevIsFetching !== props.isFetching || state.prevWallet.balance !== props.wallet.balance) {
            return {
                prevIsFetching: props.isFetching,
                prevWallet: props.wallet
            };
        }
        return null;
    }

    render() {
        return (
            <div className="container-in">
                <div id="wallet">
                    <h3>Wallet</h3>
                    {this.state.prevIsFetching ? <p>Fetching data...</p> : <span>{convertInWM(this.state.prevWallet.balance).toFixed(2)} ₩M</span>}

                </div>
            </div>
        );
    }
}

export default Wallet;