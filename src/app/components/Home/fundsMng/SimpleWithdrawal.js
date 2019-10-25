import React, {Component} from 'react';
import '../Boxes/Boxes.css';
import {getUserByWalletID} from "../../../backend/users_backend";
import {convertToWM} from "../../../services/fundsManager";

class SimpleWithdrawal extends Component {
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
        }), () => {
            console.log(this.state.user);
        });
    };

    displayActivity = () => {
        const user = this.state.user;
        const amountWM = convertToWM(this.state.amount);
        return (
            this.state.isFetching ? <p>Fetching data...</p> :
                <ul>
                    <li><span className="labelInfoBox">Name: </span>{user.first_name} {user.last_name}</li>
                    <li><span className="labelInfoBox">Amount: </span>{amountWM} ₩M</li>
                </ul>
        )
    };

    render() {
        return (
            this.displayActivity()
        );
    }
}

export default SimpleWithdrawal;