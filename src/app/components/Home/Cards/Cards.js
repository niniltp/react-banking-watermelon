import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Label} from 'reactstrap';
import Card from './Card.js';
import {addCard as addCardDB, removeCard as removeCardDB, getCardsByUserId} from "../../../backend/cards_backend";
import './Cards.css';
import {isCardValid} from "../../../services/checkCardValidity";

class Cards extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFetching: true,
            isAddingCard: false,
            cards: [],
            newCard: {
                brand: 'American Express',
                numberCard0: '',
                numberCard1: '',
                numberCard2: '',
                numberCard3: '',
                expirationDate: ''
            }
        };
    }

    componentDidMount = () => {
        this.setState({isFetching: true});
        this.fetchData();
        this.setState({isFetching: false});
    };

    fetchData = () => {
        this.setState({cards: getCardsByUserId(this.props.user_id)});
    };

    enableAddingCard = () => {
        this.setState({isAddingCard: true});
    };

    disableAddingCard = () => {
        this.setState({isAddingCard: false});
    };

    isNewCardValid = () => {
        return isCardValid(this.state.newCard);
    };

    addCard = () => {
        const newCard = this.state.newCard;
        const expirationDate = newCard.expirationDate + "-01";
        let card = {
            id: this.state.cards.length + 2,
            last_4: newCard.numberCard3,
            brand: newCard.brand,
            expired_at: expirationDate,
            user_id: this.props.user_id
        };

        this.state.cards.push(card);
        addCardDB(card);
    };

    removeCard = (id) => {
        this.setState(prevState => ({
            cards: prevState.cards.filter(card => card.id !== id)
        }), () => {
            console.log(this.state.cards);
        });
        removeCardDB(id);

    };

    handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        console.log(value);

        if(!(name === "numberCard0" || name === "numberCard1" || name === "numberCard2" || name === "numberCard3") || ((name === "numberCard0" || name === "numberCard1" || name === "numberCard2" || name === "numberCard3") && value.length <= 4)) {
            this.setState(prevState => ({
                newCard: {
                    ...prevState.newCard,
                    [name]: value
                }
            }), () => {
                console.log(this.state.newCard);
            });
        }
    };

    handleSubmit = (event) => {
        event.preventDefault();

        if (this.isNewCardValid()) {
            this.addCard();
            console.log("New card added");
            this.setState({
                isAddingCard: false,
                newCard: {
                    brand: '',
                    numberCard0: '',
                    numberCard1: '',
                    numberCard2: '',
                    numberCard3: '',
                    expirationDate: ''
                }
            });
        }
    };

    handleRemove = (index, id) => {
        this.removeCard(id);
        console.log(`remove card ${index}, ${id}`);
    };

    displayAddCard = () => {
        return (
            <Form className="creditCard-form">
                <FormGroup className="creditCard-formGroup reset-margin" row>
                    <Label for="brandCard" sm={2} className="labelInfoCard">Brand</Label>
                    <Col sm={10}>
                        <Input type="select" id="brandCard" className="creditCardForm-input" name="brand"
                               value={this.state.newCard.brand} onChange={this.handleChange}>
                            <option>American Express</option>
                            <option>Master Card</option>
                            <option>Visa</option>
                        </Input>
                    </Col>
                </FormGroup>
                <FormGroup className="creditCard-formGroup reset-margin" row>
                    <Label for="numberCard" sm={2} className="labelInfoCard">Card Number</Label>
                    <Col sm={2}>
                        <Input type="number" min="1000" max="9999" id="numberCard0" className="creditCardForm-input"
                               name="numberCard0" value={this.state.newCard.numberCard0} onChange={this.handleChange}/>
                    </Col>
                    <Col sm={2}>
                        <Input type="number" min="1000" max="9999" id="numberCard1" className="creditCardForm-input"
                               name="numberCard1" value={this.state.newCard.numberCard1} onChange={this.handleChange}/>
                    </Col>
                    <Col sm={2}>
                        <Input type="number" min="1000" max="9999" id="numberCard2" className="creditCardForm-input"
                               name="numberCard2" value={this.state.newCard.numberCard2} onChange={this.handleChange}/>
                    </Col>
                    <Col sm={2}>
                        <Input type="number" min="1000" max="9999" id="numberCard3" className="creditCardForm-input"
                               name="numberCard3" value={this.state.newCard.numberCard3} onChange={this.handleChange}/>
                    </Col>
                </FormGroup>
                <FormGroup className="creditCard-formGroup reset-margin" row>
                    <Label for="expirationDateCard" sm={2} className="labelInfoCard">Expiration Date</Label>
                    <Col sm={10}>
                        <Input type="month" id="expirationDateCard" className="creditCardForm-input"
                               name="expirationDate" value={this.state.newCard.expirationDate}
                               onChange={this.handleChange}/>
                    </Col>
                </FormGroup>
                <FormGroup check className="creditCard-formGroup reset-margin" row>
                    <Col sm={{size: 10, offset: 2}} style={{textAlign: "right"}}>
                        <Button color="success" className="creditCardForm-btn"
                                onClick={this.handleSubmit}>Submit</Button>
                        <Button color="danger" className="creditCardForm-btn"
                                onClick={this.disableAddingCard}>Cancel</Button>
                    </Col>
                </FormGroup>
            </Form>
        )
    };

    render = () => {
        return (
            <div className="container-in">
                <div id="creditCardsContainer">
                    <h3>Cards</h3>
                    <div id="creditCardsList">
                        {this.state.isFetching ? <p>Fetching data...</p> : this.state.cards.map((card, index) => (
                            <Card key={index} index={index} card={card} onRemove={this.handleRemove}/>))}
                        {this.state.isAddingCard ? this.displayAddCard() :
                            <Button outline className="addCreditCard-btn" onClick={this.enableAddingCard}>+</Button>}
                    </div>
                </div>
            </div>
        );
    }
}

export default Cards;