import * as http from '../helpers/http';
import {
  INFLUXDB_SERVERS,
} from '../constants/urls';

export function list() {
  return http.get(INFLUXDB_SERVERS)
    .then(res => res.body);
}
