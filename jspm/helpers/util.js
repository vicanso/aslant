'use strict';
/* eslint  import/no-unresolved:0 */
import * as _ from 'lodash';
import moment from 'moment';
import QL from 'influx-ql';
import * as echarts from 'echarts';

export function getError(err) {
  return _.get(err, 'response.body.message', err.message);
}

export function convertSeriesData(data) {
  const columns = data.columns.slice(0);
  const timeIndex = _.indexOf(columns, 'time');
  const arr = _.map(data.values, value => {
    const tmpArr = _.map(value, v => {
      if (_.isNumber(v)) {
        return _.round(v, 3);
      }
      return v;
    });
    if (~timeIndex) {
      tmpArr[timeIndex] = moment(tmpArr[timeIndex]).format('YYYY-MM-DD HH:mm:ss');
    }
    return tmpArr;
  });
  arr.unshift(columns);
  return arr;
}

export function getInfluxQL(options) {
  const ql = new QL();
  ql.measurement = options.measurement;
  if (options.fields && options.fields.length) {
    ql.addField(options.fields);
  }
  _.forEach(options.extracts, item => {
    if (item.key && item.value) {
      ql.addCalculate(item.value, item.key);
    }
  });
  const conditions = {};
  _.forEach(options.conditions, item => {
    if (!item.value) {
      return;
    }
    const tag = item.key;
    if (conditions[tag]) {
      if (!_.isArray(conditions[tag])) {
        conditions[tag] = [conditions[tag]];
      }
      conditions[tag].push(item.value);
    } else {
      conditions[tag] = item.value;
    }
  });
  _.forEach(options.groups, item => {
    if (item.value) {
      ql.addGroup(item.value);
    }
  });
  if (options.groupByTime) {
    ql.addGroup(`time(${options.groupByTime})`);
  }
  if (options.offsetTime && options.offsetTime.charAt(0) === '-') {
    ql.start = options.offsetTime;
  }
  if (options.orderByTime) {
    ql.order = options.orderByTime;
  }
  options.date && _.forEach(['start', 'end'], key => {
    const date = options.date[key];
    if (date) {
      ql[key] = moment(date, 'YYYY-MM-DD HH:mm:ss').toISOString();
    }
  });
  ql.condition(conditions);
  ql.fill = 0;
  return ql.toSelect();
}

export function rejectEmptyPoint(item) {
  const arr = [];
  _.forEach(item.values, val => {
    const tmp = val.slice(1);
    if (_.some(tmp, Boolean)) {
      arr.push(val.slice(0));
    }
  });
  return Object.assign({}, item, {
    values: arr,
  });
}

export function toSeconds(str) {
  const dict = {
    's': 1,
    'm': 60,
    'h': 60 * 60,
    'd': 24 * 60 * 60,
  };
  const unit = str.charAt(str.length - 1);
  return dict[unit] * parseFloat(str);
}
