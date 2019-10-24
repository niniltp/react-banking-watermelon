import React, {Component} from 'react';
import settings from '../../../img/settings.svg';
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
import {isCardValid} from "../../../services/checkCardValidity";
import {getYearMonthFromExpirationDateCard} from "../../../services/dateManager";
import SimpleCard from "./SimpleCard";

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
            }
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

    enableModifying = () => {
        this.setState({isModifying: true});
    };

    disableModifying = () => {
        this.setState({isModifying: false});
    };

    isNewCardValid = (newCard) => {
        return isCardValid(newCard);
    };

    handleRemove = (event) => {
        event.preventDefault();
        this.props.onRemove(this.state.index, this.state.card.id);
    };

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

        if (this.isNewCardValid(newCard)) {
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
                }
            });
        }
    };

    handleModify = (event) => {
        event.preventDefault();
        this.enableModifying();
        console.log("modify card");
        console.log(this.state.card);
    };

    handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        if (!(name === "numberCard3") || ((name === "numberCard3") && value.length <= 4)) {
            this.setState(prevState => ({
                newCard: {
                    ...prevState.newCard,
                    [name]: value
                }
            }));
        }
    };

    displayCard = () => {
        return (
            <div className="creditCard" onMouseEnter={this.setMouseHover} onMouseLeave={this.setMouseNotHover}>
                <SimpleCard data={this.state.card}/>
                {/*<ul>
                    <li><span className="labelInfoCard">Brand: </span>{this.state.card.brand}</li>
                    <li><span className="labelInfoCard">Card number: </span>**** **** **** {this.state.card.last_4}</li>
                    <li><span
                        className="labelInfoCard">Expiration date: </span>{getYearMonthFromExpirationDateCard(this.state.card.expired_at)}
                    </li>
                </ul>*/}
                {this.state.mouseHover && this.props.removeON ? <p className="destroyCreditCard" onClick={this.handleRemove}> x </p> : null}
                {this.state.mouseHover && this.props.modifON ?
                    <img src={settings} alt="logo-modify" className="modifyCreditCard"
                         onClick={this.handleModify}/> : null}
            </div>
        )
    };

    displayModifyCard = () => {
        return (
            <div className="creditCard" onMouseEnter={this.setMouseHover} onMouseLeave={this.setMouseNotHover}>
                <Form className="creditCard-form">
                    <FormGroup className="creditCard-formGroup reset-margin" row>
                        <Label for="brandCard" sm={2} className="labelInfoCard">Brand</Label>
                        <Col sm={10}>
                            <Input type="select" id="brandCard" className="creditCardForm-input" name="brand"
                                   defaultValue={this.state.newCard.brand} onChange={this.handleChange}>
                                <option value="american_express">American Express</option>
                                <option value="master_card">Master Card</option>
                                <option value="visa">Visa</option>
                            </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup className="creditCard-formGroup reset-margin" row>
                        <Label for="numberCard" sm={2} className="labelInfoCard">Card Number</Label>
                        <Col sm={2}>
                            <Input type="number" disabled placeholder="****" id="numberCard0"
                                   className="creditCardForm-input"/>
                        </Col>
                        <Col sm={2}>
                            <Input type="number" disabled placeholder="****" id="numberCard1"
                                   className="creditCardForm-input"/>
                        </Col>
                        <Col sm={2}>
                            <Input type="number" disabled placeholder="****" id="numberCard2"
                                   className="creditCardForm-input"/>
                        </Col>
                        <Col sm={2}>
                            <Input type="number" min="0" max="9999" id="numberCard3" className="creditCardForm-input"
                                   name="numberCard3" defaultValue={this.state.newCard.numberCard3}
                                   onChange={this.handleChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup className="creditCard-formGroup reset-margin" row>
                        <Label for="expirationDateCard" sm={2} className="labelInfoCard">Expiration Date</Label>
                        <Col sm={10}>
                            <Input type="month" id="expirationDateCard" className="creditCardForm-input"
                                   name="expirationDate" defaultValue={this.state.newCard.expirationDate}
                                   onChange={this.handleChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup check className="creditCard-formGroup reset-margin" row>
                        <Col sm={{size: 10, offset: 2}} style={{textAlign: "right"}}>
                            <Button color="success" className="creditCardForm-btn"
                                    onClick={this.handleSubmitModification}>Save</Button>
                            <Button color="danger" className="creditCardForm-btn"
                                    onClick={this.disableModifying}>Cancel</Button>
                        </Col>
                    </FormGroup>
                </Form>
                {this.state.mouseHover && this.props.removeON ? <p className="destroyCreditCard" onClick={this.handleRemove}> x </p> : null}
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