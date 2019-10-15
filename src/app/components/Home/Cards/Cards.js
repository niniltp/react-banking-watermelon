import  React, { Component } from 'react';
import Card from './Card.js';
import {getCardsByUserId} from "../../../backend/cards_backend";
import './Cards.css';

class Cards extends Component {
    constructor(props){
        super(props);

        this.state = {
            cards: getCardsByUserId(this.props.user_id)
        }
    }

    render() {
        return (
            <div id="creditCards">
                <h3>Cards</h3>
                {this.state.cards.map((card, index) => (
                    <Card key={index} card={card}/>
                ))}
            </div>
        );
    }
}

export default Cards;