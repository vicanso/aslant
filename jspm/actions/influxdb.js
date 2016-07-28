'use strict';
import * as http from '../helpers/http';
import {
  INFLUXDB_LIST_DATABASE,
  INFLUXDB_LIST_RP,
  INFLUXDB_LIST_MEASUREMENT,
  INFLUXDB_LIST_TAG_INFO,
  INFLUXDB_LIST_FIELDS,
} from '../constants/action-types';

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
