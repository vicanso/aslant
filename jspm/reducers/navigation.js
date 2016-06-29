'use strict';
import {
  LOCATION,
  LOCATION_BACK,
} from '../constants/action-types';
import * as urls from '../constants/urls';
const initState = {
  location: location.pathname,
  history: [],
};

export default function navigation(state = initState, action) {
  switch (action.type) {
    case LOCATION: {
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
