'use strict';
import {
  USER_INFO,
  CONFIGURE_LIST,
  CONFIGURE_ADD,
  CONFIGURE_UPDATE,
  CONFIGURE_REMOVE,
  DASHBOARD_ADD,
  DASHBOARD_LIST,
  DASHBOARD_REMOVE,
} from '../constants/action-types';
import * as _ from 'lodash';
const defaultStates = {
  basic: {
    account: '',
    password: '',
  },
  configures: [],
  dashboards: [],
};

export default function user(state = defaultStates, action) {
  switch (action.type) {
    case USER_INFO:
      return Object.assign({}, state, {
        basic: action.user,
      });
    case CONFIGURE_ADD: {
      const configures = _.map(state.configures, item => Object.assign({}, item));
      configures.push(action.configure);
      return Object.assign({}, state, {
        configures,
      });
    }
    case CONFIGURE_LIST:
      return Object.assign({}, state, {
        configures: action.configures,
      });
    case CONFIGURE_UPDATE: {
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
    case CONFIGURE_REMOVE: {
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
    case DASHBOARD_ADD: {
      const dashboards = _.map(state.dashboards, item => Object.assign({}, item));
      dashboards.push(action.dashboard);
      return Object.assign({}, state, {
        dashboards,
      });
    }
    case DASHBOARD_LIST:
      return Object.assign({}, state, {
        dashboards: action.dashboards,
      });
    case DASHBOARD_REMOVE: {
      const dashboards = _.map(state.dashboards, item => Object.assign({}, item));
      /* eslint no-underscore-dangle:0 */
      const index = _.findIndex(dashboards, item => item._id === action.id);
      if (~index) {
        dashboards.splice(index, 1);
      }
      return Object.assign({}, state, {
        dashboards,
      });
    }
    default:
      return state;
  }
}
