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
  INFLUXDB_LIST_TAG_KEY,
  INFLUXDB_LIST_SERIES,
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

export function removeServer(id, token) {
  return dispatch => http.del(`/influxdb/servers/${id}`)
    .set('X-Token', token)
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

export function listRP(id, db) {
  return dispatch => http.get(`/influxdb/${id}/${db}/rps`)
    .then(res => dispatch({
      type: INFLUXDB_LIST_RP,
      id,
      db,
      rps: res.body.items || [],
    }));
}

export function listMeasurement(id, db) {
  return dispatch => http.get(`/influxdb/${id}/${db}/measurements`)
    .then(res => dispatch({
      type: INFLUXDB_LIST_MEASUREMENT,
      id,
      db,
      measurements: res.body.items || [],
    }));
}

export function listTagInfos(id, db, measurement) {
  return dispatch => http.get(`/influxdb/${id}/${db}/${measurement}/tag-infos`)
    .then(res => dispatch({
      type: INFLUXDB_LIST_TAG_INFO,
      id,
      db,
      measurement,
      tagInfos: res.body.items || [],
    }));
}

export function listTagKey(id, db, measurement) {
  return dispatch => http.get(`/influxdb/${id}/${db}/${measurement}/tag-keys`)
    .then(res => dispatch({
      type: INFLUXDB_LIST_TAG_KEY,
      id,
      db,
      measurement,
      tagKeys: res.body.items || [],
    }));
}

export function listSeries(id, db, measurement) {
  return dispatch => http.get(`/influxdb/${id}/${db}/${measurement}/series`)
    .then(res => dispatch({
      type: INFLUXDB_LIST_SERIES,
      id,
      db,
      measurement,
      series: res.body.items || [],
    }));
}
