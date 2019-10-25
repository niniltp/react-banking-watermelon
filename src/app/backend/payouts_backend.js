import payoutsDB from "../../database/payouts";
import {setAndGetDataFromLS, setDataInLS} from "../services/localStorageManager";
import {convertToAmount} from "../services/fundsManager";

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
    let payouts =  setAndGetDataFromLS("payouts", payoutsDB);

    payouts = payouts.map((payout) => {
        return {
            ...payout,
            type: "payout"
        }
    });

    return payouts;
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

/**
 * This function converts the JS payout object to the DB format
 * @param payout
 * @returns {{wallet_id: *, amount: *, id: *}}
 */
export function payoutJStoDB(payout) {
    return {
        id: payout.id,
        wallet_id: payout.walletDebited.id,
        amount: convertToAmount(payout.amount)
    }
}