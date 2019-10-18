import React, {Component} from 'react';
import {Button, Form, FormGroup, Label, Input, Col} from 'reactstrap';
import Card from './Card.js';
import {getCardsByUserId} from "../../../backend/cards_backend";
import './Cards.css';

class Cards extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFetching: false,
            isAddingCard: false,
            cards: [],
            newCard: {
                brand: '',
                numberCard0: '',
                numberCard1: '',
                numberCard2: '',
                numberCard3: '',
                expirationDate: ''
            }
        };

        this.fetchData = this.fetchData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addCard = this.addCard.bind(this);
        this.enableAddingCard = this.enableAddingCard.bind(this);
        this.disableAddingCard = this.disableAddingCard.bind(this);
        this.displayAddCard = this.displayAddCard.bind(this);
    }

    componentDidMount() {
        this.setState({isFetching: true});
        this.fetchData();
        this.setState({isFetching: false})
    }

    fetchData() {
        this.setState({cards: getCardsByUserId(this.props.user_id)});
    }

    enableAddingCard() {
        this.setState({isAddingCard: true});
    }

    disableAddingCard() {
        this.setState( {isAddingCard: false});
    }

    addCard() {
        this.state.cards.push({});
        this.fetchData();
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        console.log("New card added");
        console.log(this.state.newCard);
        event.preventDefault();
    }

    displayAddCard() {
        return (
            <Form className="creditCard-form">
                <FormGroup className="creditCard-formGroup reset-margin" row>
                    <Label for="brandCard" sm={2} className="labelInfoCard">Brand</Label>
                    <Col sm={10}>
                        <Input type="select" id="brandCard" className="creditCardForm-input" value={this.state.newCard.brand} onChange={this.handleChange}>
                            <option>Visa</option>
                            <option>American Express</option>
                        </Input>
                    </Col>
                </FormGroup>
                <FormGroup className="creditCard-formGroup reset-margin" row>
                    <Label for="numberCard" sm={2} className="labelInfoCard">Card Number</Label>
                    <Col sm={2}>
                        <Input type="number" min="1000" max="9999" id="numberCard0" className="creditCardForm-input" value={this.state.newCard.numberCard0} onChange={this.handleChange}/>
                    </Col>
                    <Col sm={2}>
                        <Input type="number" min="1000" max="9999" id="numberCard1" className="creditCardForm-input" value={this.state.newCard.numberCard1} onChange={this.handleChange}/>
                    </Col>
                    <Col sm={2}>
                        <Input type="number" min="1000" max="9999" id="numberCard2" className="creditCardForm-input" value={this.state.newCard.numberCard2} onChange={this.handleChange}/>
                    </Col>
                    <Col sm={2}>
                        <Input type="number" min="1000" max="9999" id="numberCard3" className="creditCardForm-input" value={this.state.newCard.numberCard3} onChange={this.handleChange}/>
                    </Col>
                </FormGroup>
                <FormGroup className="creditCard-formGroup reset-margin" row>
                    <Label for="expirationDateCard" sm={2} className="labelInfoCard">Expiration Date</Label>
                    <Col sm={10}>
                        <Input type="month" id="expirationDateCard" className="creditCardForm-input" value={this.state.newCard.expirationDate} onChange={this.handleChange}/>
                    </Col>
                </FormGroup>
                <FormGroup check className="creditCard-formGroup reset-margin" row>
                    <Col sm={{ size: 10, offset: 2 }} style={{ textAlign: "right"}}>
                        <Button color="success" className="creditCardForm-btn" onClick={this.handleSubmit}>Submit</Button>
                        <Button color="danger" className="creditCardForm-btn" onClick={this.disableAddingCard}>Cancel</Button>
                    </Col>
                </FormGroup>
            </Form>
        )
    }

    render() {
        return (
            <div className="container-in">
                <div id="creditCardsContainer">
                    <h3>Cards</h3>
                    <div id="creditCardsList">
                        {this.state.isFetching ? <p>Fetching data...</p> : this.state.cards.map((card, index) => (
                            <Card key={index} card={card}/>
                        ))}
                        {this.state.isAddingCard ? this.displayAddCard() :
                            <Button outline className="addCreditCard-btn" onClick={this.enableAddingCard}>+</Button>}
                    </div>
                </div>
            </div>
        );
    }
}

export default Cards;