/* eslint no-undef:0 */
const localStorage = window.localStorage;

export function get(key) {
  const data = localStorage.getItem(key);
  try {
    return JSON.parse(data);
  } catch (err) {
    return null;
  }
}

export function set(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
