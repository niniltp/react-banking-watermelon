import React, {Component} from 'react';
import './Wallet.css';
import {getWalletByUserId} from "../../../backend/wallets_backend";

class Wallet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFetching: true
        };
    }

    componentDidMount() {
        this.setState({isFetching: true});
        this.fetchData();
        this.setState({isFetching: false});
    }

    fetchData = () => {
        this.setState({
            wallet: getWalletByUserId(this.props.user_id)
        });
        console.log(this.state.wallet);
    };

    render() {
        return (
            <div className="container-in">
                <div id="wallet">
                    <h3>Wallet</h3>
                    {this.state.isFetching ? <p>Fetching data...</p> : <span>{this.state.wallet.balance} ₩M</span>}

                </div>
            </div>
        );
    }
}

export default Wallet;