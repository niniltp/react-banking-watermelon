import wallets from "../../database/wallets";

export function getWalletByUserId(user_id){
    const wallet = wallets.find( w => w.user_id === user_id);
    console.log(wallet);
    return wallet;
}