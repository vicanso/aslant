import {
  INFLUXDB_SERVERS,
} from '../constants/action-types';
import * as influxdb from '../services/influxdb';

export function list() {
  return dispatch => influxdb.list().then(data => dispatch({
    type: INFLUXDB_SERVERS,
    items: data,
  }));
}
