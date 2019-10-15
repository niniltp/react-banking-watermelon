import  React, { Component } from 'react';

class Card extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="creditCard">
                <ul>
                    <li>Brand: {this.props.card.brand}</li>
                </ul>
            </div>
        );
    }
}

export default Card;