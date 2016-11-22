const Joi = require('joi');
const _ = require('lodash');

const influxdbService = localRequire('services/influxdb-server');
const serverService = localRequire('services/server');
const errors = localRequire('helpers/errors');

function validateConfig(data) {
  return Joi.validateThrow(data, {
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
}

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

exports.query = (ctx) => {
  const {
    id,
    db,
  } = ctx.params;
  const query = Joi.validateThrow(ctx.query, {
    ql: Joi.string(),
  });
  return influxdbService.query(id, db, query.ql).then((data) => {
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
  const data = validateConfig(ctx.request.body);
  const account = ctx.session.user.account;
  data.account = account;
  return influxdbService.addConfig(data).then((doc) => {
    /* eslint no-param-reassign:0 */
    ctx.body = pickInfluxConfig(doc);
  });
};

exports.listConfig = (ctx) => {
  const account = ctx.session.user.account;
  return influxdbService.listConfig({
    account,
  }).then((docs) => {
    /* eslint no-param-reassign:0 */
    ctx.body = _.map(docs, pickInfluxConfig);
  });
};

exports.getConfig = (ctx) => {
  const query = Joi.validateThrow(ctx.query, {
    fill: Joi.boolean().optional(),
  });
  const fill = query.fill;
  const id = ctx.params.id;
  return influxdbService.getConfig(id).then((doc) => {
    if (!doc) {
      throw errors.get(5);
    }
    if (!fill || !doc.server) {
      return Promise.resolve(doc);
    }
    const fns = [];
    const {
      server,
      database,
      measurement,
    } = doc;
    if (server) {
      const fn = influxdbService.showDatabases(server).then((dbs) => {
        doc.dbs = dbs.sort();
      });
      fns.push(fn);
    }
    if (database) {
      const args = [server, database];
      const fn1 = influxdbService.showMeasurements(...args).then((measurements) => {
        doc.measurements = measurements.sort();
      });

      const fn2 = influxdbService.showRetentionPolicies(...args).then((rps) => {
        doc.rps = rps.sort();
      });
      fns.push(fn1, fn2);
    }
    if (measurement) {
      const args = [server, database, measurement];
      const fn1 = influxdbService.showSeries(...args).then((series) => {
        doc.series = series;
      });
      const fn2 = influxdbService.showFieldKeys(...args).then((data) => {
        doc.fields = _.map(_.get(data, '[0].values'), item => item.key);
      });
      fns.push(fn1, fn2);
    }
    return Promise.all(fns).then(() => doc);
  }).then((data) => {
    /* eslint no-param-reassign:0 */
    ctx.body = data;
  });
};

exports.updateConfig = (ctx) => {
  const token = ctx.get('X-Token');
  const account = ctx.session.user.account;
  const id = ctx.params.id;
  const data = validateConfig(ctx.request.body);
  return influxdbService.updateConfig({
    _id: id,
    account,
    token,
  }, data).then((doc) => {
    /* eslint no-param-reassign:0 */
    ctx.body = pickInfluxConfig(doc);
  });
};

exports.removeConfig = (ctx) => {
  const account = ctx.session.user.account;
  const id = ctx.params.id;
  return influxdbService.removeConfig({
    _id: id,
    account,
  }).then(() => {
    ctx.body = null;
  });
};
