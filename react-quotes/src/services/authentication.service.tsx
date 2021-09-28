import { BehaviorSubject } from 'rxjs';

import {axiosInstance} from "../App";


const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')!));

const btoa = (str: string) => Buffer.from(str, 'utf-8').toString('base64');
const getBasicAuth = (username: string, password: string) => 'Basic '+ btoa(`${username}:${password}`)
function getHeaders(username: string, password: string) {
    return {
        'Authorization': getBasicAuth(username, password),
        'Content-Type': 'application/json'
    }
}

export const authenticationService = {
    login,
    register,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function register(username: string, password: string, email: string) {
    return axiosInstance.post('/register', {
        email: email,
        username: username,
        password: password
    })
    .then((response) => {
        console.log('Registered user' + response.data);
        localStorage.setItem('currentUser', JSON.stringify(response.data.accessToken));
        currentUserSubject.next(response.data);
        return undefined;
    })
    .catch((error) => {
        if (error.response){
            if (error.response.status === 409){
                return `User ${username} already exists`
            }
        }
    })
}

function login(username: string, password: string) {
    return axiosInstance.post('/login', {
        username: username,
        password: password
    }, {
        headers: getHeaders(username, password)
    })
    .then((response) => {
        console.log('User logged in : ' + JSON.stringify(response.data));
        localStorage.setItem('currentUser', JSON.stringify(response.data));
        currentUserSubject.next(response.data);
        return undefined;
    })
    .catch((error) => {
        if (error.response) {
            if ([404, 401].indexOf(error.response.status) !== -1){
                return "Invalid credentials";
            }
        }
    })
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}