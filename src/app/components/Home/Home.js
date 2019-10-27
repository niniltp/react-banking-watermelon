import React, {Component} from 'react';
import {Route} from "react-router-dom";
import Wallet from './Wallet/Wallet.js';
import Cards from './Cards/Cards.js';
import Menu from './Menu/Menu';
import Withdraw from "./fundsMng/Withdraw";
import Settings from "./Settings/Settings.js";
import Deposit from "./fundsMng/Deposit";
import Transfer from "./fundsMng/Transfer";
import './Home.css';
import {getUserIDAuth} from "../../services/authenticationManager";
import {getWalletByUserID} from "../../backend/wallets_backend";
import {getUserByID} from "../../backend/users_backend";
import Activity from "./Activity/Activity";
import AddAdminForm from '../Form/AddAdminForm';
import Users from "./Users/Users";
import { ProtectedRouteAdmin } from '../ProtectedRouteAdmin';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            isFetchingWallet: true,
            userID: getUserIDAuth(),
            wallet: {}
        });
    }

    componentDidMount() {
        this.refreshData();
    }

    refreshData = () => {
        this.fetchData();
    };

    fetchData = () => {
        this.setState({isFetchingWallet: true});
        this.setState({
            wallet: getWalletByUserID(this.state.userID)
        }, () => {
            this.setState({isFetchingWallet: false});
        });
    };

    handleUpdateWallet = () => {
        this.refreshData();
    };

    render() {
        const user = getUserByID(this.state.userID);
        return (
            <div className="container" id="home">
                <Wallet wallet={this.state.wallet} isFetching={this.state.isFetchingWallet}/>
                <h1>Hi, {user.first_name} {user.last_name}</h1>
                <Route exact path="/account" component={Menu}/>
                <ProtectedRouteAdmin path="/users" component={Users}/>
                <Route path="/settings" component={Settings}/>
                <ProtectedRouteAdmin path="/addAdmin" component={AddAdminForm}/>
                <Route path="/cards" component={Cards}/>
                <Route path="/activity" component={Activity}/>
                <Route path="/withdraw"
                       render={(props) => <Withdraw {...props} updateWallet={this.handleUpdateWallet}/>}/>
                <Route path="/deposit"
                       render={(props) => <Deposit {...props} updateWallet={this.handleUpdateWallet}/>}/>
                <Route path="/transfer"
                       render={(props) => <Transfer {...props} updateWallet={this.handleUpdateWallet}/>}/>
            </div>
        );
    }
}

export default Home;