'use strict';
/* eslint import/no-unresolved:0 */
import { combineReducers } from 'redux';
import user from 'aslant/reducers/user';
import navigation from 'aslant/reducers/navigation';
import influxdbServer from 'aslant/reducers/influxdb-server';
import notify from 'aslant/reducers/notify';

export default combineReducers({
  user,
  navigation,
  influxdbServer,
  notify,
});
