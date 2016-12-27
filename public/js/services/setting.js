import * as http from '../helpers/http';
import {
  USER_SETTING,
} from '../constants/urls';

export function get() {
  return http.get(USER_SETTING)
    .set('Cache-Control', 'no-cache')
    .then(res => res.body);
}

export function update(id, data, token) {
  return http.put(USER_SETTING)
    .set('Cache-Control', 'no-cache')
    .set('X-Token', token)
    .send(data)
    .then(res => res.body);
}

export function add(data) {
  return http.post(USER_SETTING)
    .set('Cache-Control', 'no-cache')
    .send(data)
    .then(res => res.body);
}
