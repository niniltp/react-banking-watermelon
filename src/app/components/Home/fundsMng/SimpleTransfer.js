import React, {Component} from 'react';
import '../Boxes/Boxes.css';
import './Activities.css';
import {getUserByWalletID} from "../../../backend/users_backend";
import {convertToWM} from "../../../services/fundsManager";

class SimpleTransfer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFetching: true,
            walletDebitedID: this.props.data.debited_wallet_id,
            walletCreditedID: this.props.data.credited_wallet_id,
            way: this.props.data.way,
            userDebited: {},
            userCredited: {},
            amount: this.props.data.amount
        };
    }

    componentDidMount() {
        this.setState({
            isFetching: true
        });
        this.fetchData();
    }

    fetchData = () => {
        this.setState((prevState) => ({
            userDebited: getUserByWalletID(prevState.walletDebitedID),
            userCredited: getUserByWalletID(prevState.walletCreditedID),
        }), () => {
            this.setState({
                isFetching: false
            })
        });
    };

    displayActivity = () => {
        const userDebited = this.state.userDebited;
        const userCredited = this.state.userCredited;
        const way = this.state.way;
        const amountWM = convertToWM(this.state.amount);
        return (
            this.state.isFetching ? <p>Fetching data...</p> :
                <ul>
                    <li><span className="labelInfoBox">Type: </span>Transfer</li>
                    <li><span className="labelInfoBox">From: </span>{userDebited.first_name} {userDebited.last_name}
                    </li>
                    <li><span className="labelInfoBox">To: </span>{userCredited.first_name} {userCredited.last_name}
                    </li>
                    {way === "in" ? <li className="labelInfoBox amount credited">+ {amountWM} ₩M</li> : null}
                    {way === "out" ? <li className="labelInfoBox amount debited">- {amountWM} ₩M</li> : null}
                    {way === "" ? <li className="labelInfoBox amount"> {amountWM} ₩M</li> : null}

                </ul>
        )
    };

    render() {
        return (
            this.displayActivity()
        );
    }
}

export default SimpleTransfer;