import {
  INFLUXDB_SERVERS,
  INFLUXDB_ADD_SERVER,
  INFLUXDB_UPDATE_SERVER,
  INFLUXDB_REMOVE_SERVER,
  INFLUXDB_RESET,
  INFLUXDB_ADD_CONFIG,
  INFLUXDB_UPDATE_CONFIG,
  INFLUXDB_LIST_CONFIG,
  INFLUXDB_REMOVE_CONFIG,
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

export function update(id, updateData, token) {
  return dispatch => influxdb.update(id, updateData, token).then(data => dispatch({
    type: INFLUXDB_UPDATE_SERVER,
    item: data,
  }));
}

export function remove(id) {
  return dispatch => influxdb.remove(id).then(() => dispatch({
    type: INFLUXDB_REMOVE_SERVER,
    id,
  }));
}

export function reset() {
  return {
    type: INFLUXDB_RESET,
  };
}

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
