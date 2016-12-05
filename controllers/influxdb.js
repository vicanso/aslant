const Joi = require('joi');
const _ = require('lodash');

const influxdbService = localRequire('services/influxdb');
const serverService = localRequire('services/server');
const errors = localRequire('helpers/errors');


exports.showDatabases = (ctx) => {
  const id = ctx.params.id;
  return influxdbService.showDatabases(id).then((data) => {
    ctx.set('Cache-Control', 'public, max-age=60');
    /* eslint no-param-reassign:0 */
    ctx.body = data;
  });
};

exports.showRetentionPolicies = (ctx) => {
  const id = ctx.params.id;
  const db = ctx.params.db;
  return influxdbService.showRetentionPolicies(id, db).then((data) => {
    ctx.set('Cache-Control', 'public, max-age=5');
    /* eslint no-param-reassign:0 */
    ctx.body = data;
  });
};

exports.addRetentionPolicy = (ctx) => {
  const data = Joi.validateThrow(ctx.request.body, {
    name: Joi.string().required(),
    duration: Joi.string().required(),
    shardDuration: Joi.string().optional(),
    replicaN: Joi.number().integer().min(1).default(1)
      .required(),
    default: Joi.boolean().default(false).required(),
  });
  const account = ctx.session.user.account;
  const {
    id,
    db,
  } = ctx.params;
  return serverService.getById(id).then((doc) => {
    if (doc.account !== account) {
      throw errors.get(108);
    }
    return influxdbService.addRetentionPolicy(id, db, data);
  }).then(() => {
    ctx.status = 201;
  });
};

exports.removeRetentionPolicy = (ctx) => {
  const account = ctx.session.user.account;
  const {
    id,
    db,
    rp,
  } = ctx.params;
  return serverService.getById(id).then((doc) => {
    if (doc.account !== account) {
      throw errors.get(108);
    }
    return influxdbService.dropRetentionPolicy(id, db, rp);
  }).then(() => {
    ctx.body = null;
  });
};

exports.updateRetentionPolicy = (ctx) => {
  const data = Joi.validateThrow(ctx.request.body, {
    duration: Joi.string().optional(),
    shardDuration: Joi.string().optional(),
    replicaN: Joi.number().integer().min(1).default(1)
      .optional(),
    default: Joi.boolean().default(false).optional(),
  });
  const account = ctx.session.user.account;
  const {
    id,
    db,
  } = ctx.params;
  data.name = ctx.params.rp;
  return serverService.getById(id).then((doc) => {
    if (doc.account !== account) {
      throw errors.get(108);
    }
    return influxdbService.updateRetentionPolicy(id, db, data);
  }).then(() => {
    ctx.status = 201;
  });
};

exports.showMeasurements = (ctx) => {
  const id = ctx.params.id;
  const db = ctx.params.db;
  return influxdbService.showMeasurements(id, db).then((data) => {
    ctx.set('Cache-Control', 'public, max-age=60');
    /* eslint no-param-reassign:0 */
    ctx.body = data;
  });
};

exports.showTagKeys = (ctx) => {
  const id = ctx.params.id;
  const db = ctx.params.db;
  const measurement = ctx.params.measurement;
  return influxdbService.showTagKeys(id, db, measurement).then((data) => {
    ctx.set('Cache-Control', 'public, max-age=60');
    /* eslint no-param-reassign:0 */
    ctx.body = data;
  });
};

exports.showFieldKeys = (ctx) => {
  const id = ctx.params.id;
  const db = ctx.params.db;
  const measurement = ctx.params.measurement;
  return influxdbService.showFieldKeys(id, db, measurement).then((data) => {
    ctx.set('Cache-Control', 'public, max-age=60');
    /* eslint no-param-reassign:0 */
    ctx.body = data;
  });
};

exports.showSeries = (ctx) => {
  const id = ctx.params.id;
  const db = ctx.params.db;
  const measurement = ctx.params.measurement;
  return influxdbService.showSeries(id, db, measurement).then((data) => {
    ctx.set('Cache-Control', 'public, max-age=60');
    /* eslint no-param-reassign:0 */
    ctx.body = _.sortedUniq(_.compact(data).sort());
  });
};

exports.select = (ctx) => {
  const {
    id,
    db,
    measurement,
  } = ctx.params;
  const query = Joi.validateThrow(ctx.query, {
    fields: Joi.array().items(Joi.string()),
    start: Joi.string(),
    end: Joi.string(),
    limit: Joi.number().integer(),
    slimit: Joi.number().integer(),
    condition: Joi.object(),
    fill: Joi.any(),
    order: Joi.string().valid('asc', 'desc'),
  });
  return influxdbService.select(id, db, measurement, query).then((data) => {
    ctx.set('Cache-Control', 'public, max-age=10');
    /* eslint no-param-reassign:0 */
    ctx.body = data;
  });
};

function groupByField(data) {
  data.results[0].series[0].columns.push('count');
  const seriesData = data.results[0].series[0];

  const arr = [];
  const dict = {};
  _.forEach(seriesData.values, (item) => {
    const v = item[1];
    const i = dict[v];
    if (_.isUndefined(i)) {
      dict[v] = arr.length;
      item[2] = 1;
      arr.push(item);
      return;
    }
    arr[i][2] += 1;
  });
  seriesData.values = arr;
  return data;
}

exports.query = (ctx) => {
  const {
    id,
    db,
  } = ctx.params;
  const query = Joi.validateThrow(ctx.query, {
    ql: Joi.string().required(),
    'group-field': Joi.string(),
  });
  const groupField = query['group-field'];
  return influxdbService.query(id, db, query.ql).then((data) => {
    ctx.set('Cache-Control', 'public, max-age=10');
    /* eslint no-param-reassign:0 */
    if (groupField) {
      ctx.body = groupByField(data, groupField);
    } else {
      ctx.body = data;
    }
  });
};
