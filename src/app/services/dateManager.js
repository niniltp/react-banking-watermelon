export function isDateBeforeToday(date) {
    return new Date(date.toDateString()) < new Date(new Date().toDateString());
}

export function getYearMonthFromExpirationDateCard(date) {
    if(date) {
        if(date.length >= 7)
            return date.substring(0, 7);
    }

    return date;
}

export function getMonthFromExpirationDateCard(date) {
    if(date) {
        if(date.length >= 7)
            return date.substring(5, 7);
    }

    return date;
}

export function getYearFromExpirationDateCard(date) {
    if(date) {
        if(date.length >= 7)
            return date.substring(0, 4);
    }

    return date;
}