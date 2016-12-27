import {
  USER_SETTING,
  USER_SETTING_UPDATE,
  USER_SETTING_ADD,
} from '../constants/action-types';
import * as settingService from '../services/setting';

export function get() {
  return dispatch => settingService.get().then(data => dispatch({
    type: USER_SETTING,
    item: data || {},
  }));
}

export function update(id, updateData, token) {
  return dispatch => settingService.update(id, updateData, token).then(data => dispatch({
    type: USER_SETTING_UPDATE,
    item: data,
  }));
}

export function add(setting) {
  return dispatch => settingService.add(setting).then(data => dispatch({
    type: USER_SETTING_ADD,
    item: data,
  }));
}
