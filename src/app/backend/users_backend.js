import {getDataFromLS, setAndGetDataFromLS, setDataInLS} from "../services/localStorageManager";
import usersDB from "../../database/users";

export function getUserById(user_id){
    const users = getUsers();

    return users.find(u => u.user_id === user_id);
}

export function getUserByEmail(email){
    const users = getUsers();

    return users.find(u => u.email === email);
}

export function getUsers() {
    return setAndGetDataFromLS("users", usersDB);
}

export function updateUsers(users) {
    setDataInLS("users", usersDB);
}