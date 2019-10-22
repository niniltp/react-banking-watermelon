import payinsDB from "../../database/payins";
import {setAndGetDataFromLS, setDataInLS} from "../services/localStorageManager";

/*
* This function returns all the payins of the wallet specified by its id from the DB
* */
export function getPayinsByWalletId(wallet_id) {
    const payins = getPayins();

    return payins.filter(function (payin) {
        return payin.wallet_id === wallet_id;
    });
}

/*
* This function returns all the payins from the DB
* */
export function getPayins() {
    return setAndGetDataFromLS("payins", payinsDB);
}

/*
* This function adds a payin in the DB
* */
export function addPayin(payin) {
    let payins = getPayins();
    payins.push(payin);
    updatePayins(payins);
}

/*
* This function updates all the payins of the DB
* */
export function updatePayins(payins) {
    setDataInLS("payins", payins);
}

/*
* This function updates the payin specified in parameter in the DB
* */
export function updatePayin(payin) {
    let payins = getPayins();
    let index = payins.findIndex(obj => obj.id === payin.id);
    payins[index] = payin;
    updatePayins(payins);
}