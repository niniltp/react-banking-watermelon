export function generateID() {
    const max = 1000;
    const date = (Date.now()).toString();
    const rand = getRandomInt(max).toString();
    return parseInt(date.concat(rand));
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
