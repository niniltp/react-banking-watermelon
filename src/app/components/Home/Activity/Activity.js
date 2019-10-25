import React, {Component} from 'react';
import {getUserIDAuth} from "../../../services/authenticationManager";
import {getPayinsByWalletId} from "../../../backend/payins_backend";
import {getWalletByUserId} from "../../../backend/wallets_backend";
import {getTransfersByCreditedWalletId, getTransfersByDebitedWalletId} from "../../../backend/transfers_backend";
import {Button} from "reactstrap";

class Activity extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userID: getUserIDAuth(),
            walletID: "",
            isFetching: true,
            activities: []
        };
    }

    componentDidMount = () => {
        this.fetchData();
    };

    fetchData = () => {
        let payins, payouts, transfersIn, transfersOut;
        this.setState({isFetching: true});
        this.setState((prevState) => ({
            walletID: getWalletByUserId(prevState.userID)
        }), () => {
            payins = getPayinsByWalletId(this.state.walletID);
            payouts = getPayinsByWalletId(this.state.walletID);
            transfersIn = getTransfersByCreditedWalletId(this.state.walletID);
            transfersOut = getTransfersByDebitedWalletId(this.state.walletID);
            this.setState({
                isFetching: false
            })
        });

        /*        this.setState({activities: this.buildActivitiesArray(payins, payouts, transfersIn, transfersOut)}, () => {
                    this.setState({isFetching: false});
                });*/
    };

    buildActivitiesArray = (payins, payouts, transfersIn, transfersOut) => {
        let activities = payins.concat(payouts).concat(transfersIn).concat(transfersOut);
        console.log(activities);
        return activities;
    };

    render = () => {
        return (
            <div className="container-in">
                <div id="boxesContainer">
                    <h3>My activity</h3>
                    <div id="boxesList">
                        {this.state.isFetching ? <p>Fetching data...</p> :
                            <div>
                                <Button>Withdrawals</Button>
                                <Button>Deposits</Button>
                                <Button>Transfers</Button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Activity;