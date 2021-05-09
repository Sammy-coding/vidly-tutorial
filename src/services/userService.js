import https from './httpServices';
import {apiURL} from '../config.json';

const apiEndPoint = apiURL + "/users";

export function register(user) {
    
    return https.post(apiEndPoint, {
        email: user.username,
        password: user.password,
        name: user.person
    });
}