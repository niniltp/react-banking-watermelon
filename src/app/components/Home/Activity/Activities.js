import React, {Component} from 'react';
import {getPayinsByWalletId} from "../../../backend/payins_backend";
import {getWallets} from "../../../backend/wallets_backend";
import {Button, ButtonGroup} from "reactstrap";
import {getPayoutsByWalletId} from "../../../backend/payouts_backend";
import SimpleActivity from "../fundsMng/SimpleActivity";
import {getTransfersByCreditedWalletId} from "../../../backend/transfers_backend";
import {Link} from "react-router-dom";
import {generateID} from "../../../services/idsGeneartor";

class Activities extends Component {
    constructor(props) {
        super(props);

        this.state = {
            wallets: getWallets(),
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
        const wallets = this.state.wallets;
        let payins = [], payouts = [], transfers = [];
        let activities;

        this.setState({isFetching: true});
        wallets.forEach((wallet) => {
            const walletID = wallet.id;
            filters.forEach((filter) => {
                switch (filter) {
                    case "payins": {
                        payins = payins.concat(getPayinsByWalletId(walletID));
                        break;
                    }
                    case "payouts": {
                        payouts = payouts.concat(getPayoutsByWalletId(walletID));
                        break;
                    }
                    case "transfers": {
                        transfers = transfers.concat(getTransfersByCreditedWalletId(walletID));

                        transfers = transfers.map((transfer) => {
                            return {
                                ...transfer,
                                way: ""
                            }
                        });
                        break;
                    }
                    default:
                        break;
                }
            });
        });

        activities = payins.concat(payouts).concat(transfers);

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
                    <SimpleActivity key={generateID() + activity.id.toString()} index={index} data={activity}/>))}
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
                <Link to="/account"><Button color="primary" className="boxForm-btn">Go back</Button></Link>
            </div>
        );
    }
}

export default Activities;