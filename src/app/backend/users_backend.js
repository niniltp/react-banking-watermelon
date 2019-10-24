import {setAndGetDataFromLS, setDataInLS} from "../services/localStorageManager";
import usersDB from "../../database/users";

/*
* This function returns the user specified by its id from the DB
* */
export function getUserById(user_id) {
    const users = getUsers();

    return users.find(u => u.user_id === user_id);
}

/*
* This function returns the user specified by its email from the DB
* */
export function getUserByEmail(email) {
    const users = getUsers();

    return users.find(u => u.email === email);
}

/*
This function returns all the users from DB
*/
export function getUsers() {
    return setAndGetDataFromLS("users", usersDB);
}

/*
This function returns all the users except the one specified in parameter from DB
*/
export function getUsersExcept(user_id) {
    const users = setAndGetDataFromLS("users", usersDB);

    return users.filter((user) => {
        return user.user_id === user_id
    });
}

/*
* This function adds a user in the DB
* */
export function addUser(user) {
    let users = getUsers();
    users.push(user);
    updateUsers(users);
}

/*
* This function updates all the users of the DB (replaces with the array in parameter)
* */
export function updateUsers(users) {
    setDataInLS("users", users);
}

/*
* This function updates the user specified in parameter in the DB
* */
export function updateUser(user) {
    let users = getUsers();
    let index = users.findIndex(obj => obj.user_id === user.user_id);
    users[index] = user;
    updateUsers(users);
}

/*
* This function removes the user specified by its id from the DB
* */
export function removeUser(user_id) {
    let users = getUsers();
    users = users.filter((item) => item.id !== user_id);
    updateUsers(users);
}