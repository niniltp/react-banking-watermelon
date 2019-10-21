import transfersDB from "../../database/transfers";
import {setAndGetDataFromLS} from "../services/localStorageManager";

export function getTransfersByCreditedWalletId(wallet_id){
    const transfers = getTransfers();

    return transfers.filter(function(transfer) {
        return transfer.credited_wallet_id === wallet_id;
    });
}

export function getTransfersByDebitedWalletId(wallet_id){
    const transfers = getTransfers();

    return transfers.filter(function(transfer) {
        return transfer.debited_wallet_id === wallet_id;
    });
}

export function getTransfers() {
    return setAndGetDataFromLS("transfers", transfersDB);
}