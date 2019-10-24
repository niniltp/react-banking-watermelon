import React, {Component} from 'react';
import {getYearMonthFromExpirationDateCard} from "../../../services/dateManager";

class SimpleCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            card: this.props.data,
            classNames: this.props.classNames ? this.props.classNames : ""
        }
    }

    displayCard = () => {
        return (
            <div className={this.state.classNames}>
                <ul>
                    <li><span className="labelInfoCard">Brand: </span>{this.state.card.brand}</li>
                    <li><span className="labelInfoCard">Card number: </span>**** **** **** {this.state.card.last_4}</li>
                    <li><span
                        className="labelInfoCard">Expiration date: </span>{getYearMonthFromExpirationDateCard(this.state.card.expired_at)}
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