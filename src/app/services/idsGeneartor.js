export function generateID() {
    const date = (Date.now()).toString();
    return parseInt(date);
}