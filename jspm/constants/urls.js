'use strict';
import * as globals from '../helpers/globals';
const appUrlPrfix = globals.get('CONFIG.appUrlPrefix');

export const HOME = `${appUrlPrfix}/`;

export const LOGIN = `${appUrlPrfix}/login`;

export const REGISTER = `${appUrlPrfix}/register`;

export const ADD_SERVER = `${appUrlPrfix}/add-server`;

export const SHOW_SERVERS = `${appUrlPrfix}/server/list`;

export const EDIT_SERVER = `${appUrlPrfix}/server/edit`;
