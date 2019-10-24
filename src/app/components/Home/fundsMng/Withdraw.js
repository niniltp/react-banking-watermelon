import React, {Component} from 'react';
import {getUserIDAuth} from "../../../services/authenticationManager";
import {getCardsByUserId} from "../../../backend/cards_backend";
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
import {Link} from "react-router-dom";
import './fundsMngForm.css';
import {isWithdrawValid, makeWithdraw} from "../../../services/fundsManager";
import {getWalletByUserId} from "../../../backend/wallets_backend";
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
            withdrawConfirmed: false
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

    isValid = (payout, card) => {
        return isWithdrawValid(payout, card);
    };

    confirmWithdraw = () => {
        this.setState({
            withdrawConfirmed: true
        });
    };

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;

        this.setState(prevState => ({
            payout: {
                ...prevState.payout,
                amount: value
            }
        }));
    };

    handleSelect = (index) => {
        this.setState({
            selectedCardIndex: index
        });
    };

    handleSubmit = (event) => {
        if (this.state.selectedCardIndex !== null) {
            const wallet = getWalletByUserId(this.state.userID);
            const card = this.state.cards[this.state.selectedCardIndex];
            const amount = this.state.payout.amount;

            const payout = {
                id: generateID("payout"),
                walletDebited: wallet,
                amount: parseFloat(parseFloat(amount).toFixed(2))
            };

            if (this.isValid(payout, card)) {
                makeWithdraw(payout);
                this.props.updateWallet();
                this.confirmWithdraw();
                console.log(`make withdraw of ${amount}₩M from wallet (id: ${wallet.id}) to card (id: ${card.id})`);
            }
        }

        event.preventDefault();
    };

    displayWithdrawForm = () => {
        return (
            <div className="container-in">
                <div className={"fundsMng-title"}>
                    <h3>How much do you want to withdraw from your wallet ?</h3>
                </div>
                <Form>
                    <FormGroup row className={"fundsMng-formGroup"}>
                        <Input type="number" min="0" max="999999999999" id="amount"
                               className="creditCardForm-input amount-input"
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
                    <FormGroup check className="box-formGroup reset-margin" row>
                        <Col>
                            <Button color="success" className="boxForm-btn"
                                    onClick={this.handleSubmit}>Confirm</Button>
                            <Link to="/account"><Button color="danger"
                                                        className="boxForm-btn">Cancel</Button></Link>
                        </Col>
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