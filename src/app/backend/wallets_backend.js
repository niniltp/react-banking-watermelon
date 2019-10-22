import walletsDB from "../../database/wallets";
import {setAndGetDataFromLS, setDataInLS} from "../services/localStorageManager";

export function getWalletByUserId(user_id) {
    const wallets = getWallets();

    return wallets.find(w => w.user_id === user_id);
}

export function getWallets() {
    return setAndGetDataFromLS("wallets", walletsDB);
}

/*
* This function adds a wallet in the DB
* */
export function addWallet(wallet) {
    let wallets = getWallets();
    wallets.push(wallet);
    updateWallets(wallets);
}

/*
* This function updates all the wallets of the DB
* */
export function updateWallets(wallets) {
    setDataInLS("wallets", wallets);
}

/*
* This function updates the wallet specified in parameter in the DB
* */
export function updateWallet(wallet) {
    let wallets = getWallets();
    let index = wallets.findIndex(obj => obj.id === wallet.id);
    wallets[index] = wallet;
    updateWallets(wallets);
}