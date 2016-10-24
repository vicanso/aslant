import { combineReducers } from 'redux';

import user from './user';
import navigation from './navigation';
import influxdb from './influxdb';

export default combineReducers({
  user,
  navigation,
  influxdb,
});
