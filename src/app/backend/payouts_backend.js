import payoutsDB from "../../database/payouts";
import {setAndGetDataFromLS, setDataInLS} from "../services/localStorageManager";

/*
* This function returns all the payouts of the wallet specified by its id from the DB
* */
export function getPayoutsByWalletId(wallet_id) {
    const payouts = getPayouts();

    return payouts.filter(function (payouts) {
        return payouts.wallet_id === wallet_id;
    });
}

/*
* This function returns all the payouts from the DB
* */
export function getPayouts() {
    return setAndGetDataFromLS("payouts", payoutsDB);
}

/*
* This function adds a payout in the DB
* */
export function addPayout(payout) {
    let payouts = getPayouts();
    payouts.push(payout);
    updatePayouts(payouts);
}

/*
* This function updates all the payouts of the DB
* */
export function updatePayouts(payouts) {
    setDataInLS("payouts", payouts);
}

/*
* This function updates the payout specified in parameter in the DB
* */
export function updatePayout(payout) {
    let payouts = getPayouts();
    let index = payouts.findIndex(obj => obj.id === payout.id);
    payouts[index] = payout;
    updatePayouts(payouts);
}
