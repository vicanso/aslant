'use strict';
import * as http from '../helpers/http';
import {
  INFLUXDB_ADD_SERVER,
  INFLUXDB_LIST_SERVER,
} from '../constants/action-types';

export function addServer(data) {
  return dispatch => http.post('/influxdb/servers/add')
    .send(data)
    .then(res => {
      const server = res.body;
      dispatch({
        type: INFLUXDB_ADD_SERVER,
        server,
      });
      return server;
    });
}

export function listServer() {
  return dispatch => http.get('/influxdb/servers/list').then(res => dispatch({
    type: INFLUXDB_LIST_SERVER,
    servers: res.body.items || [],
  }));
}

export function editServer(id, token, data) {
  return dispatch => http.put(`/influxdb/server/${id}`)
    .set('X-Token', token)
    .send(data)
    .then(res => {
      console.dir(res);
    });
}

