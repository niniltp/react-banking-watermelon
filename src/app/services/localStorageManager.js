/*
 This function gets data from the localStorage with the key specified.
*/
export function getDataFromLS(key) {
    let dataJSON = localStorage.getItem(key);

    if (dataJSON === null)
        return null;
    else
        return JSON.parse(dataJSON);
}

/*
 This function stores data in the localStorage with the key specified.
*/
export function setDataInLS(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

/*
 This function gets data from the localStorage with the key specified.
 If the key doesn't exist, this function stores data in the localStorage with the key specified et return de data
*/
export function setAndGetDataFromLS(key, data) {
   let dataFromLS = getDataFromLS(key);

    if (dataFromLS === null) {
        setDataInLS(key, data);
        dataFromLS = getDataFromLS(key);
    }

    return dataFromLS;
}

export function setdbIDinLS() {
    localStorage.setItem("dbID", "lcqnp");
}

export function getdbIDFromLS() {
    return localStorage.getItem("dbID");
}

export function checkResetLS() {
    if(getdbIDFromLS() === "lcqnp" )
        return true;
    else{
        resetLS();
        setdbIDinLS();
        return false;
    }
}

export function resetLS() {
    localStorage.clear();
}