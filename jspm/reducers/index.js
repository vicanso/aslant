'use strict';
/* eslint import/no-unresolved:0 */
import { combineReducers } from 'redux';
import user from './user';
import navigation from './navigation';
import influxdbServer from './influxdb-server';
import notify from './notify';

export default combineReducers({
  user,
  navigation,
  influxdbServer,
  notify,
});
