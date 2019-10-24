import {getUserIDAuth} from "./authenticationManager";
import {isCardValid} from "./checkCardValidity";
import {addTransfer, transferJStoDB} from "../backend/transfers_backend";
import {updateWallet} from "../backend/wallets_backend";
import {addPayin, payinJStoDB} from "../backend/payins_backend";
import {addPayout, payoutJStoDB} from "../backend/payouts_backend";

function isAmountValid(amount) {
    return amount > 0;
}

export function isFundSufficient(walletDebited, amount) {
    return walletDebited.balance - convertToAmount(amount) >= 0;
}

export function isWithdrawValid(payout, card) {
    const wallet = payout.walletDebited;
    const amount = payout.amount;
    return wallet.user_id === getUserIDAuth() && isAmountValid(amount) && wallet.balance - convertToAmount(amount) >= 0 && isCardValid(card);
}

export function makeWithdraw(payout) {
    const payoutDB = payoutJStoDB(payout);
    let newWallet = payout.walletDebited;
    const amount = payout.amount;

    newWallet.balance = newWallet.balance - convertToAmount(amount);
    updateWallet(newWallet);

    addPayout(payoutDB);
}

export function isDepositValid(payin, card) {
    const wallet = payin.walletCredited;
    const amount = payin.amount;
    return wallet.user_id === getUserIDAuth() && isAmountValid(amount) && isCardValid(card);
}

export function makeDeposit(payin) {
    const payinDB = payinJStoDB(payin);
    let newWallet = payin.walletCredited;
    const amount = payin.amount;

    newWallet.balance = newWallet.balance + convertToAmount(amount);
    updateWallet(newWallet);

    addPayin(payinDB);
}

export function isTransferValid(transfer) {
    const walletDebited = transfer.walletDebited;
    const amount = transfer.amount;
    return walletDebited.user_id === getUserIDAuth() && isAmountValid(amount) && walletDebited.balance - convertToAmount(amount) >= 0;
}

export function makeTransfer(transfer) {
    const transferDB = transferJStoDB(transfer);

    let newWalletDebited = transfer.walletDebited;
    let newWalletCredited = transfer.walletCredited;
    const amount = transfer.amount;

    newWalletDebited.balance = newWalletDebited.balance - convertToAmount(amount);
    newWalletCredited.balance = newWalletCredited.balance + convertToAmount(amount);

    updateWallet(newWalletDebited);
    updateWallet(newWalletCredited);

    addTransfer(transferDB);
}

export function convertToWM(amount) {
    return amount / 100;
}

export function convertToAmount(amount) {
    return (amount * 100);
}