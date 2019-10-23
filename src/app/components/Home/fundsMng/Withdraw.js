import React, {Component} from 'react';
import {getUserIDAuth} from "../../../services/authenticationManager";
import {getCardsByUserId} from "../../../backend/cards_backend";
import CardToSelect from "../Cards/CardToSelect";
import {FormGroup, Input, Label} from "reactstrap";
import './fundsMngForm.css';

class Withdraw extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userID: getUserIDAuth(),
            isFetching: true,
            cards: [],
            amount: 0,
            selectedCardIndex: null
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

    render = () => {
        return (
            <div className="container-in">
                <div className={"fundsMng-title"}>
                    <h3>How much do you want to withdraw from your wallet ?</h3>
                </div>
                <FormGroup row className={"fundsMng-formGroup"}>
                    <Input type="number" min="0" max="999999999999" id="amount" className="creditCardForm-input amount-input"
                           name="amount" value={this.state.amount} onChange={this.handleChange}/>
                    <Label for="amount" className="amount-label">₩M</Label>
                </FormGroup>

                <div id="creditCardsContainer">
                    <h3>Cards</h3>
                    <div id="creditCardsList">
                        {this.state.isFetching ? <p>Fetching data...</p> : this.state.cards.map((card, index) => (
                            <CardToSelect key={index} index={index} card={card}
                                          selectedCardIndex={this.state.selectedCardIndex}
                                          handleSelect={this.handleSelect}/>))}
                    </div>
                </div>
            </div>
        );
    };
}

export default Withdraw;