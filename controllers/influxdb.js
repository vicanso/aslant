'use strict';
const _ = require('lodash');
const influxdbService = localRequire('services/influxdb');
const errors = localRequire('helpers/errors');

exports.listDatabase = (ctx) => influxdbService.listDatabases(ctx.params.id).then(data => {
  /* eslint no-param-reassign:0 */
  ctx.body = {
    items: data,
  };
});

exports.listRP = (ctx) => {
  const { id, db } = ctx.params;
  return influxdbService.listRP(id, db).then(data => {
    /* eslint no-param-reassign:0 */
    ctx.body = {
      items: data,
    };
  });
};

exports.listMeasurement = (ctx) => {
  const { id, db } = ctx.params;
  return influxdbService.listMeasurement(id, db).then(data => {
    /* eslint no-param-reassign:0 */
    ctx.body = {
      items: data,
    };
  });
};

exports.listTagInfo = (ctx) => {
  const { id, db, measurement } = ctx.params;
  return influxdbService.listTagInfo(id, db, measurement).then(data => {
    /* eslint no-param-reassign:0 */
    ctx.body = {
      items: data,
    };
  });
};

exports.listField = (ctx) => {
  const { id, db, measurement } = ctx.params;
  return influxdbService.listField(id, db, measurement).then(data => {
    /* eslint no-param-reassign:0 */
    ctx.body = {
      items: data,
    };
  });
};

exports.listPoint = (ctx) => {
  const { id, db } = ctx.params;
  const { ql } = ctx.query;
  if (!ql) {
    throw errors.get('ql can\'t be empty', 400);
  }
  return influxdbService.listPoint(id, db, ql).then(data => {
    const err = _.get(data, 'results[0].error');
    if (err) {
      throw errors.get(err);
    }
    /* eslint no-param-reassign:0 */
    ctx.body = {
      items: _.get(data, 'results[0].series'),
    };
  });
};
