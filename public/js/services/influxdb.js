import * as _ from 'lodash';

import * as http from '../helpers/http';
import {
  INFLUXDB_SERVER,
  INFLUXDB_DATABASES,
  INFLUXDB_RPS,
  INFLUXDB_MEASUREMENTS,
  INFLUXDB_TAG_KEYS,
  INFLUXDB_FIELD_KEYS,
  INFLUXDB_SERIES,
  INFLUXDB_SELECT,
  INFLUXDB_QUERY,
} from '../constants/urls';

function toJSON(data) {
  const result = {};
  if (!data || !data.results) {
    return result;
  }
  _.forEach(data.results, (tmp) => {
    _.forEach(tmp.series, (item) => {
      const columns = item.columns;
      const arr = [];
      _.forEach(item.values, (valueList) => {
        const point = {};
        _.forEach(valueList, (v, i) => {
          point[columns[i]] = v;
        });
        if (item.tags) {
          _.extend(point, item.tags);
        }
        arr.push(point);
      });
      if (!result[item.name]) {
        result[item.name] = [];
      }
      result[item.name] = result[item.name].concat(arr);
    });
  });
  return result;
}

export function toChartData(data) {
  const categories = [];
  const dict = {};
  let fillCat = false;
  _.forEach(data, (arr, name) => {
    _.forEach(arr, (item) => {
      if (!fillCat) {
        categories.push(item.time);
      }
      _.forEach(item, (v, k) => {
        if (k === 'time') {
          return;
        }
        const key = `${name}-${k}`;
        if (!dict[key]) {
          dict[key] = [];
        }
        dict[key].push(v);
      });
    });
    fillCat = true;
  });
  const result = _.map(dict, (v, k) => {
    const name = k;
    return {
      name,
      data: v,
    };
  });
  return {
    categories,
    data: result,
  };
}

export function list() {
  return http.get(INFLUXDB_SERVER)
    .then(res => res.body);
}

export function add(data) {
  return http.post(INFLUXDB_SERVER)
    .send(data)
    .then(res => res.body);
}

export function update(id, data, token) {
  return http.put(`${INFLUXDB_SERVER}/${id}`)
    .set('X-Access-Token', token)
    .send(data)
    .then(res => res.body);
}

export function remove(id) {
  return http.del(`${INFLUXDB_SERVER}/${id}`)
    .then(res => res.body);
}

export function showDatabases(id) {
  return http.get(INFLUXDB_DATABASES.replace(':id', id))
    .then(res => res.body);
}

export function showRps(id, db) {
  const url = INFLUXDB_RPS.replace(':id', id).replace(':db', db);
  return http.get(url).then(res => res.body);
}

export function showMeasurements(id, db) {
  const url = INFLUXDB_MEASUREMENTS.replace(':id', id).replace(':db', db);
  return http.get(url).then(res => res.body);
}

export function showTagKeys(id, db, measurement) {
  let url = INFLUXDB_TAG_KEYS.replace(':id', id).replace(':db', db);
  if (!measurement) {
    url = url.replace('/:measurement', '');
  } else {
    url = url.replace(':measurement', measurement);
  }
  return http.get(url).then(res => res.body);
}

export function showFieldKeys(id, db, measurement) {
  let url = INFLUXDB_FIELD_KEYS.replace(':id', id).replace(':db', db);
  if (!measurement) {
    url = url.replace('/:measurement', '');
  } else {
    url = url.replace(':measurement', measurement);
  }
  return http.get(url).then(res => res.body);
}

export function showSeries(id, db, measurement) {
  let url = INFLUXDB_SERIES.replace(':id', id).replace(':db', db);
  if (!measurement) {
    url = url.replace('/:measurement', '');
  } else {
    url = url.replace(':measurement', measurement);
  }
  return http.get(url).then(res => res.body);
}

export function select(id, db, measurement, q) {
  const url = INFLUXDB_SELECT.replace(':id', id)
    .replace(':db', db)
    .replace(':measurement', measurement);
  return http.get(url, q).then(res => toJSON(res.body));
}

export function query(id, db, ql) {
  const url = INFLUXDB_QUERY.replace(':id', id)
    .replace(':db', db);
  return http.get(url, {
    ql,
  }).then(res => toJSON(res.body));
}
