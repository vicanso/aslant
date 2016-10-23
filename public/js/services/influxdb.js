import * as http from '../helpers/http';
import {
  INFLUXDB_SERVER,
} from '../constants/urls';

export function list() {
  return http.get(INFLUXDB_SERVER)
    .then(res => res.body);
}

export function add(data) {
  return http.post(INFLUXDB_SERVER)
    .send(data)
    .then(res => res.body);
}
