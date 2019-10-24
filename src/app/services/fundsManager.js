import {getUserIDAuth} from "./authenticationManager";
import {isCardValid} from "./checkCardValidity";

function isAmountValid(amount) {
    return amount > 0;
}

export function isWithdrawValid(wallet, card, amount) {
    return wallet.user_id === getUserIDAuth() && isAmountValid(amount) && wallet.balance - convertInAmount(amount) >= 0 && isCardValid(card);
}

export function isDepositValid(wallet, card, amount) {
    return wallet.user_id === getUserIDAuth() && isAmountValid(amount) && isCardValid(card);
}

export function isTransferValid(walletDebited, walletCredited, amount) {
    return walletDebited.user_id === getUserIDAuth() && walletDebited.balance - convertInAmount(amount) >= 0;
}

export function convertInWM(amount) {
    return amount / 100;
}

export function convertInAmount(amount) {
    return amount * 100;
}