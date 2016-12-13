import * as _ from 'lodash';

import {
  INFLUXDB_LIST_CONFIG,
  INFLUXDB_ADD_CONFIG,
  INFLUXDB_UPDATE_CONFIG,
  INFLUXDB_REMOVE_CONFIG,
} from '../constants/action-types';

const defaultStates = {
  configs: null,
};

export default function influxdb(state = defaultStates, action) {
  switch (action.type) {
    case INFLUXDB_LIST_CONFIG: {
      const configs = action.items.slice(0);
      return Object.assign({}, state, {
        configs,
      });
    }
    case INFLUXDB_ADD_CONFIG: {
      const configs = state.configs.slice(0);
      configs.unshift(action.item);
      return Object.assign({}, state, {
        configs,
      });
    }
    case INFLUXDB_UPDATE_CONFIG: {
      /* eslint no-underscore-dangle:0 */
      const id = action.item._id;
      const configs = state.configs.slice(0);
      const index = _.findIndex(configs, item => item._id === id);
      configs.splice(index, 1);
      configs.unshift(action.item);
      return Object.assign({}, state, {
        configs,
      });
    }
    case INFLUXDB_REMOVE_CONFIG: {
      const id = action.id;
      /* eslint no-underscore-dangle:0 */
      const configs = _.filter(state.configs, item => item._id !== id);
      return Object.assign({}, state, {
        configs,
      });
    }
    default:
      return state;
  }
}
