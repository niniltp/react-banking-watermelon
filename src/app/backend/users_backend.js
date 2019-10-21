import {getDataFromLS, setDataInLS} from "../services/localStorageManager";
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
    const key = "users";

    let data = getDataFromLS(key);

    if (data === null) {
        setDataInLS(key, usersDB);
        data = getDataFromLS(key);
    }

    return data;
}