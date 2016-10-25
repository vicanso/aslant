import * as http from '../helpers/http';
import {
  INFLUXDB_SERVER,
  INFLUXDB_DATABASES,
  INFLUXDB_RPS,
  INFLUXDB_MEASUREMENTS,
  INFLUXDB_TAG_KEYS,
  INFLUXDB_FIELD_KEYS,
  INFLUXDB_SERIES,
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

export function update(id, data, token) {
  return http.put(`${INFLUXDB_SERVER}/${id}`)
    .set('X-Access-Token', token)
    .send(data)
    .then(res => res.body);
}

export function remove(id) {
  return http.del(`${INFLUXDB_SERVER}/${id}`)
    .then(res => res.body);
}

export function showDatabases(id) {
  return http.get(INFLUXDB_DATABASES.replace(':id', id))
    .then(res => res.body);
}

export function showRps(id, db) {
  const url = INFLUXDB_RPS.replace(':id', id).replace(':db', db);
  return http.get(url).then(res => res.body);
}

export function showMeasurements(id, db) {
  const url = INFLUXDB_MEASUREMENTS.replace(':id', id).replace(':db', db);
  return http.get(url).then(res => res.body);
}

export function showTagKeys(id, db) {
  const url = INFLUXDB_TAG_KEYS.replace(':id', id).replace(':db', db);
  return http.get(url).then(res => res.body);
}

export function showFieldKeys(id, db) {
  const url = INFLUXDB_FIELD_KEYS.replace(':id', id).replace(':db', db);
  return http.get(url).then(res => res.body);
}

export function showSeries(id, db) {
  const url = INFLUXDB_SERIES.replace(':id', id).replace(':db', db);
  return http.get(url).then(res => res.body);
}
