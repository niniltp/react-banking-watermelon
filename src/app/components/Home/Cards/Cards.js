import React, {Component} from 'react';
import {Button, FormGroup, Label, Input} from 'reactstrap';
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
        this.setState({ isFetching: true});
        this.setState({ cards: getCardsByUserId(this.props.user_id) });
        this.setState({ isFetching: false})
    }

    addCard() {
        this.setState({ isAddingCard: true});
        console.log("test");
    }

    displayAddCard(){
        return (
            <div>
                <FormGroup row>
                    <Label for="typeCard">Type</Label>
                </FormGroup>
            </div>
        )
    }

    render() {
        return (
            <div id="creditCardsContainer">
                <h3>Cards</h3>
                <div id="creditCardsList">
                    {this.state.isFetching ? <p>Fetching data...</p> : this.state.cards.map((card, index) => (
                        <Card key={index} card={card}/>
                    ))}
                </div>
                {this.state.isAddingCard ? this.displayAddCard():  <Button outline onClick={this.addCard}>+</Button>}
            </div>
        );
    }
}

export default Cards;