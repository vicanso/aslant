'use strict';
import {
  INFLUXDB_ADD_SERVER,
  INFLUXDB_LIST_SERVER,
} from '../constants/action-types';

const initStates = {
  list: [],
};

export default function influxdbServer(state = initStates, action) {
  let list;
  switch (action.type) {
    case INFLUXDB_ADD_SERVER:
      list = state.list.slice(0);
      list.push(action.server);
      return Object.assign({}, state, {
        list,
      });
    case INFLUXDB_LIST_SERVER:
      list = action.servers.slice(0);
      return Object.assign({}, state, {
        list,
      });
    default:
      return state;
  }
}
