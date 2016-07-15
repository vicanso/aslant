'use strict';
import {
  USER_INFO,
  INFLUXDB_LIST_CONFIGURE,
} from '../constants/action-types';

const defaultStates = {
  basic: {
    account: '',
    password: '',
  },
  configures: [],
};

export default function user(state = defaultStates, action) {
  switch (action.type) {
    case USER_INFO:
      return Object.assign({}, state, {
        basic: action.user
      });
    case INFLUXDB_LIST_CONFIGURE:
      return Object.assign({}, state, {
        configures: action.configures,
      });
    default:
      return state;
  }
}
