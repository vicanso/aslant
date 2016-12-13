import * as _ from 'lodash';

import {
  INFLUXDB_ADD_DASHBOARD,
  INFLUXDB_UPDATE_DASHBOARD,
  INFLUXDB_LIST_DASHBOARD,
  INFLUXDB_REMOVE_DASHBOARD,
  INFLUXDB_RESET,
} from '../constants/action-types';

const defaultStates = null;

export default function dashboard(state = defaultStates, action) {
  switch (action.type) {
    case INFLUXDB_LIST_DASHBOARD: {
      const dashboards = action.items.slice(0);
      return dashboards;
    }
    case INFLUXDB_UPDATE_DASHBOARD: {
      const updateDashboard = action.item;
      const dashboards = state.slice(0);
      /* eslint no-underscore-dangle:0 */
      const index = _.findIndex(dashboards, item => item._id === updateDashboard._id);
      if (index !== -1) {
        dashboards[index] = updateDashboard;
      }
      return dashboards;
    }
    case INFLUXDB_ADD_DASHBOARD: {
      const dashboards = state.slice(0);
      dashboards.unshift(action.item);
      return dashboards;
    }
    case INFLUXDB_REMOVE_DASHBOARD: {
      const id = action.id;
      /* eslint no-underscore-dangle:0 */
      const dashboards = _.filter(state, item => item._id !== id);
      return dashboards;
    }
    case INFLUXDB_RESET: {
      return [];
    }
    default:
      return state;
  }
}
