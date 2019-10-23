/*
This function is used to authenticate and connect the user
*/
export function authenticateUser() {
    localStorage.setItem(isAuthenticated, "true");
}

/*
This function is used to disconnect the user
*/
export function disconnectUser() {
    localStorage.setItem(isAuthenticated, "false");
}

/*
This function is used to know if the user is authenticated or not
*/
export function isAuthenticated() {
    if(localStorage.getItem(isAuthenticated) === "true") {
        return true;
    }

    // Else (if false or null)
    return false;
}