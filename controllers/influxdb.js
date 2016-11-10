const Joi = require('joi');
const _ = require('lodash');

const InfluxdbServer = localRequire('services/influxdb-server');

function validateServer(data) {
  return Joi.validateThrow(data, {
    name: Joi.string().required(),
    host: Joi.string().required(),
    port: Joi.number().integer().required(),
    ssl: Joi.boolean().optional(),
    username: Joi.string(),
    password: Joi.string(),
  });
}

exports.add = (ctx) => {
  const data = validateServer(ctx.request.body);
  data.account = ctx.session.user.account;
  return InfluxdbServer.add(data).then((doc) => {
    /* eslint no-param-reassign:0 */
    ctx.body = doc;
  });
};

exports.list = (ctx) => {
  const account = ctx.session.user.account;
  return InfluxdbServer.list({
    account,
  }).then((data) => {
    /* eslint no-param-reassign:0 */
    ctx.body = data;
  });
};

exports.update = (ctx) => {
  const token = ctx.get('X-Access-Token');
  const account = ctx.session.user.account;
  const id = ctx.params.id;
  const data = validateServer(ctx.request.body);
  return InfluxdbServer.update({
    _id: id,
    account,
    token,
  }, data).then((doc) => {
    /* eslint no-param-reassign:0 */
    ctx.body = doc;
  });
};

exports.remove = (ctx) => {
  const account = ctx.session.user.account;
  const id = ctx.params.id;
  return InfluxdbServer.remove({
    _id: id,
    account,
  }).then(() => {
    ctx.body = null;
  });
};

exports.showDatabases = (ctx) => {
  const id = ctx.params.id;
  return InfluxdbServer.showDatabases(id).then((data) => {
    ctx.set('Cache-Control', 'public, max-age=60');
    /* eslint no-param-reassign:0 */
    ctx.body = data;
  });
};

exports.showRetentionPolicies = (ctx) => {
  const id = ctx.params.id;
  const db = ctx.params.db;
  return InfluxdbServer.showRetentionPolicies(id, db).then((data) => {
    ctx.set('Cache-Control', 'public, max-age=60');
    /* eslint no-param-reassign:0 */
    ctx.body = data;
  });
};

exports.showMeasurements = (ctx) => {
  const id = ctx.params.id;
  const db = ctx.params.db;
  return InfluxdbServer.showMeasurements(id, db).then((data) => {
    ctx.set('Cache-Control', 'public, max-age=60');
    /* eslint no-param-reassign:0 */
    ctx.body = data;
  });
};

exports.showTagKeys = (ctx) => {
  const id = ctx.params.id;
  const db = ctx.params.db;
  const measurement = ctx.params.measurement;
  return InfluxdbServer.showTagKeys(id, db, measurement).then((data) => {
    ctx.set('Cache-Control', 'public, max-age=60');
    /* eslint no-param-reassign:0 */
    ctx.body = data;
  });
};

exports.showFieldKeys = (ctx) => {
  const id = ctx.params.id;
  const db = ctx.params.db;
  const measurement = ctx.params.measurement;
  return InfluxdbServer.showFieldKeys(id, db, measurement).then((data) => {
    ctx.set('Cache-Control', 'public, max-age=60');
    /* eslint no-param-reassign:0 */
    ctx.body = data;
  });
};

exports.showSeries = (ctx) => {
  const id = ctx.params.id;
  const db = ctx.params.db;
  const measurement = ctx.params.measurement;
  return InfluxdbServer.showSeries(id, db, measurement).then((data) => {
    ctx.set('Cache-Control', 'public, max-age=60');
    /* eslint no-param-reassign:0 */
    ctx.body = data;
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
  return InfluxdbServer.select(id, db, measurement, query).then((data) => {
    ctx.set('Cache-Control', 'public, max-age=10');
    /* eslint no-param-reassign:0 */
    ctx.body = data;
  });
};

exports.query = (ctx) => {
  const {
    id,
    db,
  } = ctx.params;
  const query = Joi.validateThrow(ctx.query, {
    ql: Joi.string(),
  });
  console.log(query.ql);
  return InfluxdbServer.query(id, db, query.ql).then((data) => {
    ctx.set('Cache-Control', 'public, max-age=10');
    /* eslint no-param-reassign:0 */
    ctx.body = data;
  });
};

function pickInfluxConfig(data) {
  const keys = '_id name updatedAt token'.split(' ');
  return _.pick(data, keys);
}

exports.addConfig = (ctx) => {
  const data = Joi.validateThrow(ctx.request.body, {
    name: Joi.string().required(),
    server: Joi.string().required(),
    database: Joi.string().required(),
    rp: Joi.string().empty('').optional(),
    measurement: Joi.string().required(),
    conditions: Joi.array().items(Joi.object().keys({
      tag: Joi.string().empty('').optional(),
      value: Joi.string().empty('').optional(),
    })).optional(),
    cals: Joi.array().items(Joi.object().keys({
      field: Joi.string().empty('').optional(),
      cal: Joi.string().empty('').optional(),
    })).optional(),
    groups: Joi.object().keys({
      interval: Joi.string().optional(),
      tags: Joi.array().items(Joi.string()).optional(),
    }),
    time: Joi.object().keys({
      start: Joi.string().empty('').optional(),
      end: Joi.string().empty('').optional(),
    }).optional(),
  });
  const account = ctx.session.user.account;
  data.account = account;
  return InfluxdbServer.addConfig(data).then((doc) => {
    /* eslint no-param-reassign:0 */
    ctx.body = pickInfluxConfig(doc);
  });
};

exports.listConfig = (ctx) => {
  const account = ctx.session.user.account;
  return InfluxdbServer.listConfig({
    account,
  }).then((data) => {
    /* eslint no-param-reassign:0 */
    ctx.body = _.map(data, pickInfluxConfig);
  });
};

exports.getConfig = (ctx) => {
  const id = ctx.params.id;
  return InfluxdbServer.getConfig(id).then((data) => {
    /* eslint no-param-reassign:0 */
    ctx.body = data;
  });
};
