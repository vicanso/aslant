'use strict';
import * as globals from '../helpers/globals';
const appUrlPrfix = globals.get('CONFIG.appUrlPrefix');

export const HOME = `${appUrlPrfix}/`;

export const LOGIN = `${appUrlPrfix}/login`;

export const REGISTER = `${appUrlPrfix}/register`;

export const ADD_SERVER = `${appUrlPrfix}/servers/add`;

export const SHOW_SERVERS = `${appUrlPrfix}/servers/list`;

export const EDIT_SERVER = `${appUrlPrfix}/servers/edit`;

export const SHOW_VISUALIZATIONS = `${appUrlPrfix}/visualizations`;

export const ADD_VISUALIZATIONS = `${appUrlPrfix}/visualizations/add`;

export const EDIT_VISUALIZATIONS = `${appUrlPrfix}/visualizations/edit`;
