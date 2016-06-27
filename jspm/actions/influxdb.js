'use strict';
import {
  INFLUXDB_ADD_SERVER,
  INFLUXDB_ADD_SERVER_FAIL,
  INFLUXDB_ADD_SERVER_SUCC,
  INFLUXDB_LIST_SERVER,
  INFLUXDB_LIST_SERVER_FAIL,
  INFLUXDB_LIST_SERVER_SUCC,
} from '../constants/action-types';

export function addServer(data) {
  // return dispatch => {
  //   dispatch({
  //     type: INFLUXDB_ADD_SERVER,
  //   });
  //   return influxdbService.addServer(data).then(server => {
  //     dispatch({
  //       type: INFLUXDB_ADD_SERVER_SUCC,
  //       server,
  //     });
  //   }).catch(fail(dispatch, INFLUXDB_ADD_SERVER_FAIL));
  // };
}

export function listServer() {
  // return dispatch => {
  //   dispatch({
  //     type: INFLUXDB_LIST_SERVER,
  //   });
  //   return influxdbService.listServer().then(servers => {
  //     dispatch({
  //       type: INFLUXDB_LIST_SERVER_SUCC,
  //       servers,
  //     });
  //   }).catch(fail(dispatch, INFLUXDB_LIST_SERVER_FAIL));
  // };
}
