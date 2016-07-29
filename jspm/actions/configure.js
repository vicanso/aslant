'use strict';
import * as http from '../helpers/http';
import {
  CONFIGURE_LIST,
  CONFIGURE_ADD,
  CONFIGURE_UPDATE,
  CONFIGURE_REMOVE,
} from '../constants/action-types';

export function add(data) {
  return dispatch => http.post('/api/configures', data)
    .then(res => dispatch({
      type: CONFIGURE_ADD,
      configure: res.body,
    }));
}

export function list() {
  return dispatch => http.get('/api/configures')
    .then(res => dispatch({
      type: CONFIGURE_LIST,
      configures: res.body.items || [],
    }));
}

export function update(id, token, data) {
  return dispatch => http.put(`/api/configures/${id}`)
    .set('X-Token', token)
    .send(data)
    .then(res => dispatch({
      type: CONFIGURE_UPDATE,
      configure: res.body,
    }));
}

export function remove(id) {
  return dispatch => http.del(`/api/configures/${id}`)
    .then(() => {
      dispatch({
        type: CONFIGURE_REMOVE,
        id,
      });
    });
}
