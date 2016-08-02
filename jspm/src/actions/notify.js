'use strict';
import * as _ from 'lodash';
import * as uuid from 'uuid';
import {
  NOTIFY_ADD,
  NOTIFY_REMOVE,
} from 'aslant/constants/action-types';

export function add(data, ttl = 5 * 1000) {
  const message = _.clone(data);
  message.id = uuid.v4();
  return dispatch => Promise.resolve().then(() => {
    dispatch({
      type: NOTIFY_ADD,
      message,
    });
    setTimeout(() => {
      dispatch({
        type: NOTIFY_REMOVE,
        id: message.id,
      });
    }, ttl);
  });
}
