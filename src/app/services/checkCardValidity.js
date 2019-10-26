import {getMonthFromExpirationDateCard, getYearFromExpirationDateCard, isDateBeforeToday} from "./dateManager";

export function isBrandValid(brand) {
    return brand !== '' && brand !== null;
}

export function isNumberCardValid_divided(numberCard0, numberCard1, numberCard2, numberCard3) {
    return is4digitsCardValid(numberCard0) && is4digitsCardValid(numberCard1) && is4digitsCardValid(numberCard2) && is4digitsCardValid(numberCard3);
}

export function isNumberCardValid(numberCard) {
    return is4digitsCardValid(numberCard);
}

export function is4digitsCardValid(digits) {
    return digits !== null && digits !== '' && digits.length === 4 && parseInt(digits) >= 0
}

export function isExpirationDateValid(expirationDate) {
    const month = getMonthFromExpirationDateCard(expirationDate);
    const year = getYearFromExpirationDateCard(expirationDate);

    return expirationDate !== '' && expirationDate !== '-01'  && !isDateBeforeToday(new Date(year, month-1, 1));
}

export function isCardValid(card) {
    return isBrandValid(card.brand) && isNumberCardValid(card.last_4) && isExpirationDateValid(card.expired_at);
}

export function isInput4digitsCardValid(input) {
    const regex = /^(\s*|\d+)$/;
    return input.length <= 4 && input.match(regex);
}