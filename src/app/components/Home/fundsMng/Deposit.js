import React, {Component} from 'react';
import {getUserIDAuth} from "../../../services/authenticationManager";
import {getCardsByUserId} from "../../../backend/cards_backend";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {Link} from "react-router-dom";
import './fundsMngForm.css';
import {getWalletByUserID} from "../../../backend/wallets_backend";
import {isDepositValid, isInputAmountValid, makeDeposit} from "../../../services/fundsManager";
import SimpleCard from "../Cards/SimpleCard";
import BoxToSelect from "../Boxes/BoxToSelect";
import {generateID} from "../../../services/idsGeneartor";

class Deposit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userID: getUserIDAuth(),
            isFetching: true,
            cards: [],
            payin: {
                id: "",
                walletCredited: {},
                amount: 0
            },
            selectedCardIndex: null,
            depositConfirmed: false,
            errors: {}
        };
    }

    componentDidMount = () => {
        this.fetchData();
    };

    fetchData = () => {
        this.setState({isFetching: true});
        this.setState({cards: getCardsByUserId(this.state.userID)}, () => {
            this.setState({isFetching: false});
        });
    };

    isValid = (payin, card) => {
        return isDepositValid(payin, card);
    };

    confirmDeposit = () => {
        this.setState({
            depositConfirmed: true
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
                payin: {
                    ...prevState.payin,
                    amount: value
                }
            }));
        }
    };

    /**
     * This function handles the selection of a card
     * @param index : index of the card
     */
    handleSelect = (index) => {
        this.setState({
            selectedCardIndex: index
        });
    };

    /**
     * This function handles the submit of the form
     * @param event
     */
    handleSubmit = (event) => {
        this.validateForm(this.state.payin, this.state.selectedCardIndex);

        if (this.state.selectedCardIndex !== null) {
            const wallet = getWalletByUserID(this.state.userID);
            const card = this.state.cards[this.state.selectedCardIndex];
            const amount = this.state.payin.amount;

            const payin = {
                id: generateID(),
                walletCredited: wallet,
                amount: parseFloat(parseFloat(amount).toFixed(2))
            };

            if (this.isValid(payin, card)) {
                makeDeposit(payin);
                this.props.updateWallet();
                this.confirmDeposit();
                console.log(`make deposit of ${amount}₩M from card (id: ${card.id}) to wallet(id: ${wallet.id})`);
            }
        }

        event.preventDefault();
    };

    /**
     * This function checks if the inputs of the form are valid are not
     * Display error messages if the input isn't valid
     * @param payin : object which we want to check the input
     * @param selectedCardIndex : index of the card selected
     */
    validateForm = (payin, selectedCardIndex) => {
        this.setState({
            errors: {
                amountEmpty: payin.amount === 0 || payin.amount === "" || payin.amount === null ? "The amount is required" : false,
                amountNegative: payin.amount < 0 ? "The amount must be positive" : false,
                cardNotSelected: selectedCardIndex === null ? "A card must be selected" : false
            }
        });
    };

    displayDepositForm = () => {
        const errors = this.state.errors;

        return (
            <div className="container-in">
                <div className={"fundsMng-title"}>
                    <h3>How much do you want to deposit to your wallet ?</h3>
                </div>
                <Form>
                    <FormGroup row className={"fundsMng-formGroup"}>
                        <Input type="number" min="0" max="999999999999" id="amount"
                               className="boxForm-input amount-input"
                               name="amount" value={this.state.payin.amount} onChange={this.handleChange}/>
                        <Label for="amount" className="amount-label">₩M</Label>
                    </FormGroup>
                    <div id="boxesContainer">
                        <h3>Choose your card</h3>
                        <div id="boxesList">
                            {this.state.isFetching ? <p>Fetching data...</p> : this.state.cards.map((card, index) => (
                                <BoxToSelect key={index} index={index} container={SimpleCard}
                                             classNames="box" data={card}
                                             selectedIndex={this.state.selectedCardIndex}
                                             handleSelect={this.handleSelect}/>))}
                        </div>
                    </div>
                    <div>
                        {errors.amountEmpty ?
                            <p className="error-input medium">{errors.amountEmpty}</p> : null}
                        {errors.amountNegative ?
                            <p className="error-input medium">{errors.amountNegative}</p> : null}
                        {errors.cardNotSelected ?
                            <p className="error-input medium">{errors.cardNotSelected}</p> : null}
                    </div>
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

    displayDepositConfirmed = () => {
        return (
            <div>
                <p><strong>{(parseFloat(this.state.payin.amount)).toFixed(2)}</strong>₩M has been successfully deposited
                    to
                    your card !</p>
                {this.state.selectedCardIndex !== null ?
                    <SimpleCard data={this.state.cards[this.state.selectedCardIndex]}/>
                    : null}
                <Link to="/account"><Button color="primary" className="boxForm-btn">Go back</Button></Link>
            </div>
        );
    };

    render = () => {
        return (
            this.state.depositConfirmed ? this.displayDepositConfirmed() : this.displayDepositForm()
        );
    };
}

export default Deposit;