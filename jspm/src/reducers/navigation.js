'use strict';
/* eslint import/no-unresolved:0 */
import {
  LOCATION,
  LOCATION_BACK,
} from 'aslant/constants/action-types';
import * as urls from 'aslant/constants/urls';
const initState = {
  location: location.pathname,
  history: [],
};

export default function navigation(state = initState, action) {
  switch (action.type) {
    case LOCATION: {
      if (state.location === action.path) {
        return state;
      }
      const list = state.history.slice(0);
      list.push(state.location);
      history.pushState(null, '', action.path);
      return Object.assign({}, state, {
        location: action.path,
        history: list,
      });
    }
    case LOCATION_BACK: {
      const list = state.history.slice(0);
      const path = list.pop() || urls.HOME;
      history.pushState(null, '', path);
      return Object.assign({}, state, {
        location: path,
        history: list,
      });
    }
    default:
      return state;
  }
}
