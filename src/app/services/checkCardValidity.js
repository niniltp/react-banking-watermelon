export function isBrandValid(brand) {
    return brand !== '' && brand !== null;
}

export function isNumberCardValid(numberCard0, numberCard1, numberCard2, numberCard3) {
    return numberCard0 !== '' && numberCard0.length === 4 && numberCard1 !== '' && numberCard1.length === 4 &&  numberCard2 !== '' && numberCard2.length === 4 &&  numberCard3 !== '' && numberCard3.length === 4;
}

export function isExpirationDateValid(expirationDate) {
    return expirationDate !== '';
}

export function isCardValid(card) {
    if (isBrandValid(card.brand) && isNumberCardValid(card.numberCard0, card.numberCard1, card.numberCard2, card.numberCard3) && isExpirationDateValid(card.expirationDate))
        return true;
    else
        return false;
}