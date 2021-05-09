import https from './httpServices';
import {apiURL} from '../config.json';

export function getGenres() {
  return https.get(apiURL + '/genres');
}
