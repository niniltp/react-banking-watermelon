import React, {Component} from 'react';
import '../Boxes/Boxes.css';
import {getYearMonthFromExpirationDateCard} from "../../../services/dateManager";

class SimpleCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            card: this.props.data
        }
    }

    displayCard = () => {
        return (
            <div className="box">
                <ul>
                    <li><span className="labelInfoBox">Brand: </span>{this.state.card.brand}</li>
                    <li><span className="labelInfoBox">Card number: </span>**** **** **** {this.state.card.last_4}</li>
                    <li><span
                        className="labelInfoBox">Expiration date: </span>{getYearMonthFromExpirationDateCard(this.state.card.expired_at)}
                    </li>
                </ul>
            </div>
        )
    };

    render() {
        return (
            this.displayCard()
        );
    }
}

export default SimpleCard;