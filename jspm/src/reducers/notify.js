'use strict';
/* eslint import/no-unresolved:0 */
import * as _ from 'lodash';
import {
  NOTIFY_ADD,
  NOTIFY_REMOVE,
} from 'aslant/constants/action-types';

const defaultStates = {
  messages: [],
};

export default function user(state = defaultStates, action) {
  switch (action.type) {
    case NOTIFY_ADD: {
      const messages = _.map(state.messages, item => Object.assign({}, item));
      messages.push(action.message);
      return Object.assign({}, state, {
        messages,
      });
    }
    case NOTIFY_REMOVE: {
      const messages = _.map(state.messages, item => Object.assign({}, item));
      const index = _.findIndex(messages, item => item.id === action.id);
      if (~index) {
        messages.splice(index, 1);
      }
      return Object.assign({}, state, {
        messages,
      });
    }
    default:
      return state;
  }
}
