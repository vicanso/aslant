'use strict';
import * as http from '../helpers/http';
import {
  INFLUXDB_ADD_SERVER,
  INFLUXDB_LIST_SERVER,
  INFLUXDB_EDIT_SERVER,
  INFLUXDB_REMOVE_SERVER,
  INFLUXDB_LIST_DATABASE,
  INFLUXDB_LIST_RP,
  INFLUXDB_LIST_MEASUREMENT,
  INFLUXDB_LIST_TAG_INFO,
  INFLUXDB_LIST_FIELDS,
  INFLUXDB_LIST_CONFIGURE,
  INFLUXDB_ADD_CONFIGURE,
  INFLUXDB_UPDATE_CONFIGURE,
  INFLUXDB_REMOVE_CONFIGURE,
  INFLUXDB_ADD_DASHBOARD,
} from '../constants/action-types';

export function addServer(data) {
  return dispatch => http.post('/influxdb/servers')
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
  return dispatch => http.get('/influxdb/servers').then(res => dispatch({
    type: INFLUXDB_LIST_SERVER,
    servers: res.body.items || [],
  }));
}

export function editServer(id, token, data) {
  return dispatch => http.put(`/influxdb/servers/${id}`)
    .set('X-Token', token)
    .send(data)
    .then(res => dispatch({
      type: INFLUXDB_EDIT_SERVER,
      server: res.body,
    }));
}

export function removeServer(id) {
  return dispatch => http.del(`/influxdb/servers/${id}`)
    .then(() => dispatch({
      type: INFLUXDB_REMOVE_SERVER,
      id,
    }));
}

export function listDatabase(id) {
  return dispatch => http.get(`/influxdb/${id}/databases`)
    .then(res => dispatch({
      type: INFLUXDB_LIST_DATABASE,
      id,
      databases: res.body.items || [],
    }));
}

export function listRP(id, database) {
  return dispatch => http.get(`/influxdb/${id}/${database}/rps`)
    .then(res => dispatch({
      type: INFLUXDB_LIST_RP,
      id,
      database,
      rps: res.body.items || [],
    }));
}

export function listMeasurement(id, database) {
  return dispatch => http.get(`/influxdb/${id}/${database}/measurements`)
    .then(res => dispatch({
      type: INFLUXDB_LIST_MEASUREMENT,
      id,
      database,
      measurements: res.body.items || [],
    }));
}

export function listTagInfos(id, database, measurement) {
  return dispatch => http.get(`/influxdb/${id}/${database}/${measurement}/tag-infos`)
    .then(res => dispatch({
      type: INFLUXDB_LIST_TAG_INFO,
      id,
      database,
      measurement,
      tagInfos: res.body.items || [],
    }));
}

export function listField(id, database, measurement) {
  return dispatch => http.get(`/influxdb/${id}/${database}/${measurement}/fields`)
    .then(res => dispatch({
      type: INFLUXDB_LIST_FIELDS,
      id,
      database,
      measurement,
      fields: res.body.items || [],
    }));
}

export function getPoints(id, database, ql) {
  return http.get(`/influxdb/${id}/${database}/points?ql=${encodeURIComponent(ql)}`)
    .then(res => res.body.items || []);
}

export function addConfigure(data) {
  return dispatch => http.post('/influxdb/configures', data)
    .then(res => dispatch({
      type: INFLUXDB_ADD_CONFIGURE,
      configure: res.body,
    }));
}

export function listConfigure() {
  return dispatch => http.get('/influxdb/configures')
    .then(res => dispatch({
      type: INFLUXDB_LIST_CONFIGURE,
      configures: res.body.items || [],
    }));
}

export function updateConfigure(id, token, data) {
  return dispatch => http.put(`/influxdb/configures/${id}`)
    .set('X-Token', token)
    .send(data)
    .then(res => dispatch({
      type: INFLUXDB_UPDATE_CONFIGURE,
      configure: res.body,
    }));
}

export function removeConfigure(id) {
  return dispatch => http.del(`/influxdb/configures/${id}`)
    .then(() => {
      dispatch({
        type: INFLUXDB_REMOVE_CONFIGURE,
        id,
      });
    });
}

export function addDashboard(data) {
  return dispatch => http.post('/influxdb/dashboards', data)
    .then(res => dispatch({
      type: INFLUXDB_ADD_DASHBOARD,
      dashboard: res.body,
    }));
}
