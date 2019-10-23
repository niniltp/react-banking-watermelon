export function isBrandValid(brand) {
    return brand !== '' && brand !== null;
}

export function isNumberCardValid(numberCard0, numberCard1, numberCard2, numberCard3) {
    return is4digitsCardValid(numberCard0) && is4digitsCardValid(numberCard1) && is4digitsCardValid(numberCard2) && is4digitsCardValid(numberCard3);
}

export function is4digitsCardValid(digits) {
    return digits !== null && digits !== '' && digits.length === 4 && parseInt(digits) >= 0
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