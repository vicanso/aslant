
import * as http from '../helpers/http';
import {
  INFLUXDB_DASHBOARDS,
} from '../constants/urls';

export function list() {
  return http.get(INFLUXDB_DASHBOARDS)
    .set('Cache-Control', 'no-cache')
    .then(res => res.body);
}

export function add(data) {
  return http.post(INFLUXDB_DASHBOARDS)
    .set('Cache-Control', 'no-cache')
    .send(data)
    .then(res => res.body);
}

export function remove(id) {
  return http.del(`${INFLUXDB_DASHBOARDS}/${id}`)
    .set('Cache-Control', 'no-cache')
    .then(res => res.body);
}

export function update(id, token, data) {
  return http.put(`${INFLUXDB_DASHBOARDS}/${id}`)
    .set('X-Token', token)
    .set('Cache-Control', 'no-cache')
    .send(data)
    .then(res => res.body);
}
