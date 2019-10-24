import payinsDB from "../../database/payins";
import {setAndGetDataFromLS, setDataInLS} from "../services/localStorageManager";
import {convertToAmount} from "../services/fundsManager";

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

/**
 * This function converts the JS payin object to the DB format
 * @param payin
 * @returns {{wallet_id: *, amount: *, id: *}}
 */
export function payinJStoDB(payin) {
    return {
        id: payin.id,
        wallet_id: payin.walletCredited.id,
        amount: convertToAmount(payin.amount)
    }
}