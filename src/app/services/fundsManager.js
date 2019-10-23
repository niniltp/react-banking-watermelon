import {getUserIDAuth} from "./authenticationManager";
import {isCardValid} from "./checkCardValidity";

function isAmountValid(amount) {
    return amount > 0;
}

export function isWithdrawValid(wallet, card, amount) {
    return wallet.user_id === getUserIDAuth() && isAmountValid(amount) && wallet.balance - amount >= 0 && isCardValid(card);
}