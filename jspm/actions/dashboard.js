'use strict';
import * as http from '../helpers/http';
import {
  DASHBOARD_LIST,
  DASHBOARD_ADD,
  DASHBOARD_REMOVE,
} from '../constants/action-types';

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
