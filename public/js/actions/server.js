import {
  INFLUXDB_SERVERS,
  INFLUXDB_ADD_SERVER,
  INFLUXDB_UPDATE_SERVER,
  INFLUXDB_REMOVE_SERVER,
  INFLUXDB_RESET,
} from '../constants/action-types';
import * as serverService from '../services/server';


export function list() {
  return dispatch => serverService.list().then(data => dispatch({
    type: INFLUXDB_SERVERS,
    items: data,
  }));
}

export function add(server) {
  return dispatch => serverService.add(server).then(data => dispatch({
    type: INFLUXDB_ADD_SERVER,
    item: data,
  }));
}

export function update(id, updateData, token) {
  return dispatch => serverService.update(id, updateData, token).then(data => dispatch({
    type: INFLUXDB_UPDATE_SERVER,
    item: data,
  }));
}

export function remove(id) {
  return dispatch => serverService.remove(id).then(() => dispatch({
    type: INFLUXDB_REMOVE_SERVER,
    id,
  }));
}

export function reset() {
  return {
    type: INFLUXDB_RESET,
  };
}
