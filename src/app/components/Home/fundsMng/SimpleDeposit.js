import React, {Component} from 'react';
import '../Boxes/Boxes.css';
import './Activities.css';
import {getUserByWalletID} from "../../../backend/users_backend";
import {convertToWM} from "../../../services/fundsManager";

class SimpleDeposit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFetching: true,
            walletID: this.props.data.wallet_id,
            user: {},
            amount: this.props.data.amount
        }
    }

    componentDidMount() {
        this.setState({
            isFetching: true
        });
        this.fetchData();
    }

    fetchData = () => {
        this.setState((prevState) => ({
            user: getUserByWalletID(prevState.walletID),
            isFetching: false
        }));
    };

    displayActivity = () => {
        const user = this.state.user;
        const amountWM = convertToWM(this.state.amount);
        return (
            this.state.isFetching ? <p>Fetching data...</p> :
                <ul>
                    <li><span className="labelInfoBox">Type: </span>Deposit</li>
                    <li><span className="labelInfoBox">From: </span>{user.first_name} {user.last_name}</li>
                    <li className="labelInfoBox amount credited">+ {amountWM} ₩M</li>
                </ul>
        )
    };

    render() {
        return (
            this.displayActivity()
        );
    }
}

export default SimpleDeposit;