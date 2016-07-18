'use strict';
/* eslint import/no-unresolved:0 */
import * as _ from 'lodash';
import * as util from './util';

function getDefaultLineOption(name) {
  return {
    name,
    type: 'line',
    smooth: true,
    symbol: 'none',
    itemStyle: {
      normal: {},
    },
    areaStyle: {
      normal: {},
    },
    data: [],
  };
}

export function getLineOption(data, name) {
  const result = _.map(data, util.convertSeriesData);
  const series = _.map(data, item => {
    const tagsDesc = _.map(item.tags, (v, k) => {
      return `${k}(${v})`;
    }).join(' ');
    return getDefaultLineOption(tagsDesc);
  });
  const dateList = [];
  _.forEach(result, (arr, index) => {
    const values = arr.slice(1);
    _.forEach(values, value => {
      const time = value.shift();
      if (index === 0) {
        dateList.push(time);
      }
      series[index].data.push(value.pop());
    });
  });
  const end = Math.ceil(Math.min(50 / dateList.length, 1) * 100);
  return {
    tooltip: {
      trigger: 'axis',
    },
    title: {
      left: 'center',
      text: name,
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
    grid: {
      left: 60,
      right: 60,
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

export function getPieOption(data, name) {
  const pieData = {
    name,
    type: 'pie',
    radius: '55%',
    center: ['50%', '60%'],
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    data: [],
    itemStyle: {
      emphasis: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
      },
    },
  };
  const option = {
    title: {
      text: name,
    },
    legend: {
      data: [],
    },
    series: [
      pieData,
    ],
  };
  _.forEach(data, item => {
    const tagsDesc = _.map(item.tags, (v, k) => {
      return `${k}(${v})`;
    }).join(' ');
    option.legend.data.push(tagsDesc);
    pieData.data.push({
      name: tagsDesc,
      value: item.values[0][1],
    });
  });
  return option;
}
