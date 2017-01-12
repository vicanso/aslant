import * as _ from 'lodash';
import moment from 'moment';
import InfluxQL from 'influx-ql';

import * as http from '../helpers/http';
import {
  INFLUXDB_DATABASES,
  INFLUXDB_RPS,
  INFLUXDB_MEASUREMENTS,
  INFLUXDB_TAG_KEYS,
  INFLUXDB_FIELD_KEYS,
  INFLUXDB_SERIES,
  INFLUXDB_SELECT,
  INFLUXDB_QUERY,
  INFLUXDB_CONFIGS,
} from '../constants/urls';

function toJSON(data) {
  const result = {};
  if (!data || !data.results) {
    return result;
  }
  _.forEach(data.results, (tmp) => {
    if (tmp.error) {
      throw new Error(tmp.error);
    }
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

export function toChartData(data, tags, aggregations) {
  const timeArr = [];
  const dict = {};
  const aggregationsDict = {};
  _.forEach(aggregations, (item) => {
    const {
      aggregation,
      field,
    } = item;
    if (!aggregation || !field) {
      return;
    }
    if (!aggregationsDict[aggregation]) {
      aggregationsDict[aggregation] = [field];
      return;
    }
    const index = _.sortedIndex(aggregationsDict[aggregation], field);
    aggregationsDict[aggregation].splice(index, 0, field);
  });
  let fillCat = false;
  _.forEach(data, (arr, name) => {
    _.forEach(arr, (item) => {
      if (!fillCat) {
        timeArr.push(item.time);
      }
      const keys = [];
      const values = [];
      _.forEach(_.keys(item), (key) => {
        if (key === 'time') {
          return;
        }
        if (_.indexOf(tags, key) === -1) {
          values.push(key);
        } else {
          keys.push(`${key}=${item[key]}`);
        }
      });
      const sortKeys = keys.sort();
      sortKeys.unshift(name);
      const baseKey = sortKeys.join('.');
      _.forEach(values, (k) => {
        const reg = /_(\d)*$/gi;
        const result = reg.exec(k);
        let convertKey = k;
        let key = `${baseKey}.${k}`;
        let index = 0;
        if (result) {
          convertKey = k.substring(0, k.length - result[0].length);
          index = parseInt(result[1], 10);
        }
        if (aggregationsDict[convertKey]) {
          key = `${baseKey}.${convertKey}(${aggregationsDict[convertKey][index]})`;
        }

        if (!dict[key]) {
          dict[key] = [];
        }
        dict[key].push(item[k]);
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
  const times = _.uniq(timeArr).sort();
  const offset = Math.abs(moment(_.first(times)).valueOf() - moment(_.last(times)).valueOf());
  const categories = [];
  let format = 'YYYY-MM-DD HH:mm:ss';
  if (offset < 24 * 3600 * 1000) {
    format = 'HH:mm:ss';
  }
  _.forEach(times, (time) => {
    const item = moment(time);
    categories.push(item.format(format));
  });
  return {
    categories,
    data: result,
  };
}

export function toTableData(data, aggregations) {
  const result = [];
  _.forEach(data, (arr, name) => {
    // show keys(convert the key such as max_1)
    const keys = [];
    const filterAggregations = _.filter(aggregations, item => item.aggregation && item.field);
    const sortAggregations = _.sortBy(filterAggregations, item => `${item.field}${item.aggregation}`);
    // original key for get the data
    const originalKeys = [];
    _.forEach(_.keys(arr[0]), (key) => {
      if (key === 'time') {
        keys.unshift(key);
        originalKeys.unshift(key);
        return;
      }
      originalKeys.push(key);
      const reg = /_(\d)*$/gi;
      const k = key.replace(reg, '');
      const index = _.findIndex(sortAggregations, item => item.aggregation === k);
      if (index !== -1) {
        const filterAggregation = sortAggregations.splice(index, 1)[0];
        keys.push(`${filterAggregation.aggregation}(${filterAggregation.field})`);
        return;
      }
      keys.push(key);
    });
    const items = _.map(arr, item => _.map(originalKeys, (key) => {
      const v = item[key];
      if (key !== 'time') {
        return v;
      }
      return moment(v).format('YYYY-MM-DD HH:mm:ss');
    }));
    items.sort((arr1, arr2) => {
      if (arr1[0] > arr2[0]) {
        return -1;
      } else if (arr1[0] < arr2[0]) {
        return 1;
      }
      return 0;
    });
    result.push({
      name,
      keys,
      items,
    });
  });
  return result;
}

export function formatSeries(series) {
  const tags = [];
  const tagValueDict = {};
  _.forEach(series, (str) => {
    _.forEach(str.split(',').slice(1), (item) => {
      const [tag, value] = item.split('=');
      if (_.indexOf(tags, tag) === -1) {
        tags.push(tag);
        tagValueDict[tag] = [];
      }
      if (_.indexOf(tagValueDict[tag], value) === -1) {
        tagValueDict[tag].push(value);
      }
    });
  });
  _.forEach(tagValueDict, (values, tag) => {
    tagValueDict[tag] = values.sort();
  });
  return {
    tags,
    tagValueDict,
  };
}

export function getInfluxQL(options) {
  const {
    database,
    measurement,
    tagConditions,
    fieldConditions,
    aggregations,
    rp,
    time,
    groups,
    customConditions,
    customFunctions,
    fill,
    limit,
    offset,
    order,
  } = options;
  if (!database || !measurement) {
    return '';
  }
  const ql = new InfluxQL(database);
  ql.measurement = measurement;
  ql.RP = _.get(rp, 'name', '');
  const conditions = _.compact(_.flatten([fieldConditions, tagConditions]));
  _.forEach(conditions, (item) => {
    const {
      key,
      value,
      operator,
    } = item;
    if (_.isUndefined(key) || _.isUndefined(value)) {
      return;
    }
    ql.where(key, value, operator);
  });
  _.forEach(aggregations, (item) => {
    const {
      aggregation,
      field,
    } = item;
    if (field) {
      if (!aggregation || aggregation === 'none') {
        ql.addField(field);
      } else {
        ql.addFunction(aggregation, field);
      }
    }
  });
  _.forEach(time, (v, k) => {
    const timeValue = v;
    if (!timeValue) {
      return;
    }
    if (timeValue === 'today') {
      ql.start = moment().set({
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
      }).toISOString();
    } else if (timeValue === 'yesterday') {
      ql.end = moment()
        .add(-1, 'day')
        .set({
          hour: 23,
          minute: 59,
          second: 59,
          millisecond: 999,
        }).toISOString();
      ql.start = moment()
        .add(-1, 'day')
        .set({
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0,
        }).toISOString();
    } else if (k === 'start') {
      ql.start = timeValue;
    } else {
      ql.end = timeValue;
    }
  });
  if (customConditions) {
    ql.where(customConditions);
  }
  if (customFunctions) {
    const arr = customFunctions.split('|');
    _.forEach(arr, item => ql.addFunction(item.trim()));
  }
  if (groups && groups.interval) {
    ql.addGroup(`time(${groups.interval})`);
  }
  if (groups && groups.tags && groups.tags.length) {
    ql.addGroup(...groups.tags);
  }
  if (fill) {
    ql.fill = fill;
  }
  if (_.isNumber(limit)) {
    ql.limit = limit;
  }
  if (_.isNumber(offset)) {
    ql.offset = offset;
  }
  if (order) {
    ql.order = order;
  }
  return ql.toSelect();
}


export function showDatabases(id) {
  return http.get(INFLUXDB_DATABASES.replace(':id', id))
    .then(res => res.body);
}

export function showRps(id, db) {
  const url = INFLUXDB_RPS.replace(':id', id).replace(':db', db);
  return http.get(url).then(res => res.body);
}

export function addRP(id, db, data) {
  const url = INFLUXDB_RPS.replace(':id', id).replace(':db', db);
  return http.post(url)
    .set('Cache-Control', 'no-cache')
    .send(data)
    .then(res => res.body);
}

export function removeRP(id, db, rp) {
  const url = INFLUXDB_RPS.replace(':id', id).replace(':db', db);
  return http.del(`${url}/${rp}`)
    .set('Cache-Control', 'no-cache')
    .then(res => res.body);
}

export function updateRP(id, db, rp, data) {
  const url = INFLUXDB_RPS.replace(':id', id).replace(':db', db);
  return http.put(`${url}/${rp}`)
    .set('Cache-Control', 'no-cache')
    .send(data)
    .then(res => res.body);
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

export function addConfig(data) {
  return http.post(INFLUXDB_CONFIGS, data)
    .set('Cache-Control', 'no-cache')
    .then(res => res.body);
}

export function updateConfig(id, token, config) {
  return http.put(`${INFLUXDB_CONFIGS}/${id}`)
    .set('X-Token', token)
    .set('Cache-Control', 'no-cache')
    .send(config)
    .then(res => res.body);
}

export function listConfigByIds(ids) {
  return http.get(`${INFLUXDB_CONFIGS}?ids=${ids.join(',')}`)
    .set('Cache-Control', 'no-cache')
    .then(res => res.body);
}

export function listConfig() {
  return http.get(INFLUXDB_CONFIGS)
    .set('Cache-Control', 'no-cache')
    .then(res => res.body);
}

export function getConfig(id, params) {
  return http.get(`${INFLUXDB_CONFIGS}/${id}`, params)
    .then(res => res.body);
}

export function removeConfig(id) {
  return http.del(`${INFLUXDB_CONFIGS}/${id}`)
    .set('Cache-Control', 'no-cache')
    .then(res => res.body);
}
