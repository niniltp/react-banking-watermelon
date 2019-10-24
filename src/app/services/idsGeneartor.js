export function generateID(prefix) {
    const seperator = "_";
    const date = (Date.now()).toString();

    return prefix + seperator + date;
}