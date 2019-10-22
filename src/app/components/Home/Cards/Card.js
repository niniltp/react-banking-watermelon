import React, {Component} from 'react';

class Card extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mouseHover: false
        }
    }

    setMouseHover = () => {
        this.setState({
            mouseHover: true
        })
    };

    setMouseNotHover = () => {
        this.setState({
            mouseHover: false
        })
    };

    handleClick = (event) => {
        event.preventDefault();
        this.props.onRemove(this.props.index, this.props.card.id);
    };

    render() {
        return (
            <div className="creditCard" onMouseEnter={this.setMouseHover} onMouseLeave={this.setMouseNotHover}>
                <ul>
                    <li><span className="labelInfoCard">Brand: </span>{this.props.card.brand}</li>
                    <li><span className="labelInfoCard">Card number: </span>**** **** **** {this.props.card.last_4}</li>
                    <li><span className="labelInfoCard">Expiration date: </span>{this.props.card.expired_at}</li>
                </ul>
                {this.state.mouseHover ? <p className="destroyCreditCard" onClick={this.handleClick}> x </p> : null}
            </div>
        );
    }
}

export default Card;