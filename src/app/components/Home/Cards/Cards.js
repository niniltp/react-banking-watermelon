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
            cards: []
        }

        this.addCard = this.addCard.bind(this);
        this.displayAddCard = this.displayAddCard.bind(this);
    }

    componentDidMount() {
        this.setState({isFetching: true});
        this.setState({cards: getCardsByUserId(this.props.user_id)});
        this.setState({isFetching: false})
    }

    addCard() {
        this.setState({isAddingCard: true});
        console.log("test");
    }

    displayAddCard() {
        return (
            <Form>
                <FormGroup className="creditCard creditCardForm reset-margin" row>
                    <Label for="brandCard" sm={2} className="labelInfoCard">Brand</Label>
                    <Col sm={10}>
                        <Input type="select" id="brandCard">
                            <option>Visa</option>
                            <option>American Express</option>
                        </Input>
                    </Col>
                </FormGroup>
                <FormGroup className="creditCard creditCardForm reset-margin" row>
                    <Label for="numberCard" sm={2} className="labelInfoCard">Card Number</Label>
                    <Col sm={2}>
                        <Input type="number" min="1000" max="9999" id="numberCard"/>
                    </Col>
                    <Col sm={2}>
                        <Input type="number" min="1000" max="9999" id="numberCard"/>
                    </Col>
                    <Col sm={2}>
                        <Input type="number" min="1000" max="9999" id="numberCard"/>
                    </Col>
                    <Col sm={2}>
                        <Input type="number" min="1000" max="9999" id="numberCard"/>
                    </Col>
                </FormGroup>
                <FormGroup className="creditCard creditCardForm reset-margin" row>
                    <Label for="expirationDateCard" sm={2} className="labelInfoCard">Expiration Date</Label>
                    <Col sm={10}>
                        <Input type="month" id="expirationDateCard"/>
                    </Col>
                </FormGroup>
                <FormGroup check className="creditCard creditCardForm reset-margin" row>
                    <Col sm={{ size: 10, offset: 2 }}>
                        <Button>Submit</Button>
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
                            <Button outline onClick={this.addCard}>+</Button>}
                    </div>
                </div>
            </div>
        );
    }
}

export default Cards;