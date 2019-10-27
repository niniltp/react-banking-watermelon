import React, {Component} from 'react';
import {getPayinsByWalletId} from "../../../backend/payins_backend";
import {getWalletByUserID, getWallets} from "../../../backend/wallets_backend";
import {Button, ButtonGroup} from "reactstrap";
import {getPayoutsByWalletId} from "../../../backend/payouts_backend";
import SimpleActivity from "../fundsMng/SimpleActivity";
import {getTransfersByCreditedWalletId, getTransfersByDebitedWalletId} from "../../../backend/transfers_backend";
import {Link} from "react-router-dom";
import {generateID} from "../../../services/idsGeneartor";
import Searchbar from "../../Searchbar/Searchbar";
import {getUsers} from "../../../backend/users_backend";

class Activities extends Component {
    constructor(props) {
        super(props);

        this.state = {
            wallets: getWallets(),
            isFetching: true,
            activities: [],
            users: getUsers(),
            filters: ["payins", "payouts", "transfers"]
        };
    }

    componentDidMount = () => {
        this.setState({isFetching: true});
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
        let payins = [], payouts = [], transfers = [], transfersIn = [], transfersOut = [];
        let activities;

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
                        let uniqueTransfersIn = [], uniqueTransfersOut = [];
                        transfersIn = getTransfersByCreditedWalletId(walletID);
                        transfersOut = getTransfersByDebitedWalletId(walletID);

                        uniqueTransfersIn = transfersIn.filter((transferIn) => {
                            return transfers.findIndex((transfer) => {
                                return transferIn.id === transfer.id;
                            }) <= -1;
                        });

                        uniqueTransfersOut = transfersOut.filter((transferOut) => {
                            return transfers.findIndex((transfer) => {
                                return transferOut.id === transfer.id;
                            }) <= -1;
                        });

                        uniqueTransfersIn.forEach((transferIn) => {
                            uniqueTransfersOut = uniqueTransfersOut.filter((transferOut) => {
                                return transferIn.id !== transferOut.id;
                            });
                        });


                        uniqueTransfersOut.forEach((transferOut) => {
                            uniqueTransfersIn = transfersIn.filter((transferIn) => {
                                return transferIn.id !== transferOut.id;
                            });
                        });

                        transfers = transfers.concat(uniqueTransfersIn).concat(uniqueTransfersOut).map((transfer) => {
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

    convertUsersForSearchbar = (users) => {
        const usersForSearchbar = [];

        users.forEach((user) => {
            usersForSearchbar.push({
                id: user.id,
                value: user.first_name + " " + user.last_name
            })
        });

        return usersForSearchbar;
    };

    handleSearchResults = (resultsID) => {
        const wallets = [];

        resultsID.forEach((resultID) => {
            wallets.push(getWalletByUserID(resultID));
        });

        this.setState({
            wallets: wallets
        }, () => {
            this.fetchData();
        });
    };

    displayActivities = () => {
        return (
            <div id="boxesList">
                <Searchbar autoFocus={true}
                           items={this.convertUsersForSearchbar(this.state.users)}
                           searchResults={this.handleSearchResults}/>
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