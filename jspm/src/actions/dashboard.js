'use strict';
import * as http from 'aslant/helpers/http';
import {
  DASHBOARD_LIST,
  DASHBOARD_ADD,
  DASHBOARD_REMOVE,
  DASHBOARD_UPDATE,
} from 'aslant/constants/action-types';

export function add(data) {
  return dispatch => http.post('/api/dashboards', data)
    .then(res => dispatch({
      type: DASHBOARD_ADD,
      dashboard: res.body,
    }));
}

export function list() {
  return dispatch => http.get('/api/dashboards')
    .then(res => dispatch({
      type: DASHBOARD_LIST,
      dashboards: res.body.items || [],
    }));
}

export function remove(id) {
  return dispatch => http.del(`/api/dashboards/${id}`)
    .then(() => {
      dispatch({
        type: DASHBOARD_REMOVE,
        id,
      });
    });
}

export function update(id, token, data) {
  return dispatch => http.put(`/api/dashboards/${id}`)
    .set('X-Token', token)
    .send(data)
    .then(res => dispatch({
      type: DASHBOARD_UPDATE,
      dashboard: res.body,
    }));
}
