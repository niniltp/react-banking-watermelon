import React, {Component} from 'react';
import {getUserIDAuth} from "../../../services/authenticationManager";
import {getCardsByUserId} from "../../../backend/cards_backend";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {Link} from "react-router-dom";
import './fundsMngForm.css';
import {isFundSufficient, isInputAmountValid, isWithdrawValid, makeWithdraw} from "../../../services/fundsManager";
import {getWalletByUserID} from "../../../backend/wallets_backend";
import BoxToSelect from "../Boxes/BoxToSelect";
import SimpleCard from "../Cards/SimpleCard";
import {generateID} from "../../../services/idsGeneartor";

class Withdraw extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userID: getUserIDAuth(),
            isFetching: true,
            cards: [],
            payout: {
                id: "",
                walletDebited: {},
                amount: 0
            },
            selectedCardIndex: null,
            withdrawConfirmed: false,
            errors: {}
        };
    }

    componentDidMount = () => {
        this.fetchData();
    };

    fetchData = () => {
        this.setState({isFetching: true});
        this.setState((prevState) => ({
                cards: getCardsByUserId(prevState.userID),
                payout: {
                    id: "",
                    walletDebited: getWalletByUserID(prevState.userID),
                    amount: 0
                }
            }
        ), () => {
            this.setState({isFetching: false});
        });
    };

    isValid = (payout, card) => {
        return isWithdrawValid(payout, card);
    };

    confirmWithdraw = () => {
        this.setState({
            withdrawConfirmed: true
        });
    };

    /**
     This function handles the change in the amount input of the form.
     * It also prevents non valid inputs
     * @param event
     */
    handleChange = (event) => {
        const target = event.target;
        const value = target.value;

        if (isInputAmountValid(value)) {
            this.setState(prevState => ({
                payout: {
                    ...prevState.payout,
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
        this.setState(() => ({
            selectedCardIndex: index
        }));
    };

    /**
     * This function handles the submit of the form
     * @param event
     */
    handleSubmit = (event) => {
        this.validateForm(this.state.payout, this.state.selectedCardIndex);

        if (this.state.selectedCardIndex !== null) {
            const wallet = getWalletByUserID(this.state.userID);
            const card = this.state.cards[this.state.selectedCardIndex];
            const amount = this.state.payout.amount;

            const payout = {
                id: generateID(),
                walletDebited: wallet,
                amount: parseFloat(parseFloat(amount).toFixed(2))
            };

            if (this.isValid(payout, card)) {
                makeWithdraw(payout);
                this.props.updateWallet();
                this.confirmWithdraw();
                console.log(`withdraw of ${amount}₩M from wallet (id: ${wallet.id}) to card (id: ${card.id})`);
            }
        }

        event.preventDefault();
    };

    /**
     * This function checks if the inputs of the form are valid are not
     * Display error messages if the input isn't valid
     * @param payout : object which we want to check the input
     * @param selectedCardIndex : index of the card selected
     */
    validateForm = (payout, selectedCardIndex) => {
        this.setState({
            errors: {
                amountEmpty: payout.amount === 0 || payout.amount === "" || payout.amount === null ? "The amount is required" : false,
                amountNegative: payout.amount < 0 ? "The amount must be positive" : false,
                fundInsufficient: payout.amount < 0 || isFundSufficient(payout.walletDebited, payout.amount) ? false : "Not enough fund",
                cardNotSelected: selectedCardIndex === null ? "A card must be selected" : false
            }
        });
    };

    displayWithdrawForm = () => {
        const errors = this.state.errors;
        return (
            <div className="container-in">
                <div className={"fundsMng-title"}>
                    <h3>How much do you want to withdraw from your wallet ?</h3>
                </div>
                <Form>
                    <FormGroup row className={"fundsMng-formGroup"}>
                        <Input type="number" min="0" max="999999999999" id="amount"
                               className="boxForm-input amount-input"
                               name="amount" value={this.state.payout.amount} onChange={this.handleChange}/>
                        <Label for="amount" className="amount-label">₩M</Label>
                    </FormGroup>
                    <div id="boxesContainer">
                        <h3>Choose your card</h3>
                        <div id="boxesList">
                            {this.state.isFetching ? <p>Fetching data...</p> : this.state.cards.map((card, index) => (
                                <BoxToSelect key={index} index={index} container={SimpleCard}
                                             classNames="box" data={card}
                                             selectedIndex={this.state.selectedCardIndex}
                                             handleSelect={this.handleSelect}/>
                            ))}
                        </div>
                    </div>
                    <div>
                        {errors.amountNegative ?
                            <p className="error-input medium">{errors.amountNegative}</p> : null}
                        {errors.fundInsufficient ?
                            <p className="error-input medium">{errors.fundInsufficient}</p> : null}
                        {errors.amountEmpty ?
                            <p className="error-input medium">{errors.amountEmpty}</p> : null}
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

    displayWithdrawConfirmed = () => {
        return (
            <div>
                <p><strong>{(parseFloat(this.state.payout.amount)).toFixed(2)}</strong>₩M has been successfully
                    withdrawn from
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
            this.state.withdrawConfirmed ? this.displayWithdrawConfirmed() : this.displayWithdrawForm()
        );
    };
}

export default Withdraw;