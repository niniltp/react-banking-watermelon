import React, {Component} from 'react';
import {getUserIDAuth} from "../../../services/authenticationManager";
import {getPayinsByWalletId} from "../../../backend/payins_backend";
import {getWalletByUserID} from "../../../backend/wallets_backend";
import {Button, ButtonGroup} from "reactstrap";
import {getPayoutsByWalletId} from "../../../backend/payouts_backend";
import SimpleActivity from "../fundsMng/SimpleActivity";
import {getTransfersByCreditedWalletId, getTransfersByDebitedWalletId} from "../../../backend/transfers_backend";

class Activity extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userID: getUserIDAuth(),
            walletID: getWalletByUserID(getUserIDAuth()).id,
            isFetching: true,
            activities: [],
            filters: ["payins", "payouts", "transfers"]
        };
    }

    componentDidMount = () => {
        this.fetchData();
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.filters.length !== this.state.filters.length) {
            this.fetchData();
        }
    }

    fetchData = () => {
        const filters = this.state.filters;
        let payins = [], payouts = [], transfersIn = [], transfersOut = [];
        let activities;

        this.setState({isFetching: true});
        filters.forEach((filter) => {
            switch (filter) {
                case "payins": {
                    payins = getPayinsByWalletId(this.state.walletID);
                    break;
                }
                case "payouts": {
                    payouts = getPayoutsByWalletId(this.state.walletID);
                    break;
                }
                case "transfers": {
                    transfersIn = getTransfersByCreditedWalletId(this.state.walletID);
                    transfersOut = getTransfersByDebitedWalletId(this.state.walletID);

                    transfersIn = transfersIn.map((transfer) => {
                        return {
                            ...transfer,
                            way: "in"
                        }
                    });

                    transfersOut = transfersOut.map((transfer) => {
                        return {
                            ...transfer,
                            way: "out"
                        }
                    });
                    break;
                }
                default:
                    break;
            }
        });

        activities = payins.concat(payouts).concat(transfersIn).concat(transfersOut);

        this.setState({
            activities: activities
        }, () => {
            this.setState({
                isFetching: false
            })
        });
    };

    addFilter = (filter) => {
        const newFilters = this.state.filters.concat(filter);
        this.setState({
            filters: newFilters
        });
    };

    removeFilter = (filter) => {
        const newFilters = this.state.filters.filter((f) => {
            return f !== filter;
        });

        this.setState({
            filters: newFilters
        });
    };

    isFilterActive = (filter) => {
        return this.state.filters.includes(filter);
    };

    handleClickFilter = (filter) => {
        const filters = this.state.filters;
        const index = filters.indexOf(filter);

        if (index < 0) {
            this.addFilter(filter);
        } else {
            this.removeFilter(filter);
        }
    };

    displayActivities = () => {
        return (
            <div id="boxesList">
                {this.state.isFetching ? <p>Fetching data...</p> : this.state.activities.map((activity, index) => (
                    <SimpleActivity key={index} data={activity}/>))}
            </div>
        );
    };

    render = () => {
        return (
            <div className="container-in">
                <div id="boxesContainer">
                    <h3>My activity</h3>
                    <ButtonGroup>
                        <Button color="primary" onClick={() => this.handleClickFilter("payins")}
                                active={this.isFilterActive("payins")}>Deposits</Button>
                        <Button color="primary" onClick={() => this.handleClickFilter("payouts")}
                                active={this.isFilterActive("payouts")}>Withdrawals</Button>
                        <Button color="primary" onClick={() => this.handleClickFilter("transfers")}
                                active={this.isFilterActive("transfers")}>Transfers</Button>
                    </ButtonGroup>
                    {this.state.isFetching ? <p>Fetching data...</p> : this.displayActivities()}
                </div>
            </div>
        );
    }
}

export default Activity;