import payinsDB from "../../database/payins";
import {setAndGetDataFromLS} from "../services/localStorageManager";

export function getPayinsByWalletId(wallet_id){
    const payins = getPayins();

    return payins.filter(function(payin) {
        return payin.wallet_id === wallet_id;
    });
}

export function getPayins() {
    return setAndGetDataFromLS("payins", payinsDB);
}