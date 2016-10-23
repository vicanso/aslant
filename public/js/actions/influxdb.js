import {
  INFLUXDB_SERVERS,
  INFLUXDB_ADD_SERVER,
} from '../constants/action-types';
import * as influxdb from '../services/influxdb';

export function list() {
  return dispatch => influxdb.list().then(data => dispatch({
    type: INFLUXDB_SERVERS,
    items: data,
  }));
}

export function add(server) {
  return dispatch => influxdb.add(server).then(data => dispatch({
    type: INFLUXDB_ADD_SERVER,
    item: data,
  }));
}
