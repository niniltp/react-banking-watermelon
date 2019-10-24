/*
This function is used to authenticate and connect the user
*/
export function authenticateUser(userID) {
    localStorage.setItem("isAuth", "true");
    localStorage.setItem("userID", userID);
}

/*
This function is used to disconnect the user
*/
export function disconnectUser() {
    localStorage.setItem("isAuth", "false");
    localStorage.setItem("userID", null);
}

/*
This function is used to know if the user is authenticated or not
*/
export function isAuth() {
    if(localStorage.getItem("isAuth") === "true" && localStorage.getItem("userID") !== null) {
        return true;
    }

    // Else (if false or null)
    return false;
}

/*
This function is used to get the ID of the authenticated user (if he is connected)
*/
export function getUserIDAuth() {
    if(isAuth()) return parseInt(localStorage.getItem("userID"));
}