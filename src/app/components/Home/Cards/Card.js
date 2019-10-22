import  React, { Component } from 'react';

class Card extends Component {
    render() {
        return (
            <div className="creditCard">
                <ul>
                    <li><span className="labelInfoCard">Brand: </span>{this.props.card.brand}</li>
                    <li><span className="labelInfoCard">Card number: </span>**** **** **** {this.props.card.last_4}</li>
                    <li><span className="labelInfoCard">Expiration date: </span>{this.props.card.expired_at}</li>
                </ul>
            </div>
        );
    }
}

export default Card;