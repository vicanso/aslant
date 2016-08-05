'use strict';
/* eslint import/no-unresolved:0 */
import * as http from 'aslant/helpers/http';
import {
  SERVER_ADD,
  SERVER_LIST,
  SERVER_EDIT,
  SERVER_REMOVE,
} from 'aslant/constants/action-types';

export function add(data) {
  return dispatch => http.post('/api/servers')
    .send(data)
    .then(res => {
      const server = res.body;
      dispatch({
        type: SERVER_ADD,
        server,
      });
      return server;
    });
}

export function list() {
  return dispatch => http.get('/api/servers').then(res => dispatch({
    type: SERVER_LIST,
    servers: res.body.items || [],
  }));
}

export function edit(id, token, data) {
  return dispatch => http.put(`/api/servers/${id}`)
    .set('X-Token', token)
    .send(data)
    .then(res => dispatch({
      type: SERVER_EDIT,
      server: res.body,
    }));
}

export function remove(id) {
  return dispatch => http.del(`/api/servers/${id}`)
    .then(() => dispatch({
      type: SERVER_REMOVE,
      id,
    }));
}
