import walletsDB from "../../database/wallets";
import {setAndGetDataFromLS, setDataInLS} from "../services/localStorageManager";

export function getWalletByUserId(user_id) {
    const wallets = getWallets();

    return wallets.find(w => w.user_id === user_id);
}

export function getWallets() {
    return setAndGetDataFromLS("wallets", walletsDB);
}

export function updateWallets(wallets) {
    setDataInLS("wallets", walletsDB);
}