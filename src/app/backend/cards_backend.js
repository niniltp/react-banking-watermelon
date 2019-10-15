import cards from "../../database/cards";

export function getCardsByUserId(user_id){
    const cardsList = cards.filter(function(card) {
        return card.user_id === user_id
    });

    console.log(cards);
    return cardsList;
}