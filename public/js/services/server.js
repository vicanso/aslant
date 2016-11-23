import * as http from '../helpers/http';
import {
  INFLUXDB_SERVER,
} from '../constants/urls';

export function list() {
  return http.get(INFLUXDB_SERVER)
    .set('Cache-Control', 'no-cache')
    .then(res => res.body);
}

export function add(data) {
  return http.post(INFLUXDB_SERVER)
    .set('Cache-Control', 'no-cache')
    .send(data)
    .then(res => res.body);
}

export function update(id, data, token) {
  return http.put(`${INFLUXDB_SERVER}/${id}`)
    .set('Cache-Control', 'no-cache')
    .set('X-Token', token)
    .send(data)
    .then(res => res.body);
}

export function remove(id) {
  return http.del(`${INFLUXDB_SERVER}/${id}`)
    .set('Cache-Control', 'no-cache')
    .then(res => res.body);
}
