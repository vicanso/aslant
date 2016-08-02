'use strict';
import * as _ from 'lodash';
import * as http from 'aslant/helpers/http';
import {
  CONFIGURE_LIST,
  CONFIGURE_ADD,
  CONFIGURE_UPDATE,
  CONFIGURE_REMOVE,
} from 'aslant/constants/action-types';

export function getByIds(ids) {
  const queryString = _.map(ids, id => `id=${id}`).join('&');
  return http.get(`/api/configures?${queryString}`)
    .then(res => res.body);
}

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
