import { combineReducers } from 'redux';

import user from './user';
import navigation from './navigation';
import influxdb from './influxdb';
import server from './server';
import dashboard from './dashboard';

export default combineReducers({
  user,
  navigation,
  influxdb,
  server,
  dashboard,
});
