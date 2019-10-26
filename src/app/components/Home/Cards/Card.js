import React, {Component} from 'react';
import settings from '../../../img/settings.svg';
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
import {is4digitsCardValid, isCardValid, isInput4digitsCardValid} from "../../../services/checkCardValidity";
import {
    getMonthFromExpirationDateCard,
    getYearFromExpirationDateCard,
    getYearMonthFromExpirationDateCard,
    isDateBeforeToday
} from "../../../services/dateManager";
import SimpleCard from "./SimpleCard";
import {getUserIDAuth} from "../../../services/authenticationManager";

/*
* Props used: key, index, card, modifON (boolean), removeON (boolean), onModif(), onRemove()
* */

class Card extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mouseHover: false,
            isModifying: false,
            card: this.props.card,
            newCard: {
                id: this.props.card.id,
                brand: this.props.card.brand,
                numberCard0: '0000',
                numberCard1: '0000',
                numberCard2: '0000',
                numberCard3: this.props.card.last_4,
                expirationDate: getYearMonthFromExpirationDateCard(this.props.card.expired_at),
                user_id: this.props.card.user_id
            },
            errors: {}
        };
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

    enableModifying = () => {
        this.setState({isModifying: true});
    };

    disableModifying = () => {
        this.setState({isModifying: false});
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
            expired_at: expirationDate,
            user_id: getUserIDAuth()
        };
        return isCardValid(card);
    };

    /**
     * This function sends the remove order to the parent using the props, so it can remove the card from the data
     * @param event
     */
    handleRemove = (event) => {
        event.preventDefault();
        this.props.onRemove(this.props.index, this.state.card.id);
    };

    /**
     * This function handles the submit of the modification card form
     * @param event
     */
    handleSubmitModification = (event) => {
        event.preventDefault();
        const expirationDate = this.state.newCard.expirationDate + "-01";
        const newCard = {
            id: this.state.newCard.id,
            last_4: this.state.newCard.numberCard3,
            brand: this.state.newCard.brand,
            expired_at: expirationDate,
            user_id: this.state.newCard.user_id
        };

        this.validateForm(this.state.newCard);

        if (this.isNewCardValid()) {
            this.props.onModif(this.props.index, newCard);

            /* Update card and Reset newCard with the updated card values*/
            this.setState({
                isModifying: false,
                card: newCard,
                newCard: {
                    id: newCard.id,
                    brand: newCard.brand,
                    numberCard0: '0000',
                    numberCard1: '0000',
                    numberCard2: '0000',
                    numberCard3: newCard.last_4,
                    expirationDate: getYearMonthFromExpirationDateCard(newCard.expired_at)
                },
                errors: {}
            });
        }
    };

    /**
     * This functions handles the activation of the modification mode
     * @param event
     */
    handleModify = (event) => {
        event.preventDefault();
        this.enableModifying();
        console.log("modify card");
        console.log(this.state.card);
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

        if (!(name === "numberCard3") || ((name === "numberCard3") && isInput4digitsCardValid(value))) {
            this.setState(prevState => ({
                newCard: {
                    ...prevState.newCard,
                    [name]: value
                }
            }));
        }
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
                creditCardDigits3: is4digitsCardValid(card.numberCard3) ? false : "Must be 4 digits",
                expirationDateEmpty: !(card.expirationDate === "" || card.expirationDate === null) ? false : "Required",
                expirationDateAfterToday: !isDateBeforeToday(new Date(year, month - 1, 1)) ? false : "Must be after this month"
            }
        });
    };

    /**
     * This function displays the card
     * @returns {*}
     */
    displayCard = () => {
        return (
            <div className="box box-hover" onMouseEnter={this.setMouseHover} onMouseLeave={this.setMouseNotHover}>
                <SimpleCard data={this.state.card}/>
                {this.state.mouseHover && this.props.removeON ?
                    <p className="destroyBox" onClick={this.handleRemove}> x </p> : null}
                {this.state.mouseHover && this.props.modifON ?
                    <img src={settings} alt="logo-modify" className="modifyBox"
                         onClick={this.handleModify}/> : null}
            </div>
        )
    };

    /**
     * This function displays the modification card form
     * @returns {*}
     */
    displayModifyCard = () => {
        const errors = this.state.errors;
        return (
            <div className="box" onMouseEnter={this.setMouseHover} onMouseLeave={this.setMouseNotHover}>
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
                            <Input type="number" disabled placeholder="****" id="numberCard0"
                                   className="boxForm-input"/>
                        </Col>
                        <Col sm={2}>
                            <Input type="number" disabled placeholder="****" id="numberCard1"
                                   className="boxForm-input"/>
                        </Col>
                        <Col sm={2}>
                            <Input type="number" disabled placeholder="****" id="numberCard2"
                                   className="boxForm-input"/>
                        </Col>
                        <Col sm={2}>
                            <Input type="number" min="0" max="9999" id="numberCard3" className="boxForm-input"
                                   name="numberCard3" value={this.state.newCard.numberCard3}
                                   onChange={this.handleChange}/>
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
                                    onClick={this.handleSubmitModification}>Save</Button>
                            <Button color="danger" className="boxForm-btn"
                                    onClick={this.disableModifying}>Cancel</Button>
                        </Col>
                    </FormGroup>
                </Form>
                {this.state.mouseHover && this.props.removeON ?
                    <p className="destroyBox" onClick={this.handleRemove}> x </p> : null}
            </div>
        )
    };

    render() {
        return (
            this.state.isModifying ? this.displayModifyCard() : this.displayCard()
        );
    }
}

export default Card;