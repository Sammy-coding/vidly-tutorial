import https from './httpServices';
import {apiURL} from '../config.json';

const apiEndPoint = apiURL + '/movies';

export function getMovies() {
  return https.get(apiEndPoint);
}

export function deleteMovie(id) {
  return https.delete(apiEndPoint + '/' + id);
}

export function getMovie(id) {
  return https.get(apiEndPoint + '/' + id);
}

export function saveMovie(movie) {
  if(movie._id) {
    const body = {...movie};
    delete body._id;
    return https.put(apiEndPoint + '/' + movie._id, body);
  }
  return https.post(apiEndPoint + '/' + movie._id, movie);
}