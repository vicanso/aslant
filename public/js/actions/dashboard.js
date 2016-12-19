import {
  INFLUXDB_ADD_DASHBOARD,
  INFLUXDB_UPDATE_DASHBOARD,
  INFLUXDB_LIST_DASHBOARD,
  INFLUXDB_REMOVE_DASHBOARD,
} from '../constants/action-types';
import * as dashboardService from '../services/dashboard';

export function add(dashboard) {
  return dispatch => dashboardService.add(dashboard).then(data => dispatch({
    type: INFLUXDB_ADD_DASHBOARD,
    item: data,
  }));
}

export function list(params) {
  return dispatch => dashboardService.list(params).then(data => dispatch({
    type: INFLUXDB_LIST_DASHBOARD,
    items: data,
  }));
}

export function update(id, token, dashboard) {
  return dispatch => dashboardService.update(id, token, dashboard).then(data => dispatch({
    type: INFLUXDB_UPDATE_DASHBOARD,
    item: data,
  }));
}

export function remove(id) {
  return dispatch => dashboardService.remove(id).then(() => dispatch({
    type: INFLUXDB_REMOVE_DASHBOARD,
    id,
  }));
}
