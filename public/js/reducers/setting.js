import {
  USER_SETTING,
  USER_SETTING_ADD,
  USER_SETTING_UPDATE,
} from '../constants/action-types';

const defaultStates = null;

export default function setting(state = defaultStates, action) {
  switch (action.type) {
    case USER_SETTING:
    case USER_SETTING_ADD:
    case USER_SETTING_UPDATE: {
      return action.item;
    }
    default:
      return state;
  }
}
