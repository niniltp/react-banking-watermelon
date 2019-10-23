import React, {Component} from 'react';
import {Route} from "react-router-dom";
import Wallet from './Wallet/Wallet.js';
import Cards from './Cards/Cards.js';
import Menu from './Menu/Menu';
import Withdraw from "./fundsMng/Withdraw";
import './Home.css';
import {getUserIDAuth} from "../../services/authenticationManager";
import {getWalletByUserId} from "../../backend/wallets_backend";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            isFetchingWallet: true,
            user_id: getUserIDAuth(),
            wallet: {}
        });
    }

    componentDidMount() {
        this.refreshData();
    }

    refreshData = () => {
        this.setState({isFetchingWallet: true});
        this.fetchData();
        this.setState({isFetchingWallet: false});
    };

    fetchData = () => {
        this.setState({
            wallet: getWalletByUserId(this.state.user_id)
        });
    };

    handleUpdateWallet = () => {
        this.refreshData();
    };

    render() {
        return (
            <div className="container" id="home">
                <Wallet wallet={this.state.wallet} isFetching={this.state.isFetchingWallet}/>
                <h1>Hi</h1>
                <Route exact path="/account" component={Menu}/>
                <Route path="/cards" component={Cards}/>
                <Route path="/withdraw"
                       render={(props) => <Withdraw {...props} updateWallet={this.handleUpdateWallet}/>}/>
            </div>
        );
    }
}

export default Home;