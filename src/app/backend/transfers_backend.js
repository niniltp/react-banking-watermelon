import transfersDB from "../../database/transfers";
import {setAndGetDataFromLS, setDataInLS} from "../services/localStorageManager";
import {convertToAmount} from "../services/fundsManager";

/**
 * This function returns all the transfers from the credited wallet specified by its id from the DB
 * @param wallet_id
 * @returns {*}
 */
export function getTransfersByCreditedWalletId(wallet_id) {
    const transfers = getTransfers();

    return transfers.filter(function (transfer) {
        return transfer.credited_wallet_id === wallet_id;
    });
}

/**
 * This function returns all the transfers from the debited wallet specified by its id from the DB
 * @param wallet_id
 * @returns {*}
 */
export function getTransfersByDebitedWalletId(wallet_id) {
    const transfers = getTransfers();

    return transfers.filter(function (transfer) {
        return transfer.debited_wallet_id === wallet_id;
    });
}

/**
 * This function returns all the transfers from the DB
 * @returns {*}
 */
export function getTransfers() {
    let transfers = setAndGetDataFromLS("transfers", transfersDB);

    transfers = transfers.map((transfer) => {
        return {
            ...transfer,
            type: "transfer"
        }
    });

    return transfers;
}

/**
 * This function adds a transfer in the DB
 * @param transfer
 */
export function addTransfer(transfer) {
    let transfers = getTransfers();
    transfers.push(transfer);
    updateTransfers(transfers);
}

/**
 * This function updates all the transfers of the DB
 * @param transfers
 */
export function updateTransfers(transfers) {
    setDataInLS("transfers", transfers);
}

/**
 * This function updates the transfer specified in parameter in the DB
 * @param transfer
 */
export function updateTransfer(transfer) {
    let transfers = getTransfers();
    let index = transfers.findIndex(obj => obj.id === transfer.id);
    transfers[index] = transfer;
    updateTransfers(transfers);
}

/**
 * This function converts the JS transfer object to the DB format
 * @param transfer JS obejct
 * @returns {{debited_wallet_id: *, amount: *, walletCredited: *, id: *}}
 */
export function transferJStoDB(transfer) {
    return {
        id: transfer.id,
        debited_wallet_id: transfer.walletDebited.id,
        credited_wallet_id: transfer.walletCredited.id,
        amount: convertToAmount(transfer.amount)
    }
}