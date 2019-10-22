import cardsDB from "../../database/cards";
import {setAndGetDataFromLS, setDataInLS} from "../services/localStorageManager";

/*
* This function returns all the cards of the user specified by its id from the DB
* */
export function getCardsByUserId(user_id) {
    const cards = getCards();

    return cards.filter( (card) => {
        return card.user_id === user_id
    });
}

/*
* This function returns all the cards from the DB
* */
export function getCards() {
    return setAndGetDataFromLS("cards", cardsDB);
}

/*
* This function adds a card in the DB
* */
export function addCard(card) {
    let cards = getCards();
    cards.push(card);
    updateCards(cards);
}

/*
* This function updates all the cards of the DB (replaces with the array in parameter)
* */
export function updateCards(cards) {
    setDataInLS("cards", cards);
}

/*
* This function updates the card specified in parameter in the DB
* */
export function updateCard(card) {
    let cards = getCards();
    let index = cards.findIndex(obj => obj.id === card.id);
    cards[index] = card;
    updateCards(cards);
}

/*
* This function removes the card specified by its id from the DB
* */
export function removeCard(id) {
    let cards = getCards();

    cards = cards.filter((item) => item.id !== id);
    updateCards(cards);
}
