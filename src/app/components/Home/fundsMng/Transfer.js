import React, {Component} from 'react';
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {Link} from "react-router-dom";
import './fundsMngForm.css';
import {getUserIDAuth} from "../../../services/authenticationManager";
import {isFundSufficient, isInputAmountValid, isTransferValid, makeTransfer} from "../../../services/fundsManager";
import {getUsersExcept} from "../../../backend/users_backend";
import SimpleUser from "../Users/SimpleUser";
import BoxToSelect from "../Boxes/BoxToSelect";
import {getWalletByUserID} from "../../../backend/wallets_backend";
import {generateID} from "../../../services/idsGeneartor";

class Transfer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userID: getUserIDAuth(),
            isFetching: true,
            users: [],
            transfer: {
                id: "",
                walletDebited: {},
                walletCredited: {},
                amount: 0
            },
            selectedUserIndex: null,
            transferConfirmed: false,
            errors: {}
        };
    }

    componentDidMount = () => {
        this.fetchData();
    };

    fetchData = () => {
        this.setState({isFetching: true});
        this.setState((prevState) => ({
            users: getUsersExcept(this.state.userID),
            transfer: {
                id: "",
                walletDebited: getWalletByUserID(prevState.userID),
                walletCredited: {},
                amount: 0
            }
        }), () => {
            this.setState({isFetching: false});
        });
    };

    isValid = (transfer) => {
        return isTransferValid(transfer);
    };

    confirmTransfer = () => {
        this.setState({
            transferConfirmed: true
        });
    };

    /**
     * This function handles the change in the amount input of the form.
     * It also prevents non valid inputs
     * @param event
     */
    handleChange = (event) => {
        const target = event.target;
        const value = target.value;

        if (isInputAmountValid(value)) {
            this.setState(prevState => ({
                transfer: {
                    ...prevState.transfer,
                    amount: value
                }
            }));
        }
    };

    /**
     * This function handles the selection of a user
     * @param index : index of the user
     */
    handleSelect = (index) => {
        this.setState({
            selectedUserIndex: index
        });
    };

    /**
     * This function handles the submit of the form
     * @param event
     */
    handleSubmit = (event) => {
        this.validateForm(this.state.transfer, this.state.selectedUserIndex);

        if (this.state.selectedUserIndex !== null) {
            const userCredited = this.state.users[this.state.selectedUserIndex];
            const walletCredited = getWalletByUserID(userCredited.id);
            const walletDebited = getWalletByUserID(this.state.userID);
            const amount = this.state.transfer.amount;

            const transfer = {
                id: generateID(),
                walletDebited: walletDebited,
                walletCredited: walletCredited,
                amount: parseFloat(parseFloat(amount).toFixed(2))
            };

            if (this.isValid(transfer)) {
                makeTransfer(transfer);
                this.confirmTransfer();
                this.props.updateWallet();
                console.log(`transfer of ${amount}₩M from wallet (id: ${walletDebited.id}) to wallet (id: ${walletCredited.id})`);
            }
        }

        event.preventDefault();
    };

    /**
     * This function checks if the inputs of the form are valid are not
     * Display error messages if the input isn't valid
     * @param transfer : object which we want to check the input
     * @param selectedUserIndex : index of the user selected
     */
    validateForm = (transfer, selectedUserIndex) => {
        this.setState({
            errors: {
                amountEmpty: transfer.amount === 0 || transfer.amount === "" || transfer.amount === null ? "The amount is required" : false,
                amountNegative: transfer.amount < 0 ? "The amount must be positive" : false,
                fundInsufficient: transfer.amount < 0 || isFundSufficient(transfer.walletDebited, transfer.amount) ? false : "Not enough fund",
                cardNotSelected: selectedUserIndex === null ? "A user must be selected" : false
            }
        });
    };

    displayTransferForm = () => {
        const errors = this.state.errors;
        return (
            <div className="container-in">
                <div className={"fundsMng-title"}>
                    <h3>How much do you want to transfer from your wallet ?</h3>
                </div>
                <Form>
                    <FormGroup row className={"fundsMng-formGroup"}>
                        <Input type="number" min="0" max="999999999999" id="amount"
                               className="boxForm-input amount-input"
                               name="amount" value={this.state.transfer.amount} onChange={this.handleChange}/>
                        <Label for="amount" className="amount-label">₩M</Label>
                    </FormGroup>
                    <div id="boxesContainer">
                        <h3>Choose who you want to transfer money to</h3>
                        <div id="boxesList">
                            {this.state.isFetching ? <p>Fetching data...</p> : this.state.users.map((user, index) => (
                                <BoxToSelect key={index} index={index} container={SimpleUser} classNames={"box"}
                                             data={user}
                                             selectedIndex={this.state.selectedUserIndex}
                                             handleSelect={this.handleSelect}/>))}
                        </div>
                    </div>
                    {errors.amountNegative ?
                        <p className="error-input medium">{errors.amountNegative}</p> : null}
                    {errors.fundInsufficient ?
                        <p className="error-input medium">{errors.fundInsufficient}</p> : null}
                    {errors.amountEmpty ?
                        <p className="error-input medium">{errors.amountEmpty}</p> : null}
                    {errors.cardNotSelected ?
                        <p className="error-input medium">{errors.cardNotSelected}</p> : null}
                    <FormGroup check className="box-formGroup reset-margin" row>
                        <Button color="success" className="boxForm-btn"
                                onClick={this.handleSubmit}>Confirm</Button>
                        <Link to="/account"><Button color="danger"
                                                    className="boxForm-btn">Cancel</Button></Link>
                    </FormGroup>
                </Form>
            </div>
        );
    };

    displayTransferConfirmed = () => {
        return (
            <div>
                <p><strong>{(parseFloat(this.state.transfer.amount)).toFixed(2)}</strong>₩M has been successfully
                    transfered from
                    your wallet to the wallet of !</p>
                {this.state.selectedCardIndex !== null ?
                    <SimpleUser data={this.state.users[this.state.selectedUserIndex]} classNames={"box"}/>
                    : null}
                <Link to="/account"><Button color="primary" className="boxForm-btn">Go back</Button></Link>
            </div>
        );
    };

    render = () => {
        return (
            this.state.transferConfirmed ? this.displayTransferConfirmed() : this.displayTransferForm()
        );
    };
}

export default Transfer;