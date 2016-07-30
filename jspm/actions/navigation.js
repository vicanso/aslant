'use strict';
import {
  LOCATION,
  LOCATION_BACK,
} from '../constants/action-types';

import * as urls from '../constants/urls';

export function to(path) {
  return dispatch => {
    dispatch({
      type: LOCATION,
      path,
    });
  };
}

export function register() {
  return to(urls.REGISTER);
}

export function home() {
  return to(urls.HOME);
}

export function login() {
  return to(urls.LOGIN);
}

export function addServer() {
  return to(urls.ADD_SERVER);
}

export function showServers() {
  return to(urls.SHOW_SERVERS);
}

export function showVisualizations() {
  return to(urls.SHOW_VISUALIZATIONS);
}

export function showVisualization(id) {
  return to(`${urls.SHOW_VISUALIZATIONS}/${id}`);
}

export function addVisualization() {
  return to(urls.ADD_VISUALIZATIONS);
}

export function editVisualization(id) {
  return to(`${urls.EDIT_VISUALIZATION}/${id}`);
}

export function showDashboards() {
  return to(urls.SHOW_DASHBOARDS);
}

export function addDashboard() {
  return to(urls.ADD_DASHBOARD);
}

export function editDashboard(id) {
  return to(`${urls.EDIT_DASHBOARD}/${id}`);
}

export function showDashboard(id) {
  return to(`${urls.SHOW_DASHBOARDS}/${id}`);
}

export function back() {
  return dispatch => {
    dispatch({
      type: LOCATION_BACK,
    });
  };
}

export function editServer(id) {
  return to(`${urls.EDIT_SERVER}/${id}`);
}
