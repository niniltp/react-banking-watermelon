import payoutsDB from "../../database/payouts";
import {setAndGetDataFromLS} from "../services/localStorageManager";

export function getPayoutsByWalletId(wallet_id){
    const payouts = getPayouts();

    return payouts.filter(function(payouts) {
        return payouts.wallet_id === wallet_id;
    });
}

export function getPayouts() {
    return setAndGetDataFromLS("payouts", payoutsDB);
}