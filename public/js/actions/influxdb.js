import {
  INFLUXDB_ADD_CONFIG,
  INFLUXDB_UPDATE_CONFIG,
  INFLUXDB_LIST_CONFIG,
  INFLUXDB_REMOVE_CONFIG,
} from '../constants/action-types';
import * as influxdb from '../services/influxdb';


export function addConfig(config) {
  return dispatch => influxdb.addConfig(config).then(data => dispatch({
    type: INFLUXDB_ADD_CONFIG,
    item: data,
  }));
}

export function listConfig() {
  return dispatch => influxdb.listConfig().then(data => dispatch({
    type: INFLUXDB_LIST_CONFIG,
    items: data,
  }));
}

export function updateConfig(id, token, config) {
  return dispatch => influxdb.updateConfig(id, token, config).then(data => dispatch({
    type: INFLUXDB_UPDATE_CONFIG,
    item: data,
  }));
}

export function removeConfig(id) {
  return dispatch => influxdb.removeConfig(id).then(() => dispatch({
    type: INFLUXDB_REMOVE_CONFIG,
    id,
  }));
}
