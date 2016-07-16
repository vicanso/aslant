'use strict';
import {
  USER_INFO,
  INFLUXDB_LIST_CONFIGURE,
  INFLUXDB_ADD_CONFIGURE,
  INFLUXDB_UPDATE_CONFIGURE,
  INFLUXDB_REMOVE_CONFIGURE,
} from '../constants/action-types';
import * as _ from 'lodash';
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
        basic: action.user,
      });
    case INFLUXDB_ADD_CONFIGURE: {
      const configures = _.map(state.configures, item => Object.assign({}, item));
      configures.push(action.configure);
      return Object.assign({}, state, {
        configures,
      });
    }
    case INFLUXDB_LIST_CONFIGURE:
      return Object.assign({}, state, {
        configures: action.configures,
      });
    case INFLUXDB_UPDATE_CONFIGURE: {
      const configures = _.map(state.configures, item => Object.assign({}, item));
      const configure = action.configure;
      /* eslint no-underscore-dangle:0 */
      const index = _.findIndex(configures, item => item._id === configure._id);
      if (~index) {
        configures[index] = Object.assign({}, configure);
      }
      return Object.assign({}, state, {
        configures,
      });
    }
    case INFLUXDB_REMOVE_CONFIGURE: {
      const configures = _.map(state.configures, item => Object.assign({}, item));
      /* eslint no-underscore-dangle:0 */
      const index = _.findIndex(configures, item => item._id === action.id);
      if (~index) {
        configures.splice(index, 1);
      }
      return Object.assign({}, state, {
        configures,
      });
    }
    default:
      return state;
  }
}
