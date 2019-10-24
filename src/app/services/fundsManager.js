import {getUserIDAuth} from "./authenticationManager";
import {isCardValid} from "./checkCardValidity";
import {addTransfer, transferJStoDB} from "../backend/transfers_backend";
import {updateWallet} from "../backend/wallets_backend";

function isAmountValid(amount) {
    return amount > 0;
}

export function isWithdrawValid(wallet, card, amount) {
    return wallet.user_id === getUserIDAuth() && isAmountValid(amount) && wallet.balance - convertInAmount(amount) >= 0 && isCardValid(card);
}

export function isDepositValid(wallet, card, amount) {
    return wallet.user_id === getUserIDAuth() && isAmountValid(amount) && isCardValid(card);
}

export function isTransferValid(transfer) {
    const walletDebited = transfer.walletDebited;
    const amount = transfer.amount;
    return walletDebited.user_id === getUserIDAuth() && isAmountValid(amount) && walletDebited.balance - convertInAmount(amount) >= 0;
}

export function makeTransfer(transfer) {
    const transferDB = transferJStoDB(transfer);

    let newWalletDebited = transfer.walletDebited;
    let newWalletCredited = transfer.walletCredited;
    const amount = transfer.amount;

    newWalletDebited.balance = newWalletDebited.balance - convertInAmount(amount);
    newWalletCredited.balance = newWalletCredited.balance + convertInAmount(amount);

    updateWallet(newWalletDebited);
    updateWallet(newWalletCredited);

    addTransfer(transferDB);
}

export function convertInWM(amount) {
    return amount / 100;
}

export function convertInAmount(amount) {
    return amount * 100;
}