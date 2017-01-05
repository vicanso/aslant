import * as http from '../helpers/http';
import * as crypto from '../helpers/crypto';
import {
  USER_ME,
  USER_LOGIN,
  USER_REGISTER,
  USER_LOGOUT,
  USER_CHANGE_PASSWORD,
} from '../constants/urls';

/* eslint no-undef:0*/
const app = (window.CONFIG && window.CONFIG.app) || 'unknown';

export function me() {
  return http.get(USER_ME)
    .set('Cache-Control', 'no-cache')
    .then(res => res.body);
}

export function add(account, password, email) {
  const code = crypto.sha256(`${account}-${password}-${app}`);
  return http.post(USER_REGISTER, {
    account,
    password: code,
    email,
  })
  .set('Cache-Control', 'no-cache')
  .then(res => res.body);
}

export function login(loginData) {
  const {
    account,
    password,
    type,
  } = loginData;
  return http.get(USER_LOGIN)
    .set('Cache-Control', 'no-cache')
    .then((res) => {
      const token = res.body.token;
      const code = crypto.sha256(crypto.sha256(`${account}-${password}-${app}`) + token);
      return http.post(USER_LOGIN, {
        account,
        password: code,
        type,
      }).set('Cache-Control', 'no-cache');
    }).then(res => res.body);
}

export function logout() {
  return http.del(USER_LOGOUT)
    .set('Cache-Control', 'no-cache')
    .then(res => res.body || { account: '' });
}

export function refresh() {
  return http.put(USER_ME)
    .set('Cache-Control', 'no-cache')
    .then(res => res.body);
}

export function updatePassword(password, newPassword) {
  return http.get(USER_CHANGE_PASSWORD)
    .set('Cache-Control', 'no-cache')
    .then((res) => {
      const {
        account,
        token,
      } = res.body;
      const code = crypto.sha256(crypto.sha256(`${account}-${password}-${app}`) + token);
      const pwd = crypto.sha256(`${account}-${newPassword}-${app}`);
      return http.put(USER_CHANGE_PASSWORD)
        .set('Cache-Control', 'no-cache')
        .send({
          password: code,
          newPassword: pwd,
        });
    }).then(res => res.body);
}
