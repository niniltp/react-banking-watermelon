import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Label} from 'reactstrap';
import {Link} from "react-router-dom";
import Card from './Card.js';
import '../Boxes/Boxes.css';
import {
    is4digitsCardValid,
    isCardValid,
    isInput4digitsCardValid,
    isNumberCardValid_divided
} from "../../../services/checkCardValidity";
import {getUserIDAuth} from "../../../services/authenticationManager";
import {generateID} from "../../../services/idsGeneartor";
import {
    addCard as addCardDB,
    getCardsByUserId,
    removeCard as removeCardDB,
    updateCard as updateCardDB
} from "../../../backend/cards_backend";
import {
    getMonthFromExpirationDateCard,
    getYearFromExpirationDateCard,
    isDateBeforeToday
} from "../../../services/dateManager";

class Cards extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userID: getUserIDAuth(),
            isFetching: true,
            isAddingCard: false,
            cards: [],
            newCard: {
                brand: 'american_express',
                numberCard0: '',
                numberCard1: '',
                numberCard2: '',
                numberCard3: '',
                expirationDate: '' // YYYY-MM
            },
            errors: {}
        };
    }

    componentDidMount = () => {
        this.fetchData();
    };

    fetchData = () => {
        this.setState({isFetching: true});
        this.setState({cards: getCardsByUserId(this.state.userID)}, () => {
            this.setState({isFetching: false});
        });
    };

    enableAddingCard = () => {
        this.setState({isAddingCard: true});
    };

    disableAddingCard = () => {
        this.setState({isAddingCard: false});
    };

    resetNewCardInputs = () => {
        this.setState({
            newCard: {
                brand: "",
                numberCard0: "",
                numberCard1: "",
                numberCard2: "",
                numberCard3: "",
                expirationDate: ""
            }
        });
    };

    /**
     * This function checks if the new card stored in the component"s state is valid
     * @returns true if valid | false if not
     */
    isNewCardValid = () => {
        const newCard = this.state.newCard;
        const expirationDate = newCard.expirationDate + "-01";
        const card = {
            id: newCard.id,
            last_4: newCard.numberCard3,
            brand: newCard.brand,
            expired_at: expirationDate, // YYYY-MM-DD
            user_id: getUserIDAuth()
        };
        return isCardValid(card) && isNumberCardValid_divided(newCard.numberCard0, newCard.numberCard1, newCard.numberCard2, newCard.numberCard3);
    };

    /**
     * This function adds the new card stored in the component's state
     */
    addCard = () => {
        const newCard = this.state.newCard;
        const expirationDate = newCard.expirationDate + "-01";
        let card = {
            id: generateID(),
            last_4: newCard.numberCard3,
            brand: newCard.brand,
            expired_at: expirationDate, // YYYY-MM-DD
            user_id: getUserIDAuth()
        };

        this.state.cards.push(card);
        addCardDB(card);
    };

    /**
     * This function updates the card in the data
     * @param index : index of the card
     * @param card : new data of the ward
     */
    modifyCard = (index, card) => {
        let cards = this.state.cards;
        cards[index] = card;
        this.setState({
            cards: cards
        }, () => {
            console.log(this.state.cards);
        });
        updateCardDB(card);
    };

    /**
     * This function removes the card from the data
     * @param id : id of the card
     */
    removeCard = (id) => {
        this.setState(prevState => ({
            cards: prevState.cards.filter(card => card.id !== id)
        }), () => {
            console.log(this.state.cards);
        });
        removeCardDB(id);

    };

    /**
     * This function handles the change in any input of the form.
     * It also prevents non valid inputs
     * @param event
     */
    handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        if (!(name === "numberCard0" || name === "numberCard1" || name === "numberCard2" || name === "numberCard3") || ((name === "numberCard0" || name === "numberCard1" || name === "numberCard2" || name === "numberCard3") && isInput4digitsCardValid(value))) {
            this.setState(prevState => ({
                newCard: {
                    ...prevState.newCard,
                    [name]: value
                }
            }));
        }
    };

    /**
     * This function handles the submit of the adding card form
     * @param event
     */
    handleSubmit = (event) => {
        event.preventDefault();
        this.validateForm(this.state.newCard);
        if (this.isNewCardValid()) {
            this.addCard();
            console.log("new card added");
            this.disableAddingCard();
            this.resetNewCardInputs();
        }
    };

    /**
     * This function handles the modification order sent by the Card child so it can updtate the card with the new data
     * @param index : index of the card
     * @param card : new data of the card
     */
    handleModif = (index, card) => {
        this.modifyCard(index, card);
        console.log(`modify card ${index}, ${card.id}`);
    };

    /**
     * This function handles the remove order sent by the Card child so it can remove the card from the data
     * @param index : index of the card
     * @param id : id of the card
     */
    handleRemove = (index, id) => {
        this.removeCard(id);
        console.log(`remove card ${index}, ${id}`);
    };

    /**
     * This function checks if the inputs of the form are valid are not
     * Display error messages if the input isn't valid
     * @param card : object which we want to check the input
     */
    validateForm = (card) => {
        const month = getMonthFromExpirationDateCard(card.expirationDate);
        const year = getYearFromExpirationDateCard(card.expirationDate);
        this.setState({
            errors: {
                creditCardDigits0: is4digitsCardValid(card.numberCard0) ? false : "Must be 4 digits",
                creditCardDigits1: is4digitsCardValid(card.numberCard1) ? false : "Must be 4 digits",
                creditCardDigits2: is4digitsCardValid(card.numberCard2) ? false : "Must be 4 digits",
                creditCardDigits3: is4digitsCardValid(card.numberCard3) ? false : "Must be 4 digits",
                expirationDateEmpty: !(card.expirationDate === "" || card.expirationDate === null) ? false : "Required",
                expirationDateAfterToday: !isDateBeforeToday(new Date(year, month - 1, 1)) ? false : "Must be after this month"
            }
        });
    };

    /**
     * This function displays the adding card form
     * @returns {*}
     */
    displayAddCard = () => {
        const errors = this.state.errors;
        return (
            <Form className="box-form">
                <FormGroup className="box-formGroup reset-margin" row>
                    <Label for="brandCard" sm={2} className="labelInfoCard">Brand</Label>
                    <Col sm={10}>
                        <Input type="select" id="brandCard" className="boxForm-input" name="brand"
                               value={this.state.newCard.brand} onChange={this.handleChange}>
                            <option value="american_express">American Express</option>
                            <option value="master_card">Master Card</option>
                            <option value="visa">Visa</option>
                        </Input>
                    </Col>
                </FormGroup>
                <FormGroup className="box-formGroup reset-margin" row>
                    <Label for="numberCard" sm={2} className="labelInfoCard">Card Number</Label>
                    <Col sm={2}>
                        <Input type="number" min="0" max="9999" step="1" pattern="\d+" id="numberCard0"
                               className="boxForm-input"
                               name="numberCard0" value={this.state.newCard.numberCard0} onChange={this.handleChange}/>
                        {errors.creditCardDigits0 ?
                            <span className="error-input">{errors.creditCardDigits0}</span> : null}
                    </Col>
                    <Col sm={2}>
                        <Input type="number" min="0" max="9999" id="numberCard1" className="boxForm-input"
                               name="numberCard1" value={this.state.newCard.numberCard1} onChange={this.handleChange}/>
                        {errors.creditCardDigits1 ?
                            <span className="error-input">{errors.creditCardDigits1}</span> : null}
                    </Col>
                    <Col sm={2}>
                        <Input type="number" min="0" max="9999" id="numberCard2" className="boxForm-input"
                               name="numberCard2" value={this.state.newCard.numberCard2} onChange={this.handleChange}/>
                        {errors.creditCardDigits2 ?
                            <span className="error-input">{errors.creditCardDigits2}</span> : null}
                    </Col>
                    <Col sm={2}>
                        <Input type="number" min="0" max="9999" id="numberCard3" className="boxForm-input"
                               name="numberCard3" value={this.state.newCard.numberCard3} onChange={this.handleChange}/>
                        {errors.creditCardDigits3 ?
                            <span className="error-input">{errors.creditCardDigits3}</span> : null}
                    </Col>
                </FormGroup>
                <FormGroup className="box-formGroup reset-margin" row>
                    <Label for="expirationDateCard" sm={2} className="labelInfoCard">Expiration Date</Label>
                    <Col sm={10}>
                        <Input type="month" id="expirationDateCard" className="boxForm-input"
                               name="expirationDate" value={this.state.newCard.expirationDate}
                               onChange={this.handleChange}/>
                        {errors.expirationDateEmpty ?
                            <p className="error-input">{errors.expirationDateEmpty}</p> : null}
                        {errors.expirationDateAfterToday ?
                            <p className="error-input">{errors.expirationDateAfterToday}</p> : null}
                    </Col>
                </FormGroup>
                <FormGroup check className="box-formGroup reset-margin" row>
                    <Col sm={{size: 10, offset: 2}} style={{textAlign: "right"}}>
                        <Button color="success" className="boxForm-btn"
                                onClick={this.handleSubmit}>Add</Button>
                        <Button color="danger" className="boxForm-btn"
                                onClick={this.disableAddingCard}>Cancel</Button>
                    </Col>
                </FormGroup>
            </Form>
        )
    };

    /**
     * This functions renders the list of cards and the adding card form if the mode is active
     * @returns {*}
     */
    render = () => {
        return (
            <div className="container-in">
                <div id="boxesContainer">
                    <h3>Cards</h3>
                    <div id="boxesList">
                        {this.state.isFetching ? <p>Fetching data...</p> : this.state.cards.map((card, index) => (
                            <Card key={index} index={index} card={card} modifON={true} removeON={true}
                                  onModif={this.handleModif}
                                  onRemove={this.handleRemove}/>))}
                        {this.state.isAddingCard ? this.displayAddCard() :
                            <Button outline color="success" className="add-btn"
                                    onClick={this.enableAddingCard}>+</Button>}
                    </div>
                    <br/>
                    <br/>
                    <Link to="/account"><Button color="primary">Go back</Button></Link>
                </div>
            </div>
        );
    }
}

export default Cards;