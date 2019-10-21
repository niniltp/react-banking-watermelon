import cardsDB from "../../database/cards";
import {setAndGetDataFromLS} from "../services/localStorageManager";

export function getCardsByUserId(user_id){
    const cards = getCards();

    return cards.filter(function(card) {
        return card.user_id === user_id
    });
}

export function getCards() {
    return setAndGetDataFromLS("cards", cardsDB);
}