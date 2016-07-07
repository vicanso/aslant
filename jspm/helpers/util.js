'use strict';
/* eslint  import/no-unresolved:0 */
import * as _ from 'lodash';
import moment from 'moment';

export function getError(err) {
  return _.get(err, 'response.body.message', err.message);
}

export function convertSeriesData(data) {
  const columns = data.columns.slice(0);
  const timeIndex = _.indexOf(columns, 'time');
  const arr = _.map(data.values, value => {
    const tmpArr = value.slice(0);
    if (~timeIndex) {
      tmpArr[timeIndex] = moment(tmpArr[timeIndex]).format('YYYY-MM-DD HH:mm:ss');
    }
    return tmpArr;
  });
  arr.unshift(columns);
  return arr;
}
