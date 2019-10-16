import React, {Component} from 'react';
import Card from './Card.js';
import {getCardsByUserId} from "../../../backend/cards_backend";
import './Cards.css';

class Cards extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFetching: false,
            cards: []
        }
    }

    componentDidMount() {

        this.setState({
            isFetching: true
        });

        this.setState({
            cards: getCardsByUserId(this.props.user_id)
        });

        this.setState({
            isFetching: false
        })
    }

    render() {
        return (
            <div id="creditCards">
                <h3>Cards</h3>
                {this.state.isFetching ? <p>Fetching data...</p> : this.state.cards.map((card, index) => (
                    <Card key={index} card={card}/>
                ))}
            </div>
        );
    }
}

export default Cards;