import walletsDB from "../../database/wallets";
import {setAndGetDataFromLS, setDataInLS} from "../services/localStorageManager";

export function getWalletByUserId(userID) {
    const wallets = getWallets();

    return wallets.find(w => w.user_id === userID);
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
* This function updates all the wallets of the DB (replaces with the array in parameter)
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

/*
* This function removes the wallet specified by its id from the DB
* */
export function removeWallet(id) {
    let wallets = getWallets();

    wallets = wallets.filter((item) => item.id !== id);
    updateWallets(wallets);
}