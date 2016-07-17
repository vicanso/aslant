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
  _.forEach(['start', 'end'], key => {
    const date = options.date[key];
    if (date) {
      ql[key] = moment(date, 'YYYY-MM-DD HH:mm:ss').toISOString();
    }
  });
  ql.condition(conditions);
  return ql.toSelect();
}

export function rejectEmptyPoint(series) {
  return _.map(series, item => {
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

function getDefaultOption(name) {
  return {
    name,
    type: 'line',
    smooth: true,
    symbol: 'none',
    sampling: 'average',
    itemStyle: {
      normal: {
        color: 'rgb(255, 70, 131)',
      },
    },
    areaStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(255, 158, 68)',
          },
          {
            offset: 1,
            color: 'rgb(255, 70, 131)',
          }
        ]),
      },
    },
    data: [],
  };
}

export function getEchartLineOption(data) {
  const result = convertSeriesData(data);
  const columns = result.shift().slice(1);
  const series = _.map(columns, column => getDefaultOption(column));
  const dateList = [];
  _.forEach(result, arr => {
    const time = arr.shift();
    dateList.push(time);
    _.forEach(arr, (v, i) => series[i].data.push(v));
  });
  const end = Math.ceil(20 / dateList.length * 100);
  return {
    tooltip: {
      trigger: 'axis',
    },
    title: {
      left: 'center',
      text: data.name,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: dateList,
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
    },
    dataZoom: [{
      type: 'inside',
      start: 0,
      end: end,
    }, {
      start: 0,
      end: end,
      handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
      handleSize: '80%',
      handleStyle: {
        color: '#fff',
        shadowBlur: 3,
        shadowColor: 'rgba(0, 0, 0, 0.6)',
        shadowOffsetX: 2,
        shadowOffsetY: 2
      }
    }],
    series,
  };
}
