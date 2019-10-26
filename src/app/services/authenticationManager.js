/**
 * This function is used to authenticate and connect the user
 * @param user
 */
export function authenticateUser(user) {
    if (user) {
        localStorage.setItem("isAuth", "true");
        localStorage.setItem("userID", user.id);
        if (user.is_admin === true)
            localStorage.setItem("isAdmin", "true");
        else
            localStorage.setItem("isAdmin", "false");
    }
}

/**
 * This function is used to disconnect the user
 */
export function disconnectUser() {
    localStorage.setItem("isAuth", "false");
    localStorage.setItem("userID", null);
    localStorage.setItem("isAdmin", "false");
}

/**
 * This function is used to know if the user is authenticated or not
 * @returns {boolean}
 */
export function isAuth() {
    if (localStorage.getItem("isAuth") === "true" && localStorage.getItem("userID") !== null) {
        return true;
    }

    // Else (if false or null)
    return false;
}

/**
 * This function is used to know if the user is an admin or not
 * @returns {boolean}
 */
export function isAdmin() {
    return (isAuth() && localStorage.getItem("isAdmin") === "true");
}

/**
 * This function is used to get the ID of the authenticated user (if he is connected)
 * @returns {null|number}
 */
export function getUserIDAuth() {
    if (isAuth()) return parseInt(localStorage.getItem("userID"));
    else return null;
}