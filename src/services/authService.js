import https from './httpServices';
import {apiURL} from '../config.json';

const apiEndPoint = apiURL + '/auth';

export function Login(email, password) {
    return https.post(apiEndPoint, {email, password});
}