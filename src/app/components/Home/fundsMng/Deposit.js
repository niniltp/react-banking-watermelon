import React, {Component} from 'react';
import {getUserIDAuth} from "../../../services/authenticationManager";
import {getCardsByUserId} from "../../../backend/cards_backend";
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
import {Link} from "react-router-dom";
import './fundsMngForm.css';
import {getWalletByUserId, updateWallet} from "../../../backend/wallets_backend";
import {convertInAmount, isDepositValid} from "../../../services/fundsManager";
import SimpleCard from "../Cards/SimpleCard";
import BoxToSelect from "../Boxes/BoxToSelect";

class Deposit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userID: getUserIDAuth(),
            isFetching: true,
            cards: [],
            amount: 0,
            selectedCardIndex: null,
            depositConfirmed: false
        };
    }

    componentDidMount = () => {
        this.setState({isFetching: true});
        this.fetchData();
        this.setState({isFetching: false});
    };

    fetchData = () => {
        this.setState({cards: getCardsByUserId(this.state.userID)});
    };

    isValid = (wallet, card, amount) => {
        return isDepositValid(wallet, card, amount);
    };

    confirmDeposit = () => {
        this.setState({
            depositConfirmed: true
        });
    };

    makeDeposit = (wallet, card, amount) => {
        let newWallet = wallet;

        newWallet.balance = wallet.balance + convertInAmount(amount);
        updateWallet(wallet);
        this.props.updateWallet();
    };

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;

        this.setState({
            amount: value
        })
    };

    handleSelect = (index) => {
        this.setState({
            selectedCardIndex: index
        });
    };

    handleSubmit = (event) => {
        if (this.state.selectedCardIndex !== null) {
            const wallet = getWalletByUserId(getUserIDAuth());
            const card = this.state.cards[this.state.selectedCardIndex];
            const amount = this.state.amount;
            event.preventDefault();

            if (this.isValid(wallet, card, amount)) {
                this.makeDeposit(wallet, card, amount);
                this.confirmDeposit();
                console.log(`make deposit of ${amount}₩M from card (id: ${card.id}) to wallet(id: ${wallet.id})`);
            }
        }
    };

    displayDepositForm = () => {
        return (
            <div className="container-in">
                <div className={"fundsMng-title"}>
                    <h3>How much do you want to deposit to your wallet ?</h3>
                </div>
                <Form>
                    <FormGroup row className={"fundsMng-formGroup"}>
                        <Input type="number" step="0.01" min="0" max="999999999999" id="amount"
                               className="boxForm-input amount-input"
                               name="amount" value={this.state.amount} onChange={this.handleChange}/>
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

    displayDepositConfirmed = () => {
        return (
            <div>
                <p><strong>{(parseFloat(this.state.amount)).toFixed(2)}</strong>₩M has been successfully deposited to
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