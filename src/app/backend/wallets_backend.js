import walletsDB from "../../database/wallets";
import {setAndGetDataFromLS} from "../services/localStorageManager";

export function getWalletByUserId(user_id) {
    const wallets = getWallets();

    return wallets.find(w => w.user_id === user_id);
}

export function getWallets() {
    return setAndGetDataFromLS("wallets", walletsDB);
}