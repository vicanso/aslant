import * as _ from 'lodash';

import {
  INFLUXDB_SERVERS,
  INFLUXDB_ADD_SERVER,
  INFLUXDB_UPDATE_SERVER,
  INFLUXDB_REMOVE_SERVER,
  INFLUXDB_RESET,
  INFLUXDB_LIST_CONFIG,
  INFLUXDB_ADD_CONFIG,
  INFLUXDB_UPDATE_CONFIG,
  INFLUXDB_REMOVE_CONFIG,
} from '../constants/action-types';

const defaultStates = {
  servers: [],
  configs: [],
};

export default function influxdb(state = defaultStates, action) {
  switch (action.type) {
    case INFLUXDB_SERVERS: {
      const servers = action.items.slice(0);
      return Object.assign({}, state, {
        servers,
      });
    }
    case INFLUXDB_UPDATE_SERVER: {
      const updateServer = action.item;
      const servers = state.servers.slice(0);
      /* eslint no-underscore-dangle:0 */
      const index = _.findIndex(servers, item => item._id === updateServer._id);
      if (index !== -1) {
        servers[index] = updateServer;
      }
      return Object.assign({}, state, {
        servers,
      });
    }
    case INFLUXDB_ADD_SERVER: {
      const servers = state.servers.slice(0);
      servers.unshift(action.item);
      return Object.assign({}, state, {
        servers,
      });
    }
    case INFLUXDB_REMOVE_SERVER: {
      const id = action.id;
      const servers = _.filter(state.servers, item => item._id !== id);
      return Object.assign({}, state, {
        servers,
      });
    }
    case INFLUXDB_RESET: {
      return Object.assign({}, state, {
        servers: [],
      });
    }
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
      const configs = _.filter(state.configs, item => item._id !== id);
      return Object.assign({}, state, {
        configs,
      });
    }
    default:
      return state;
  }
}
