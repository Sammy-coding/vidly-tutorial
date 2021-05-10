import https from './httpServices';
import {apiURL} from '../config.json';
import jwtDecode from "jwt-decode";

const apiEndPoint = apiURL + '/auth';

export async function Login(email, password) {
    const {data: jwt} = await https.post(apiEndPoint, {email, password});
    localStorage.setItem('token', jwt);
}

export function Logout() {
    localStorage.removeItem("token");
}

export function LoginWith(jwt) {
    localStorage.setItem("token", jwt)
}

export function getCurrentUser () {
    try {
      const jwt = localStorage.getItem("token");
      return jwtDecode(jwt);
    } catch (ex) {return null;}
}

export default{
    Login,
    LoginWith,
    Logout,
    getCurrentUser
}