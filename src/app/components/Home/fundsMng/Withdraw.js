import React, {Component} from 'react';
import {getUserIDAuth} from "../../../services/authenticationManager";
import {getCardsByUserId} from "../../../backend/cards_backend";
import CardToSelect from "../Cards/CardToSelect";

class Withdraw extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userID: getUserIDAuth(),
            isFetching: true,
            selectedCardIndex: null,
            cards: []
        };
    }

    componentDidMount = () => {
        this.setState({isFetching: true});
        this.fetchData();
        this.setState({isFetching: false});
    };

    fetchData = () => {
        this.setState({cards: getCardsByUserId(this.state.userID)});
    };

    handleSelect = (index) => {
        this.setState({
            selectedCardIndex: index
        });
    };

    render = () => {
        return (
            <div className="container-in">
                <div id="creditCardsContainer">
                    <h3>Cards</h3>
                    <div id="creditCardsList">
                        {this.state.isFetching ? <p>Fetching data...</p> : this.state.cards.map((card, index) => (
                            <CardToSelect key={index} index={index} card={card}
                                          selectedCardIndex={this.state.selectedCardIndex}
                                          handleSelect={this.handleSelect}/>))}
                    </div>
                </div>
            </div>
        );
    };
}

export default Withdraw;