import React, {Component} from 'react';

class CardToSelect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mouseHover: false,
            isSelected: false,
            prevSelectedCardIndex: this.props.selectedCardIndex,
            card: this.props.card
        }
    }

    static getDerivedStateFromProps(props, state) {
        // Re-run the filter whenever props change
        if(state.prevSelectedCardIndex !== props.selectedCardIndex) {
            return {
                mouseHover: state.mouseHover,
                isSelected: props.selectedCardIndex === props.index,
                prevSelectedCardIndex: props.selectedCardIndex,
                card: props.card
            };
        }

        return null;
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

    select = () => {
        this.setState({isSelected: true});
        this.props.handleSelect(this.props.index);
    };

    deselect = () => {
        this.setState({isSelected: false});
    };

    handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
    };

    handleClick = () => {
        if (!this.state.isSelected && this.props.selectedCardIndex !== this.props.index)
            this.select();
        else
            this.deselect();
    };

    displayCard = () => {
        return (
            <div className={this.state.isSelected ? "creditCard toSelect selected" : "creditCard toSelect deselected"}
                 onMouseEnter={this.setMouseHover} onMouseLeave={this.setMouseNotHover} onClick={this.handleClick}>
                <ul>
                    <li><span className="labelInfoCard">Brand: </span>{this.state.card.brand}</li>
                    <li><span className="labelInfoCard">Card number: </span>**** **** **** {this.state.card.last_4}</li>
                    <li><span
                        className="labelInfoCard">Expiration date: </span>{this.state.card.expired_at.substring(0, 7)}
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

export default CardToSelect;