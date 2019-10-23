export function isDateBeforeToday(date) {
    console.log(new Date(new Date().toDateString()));
    return new Date(date.toDateString()) < new Date(new Date().toDateString());
}

export function getYearMonthFromExpirationDateCard(date) {
    return date.substring(0, 7);
}

export function getMonthFromExpirationDateCard(date) {
    return date.substring(5, 7);
}

export function getYearFromExpirationDateCard(date) {
    return date.substring(0, 4);
}