const Joi = require('joi');
const _ = require('lodash');

const configService = localRequire('services/config');
const influxdbService = localRequire('services/influxdb');
const errors = localRequire('helpers/errors');

function pickInfluxConfig(data) {
  const keys = '_id name updatedAt token view time groups'.split(' ');
  return _.pick(data, keys);
}

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
    view: Joi.object().keys({
      width: Joi.string().required(),
      type: Joi.string().required(),
    }).required(),
  });
}

exports.add = (ctx) => {
  const data = validateConfig(ctx.request.body);
  const account = ctx.session.user.account;
  data.account = account;
  return configService.add(data).then((doc) => {
    /* eslint no-param-reassign:0 */
    ctx.body = pickInfluxConfig(doc);
  });
};

exports.list = (ctx) => {
  let conditions = null;
  if (ctx.query.ids) {
    conditions = {
      _id: {
        $in: ctx.query.ids.split(','),
      },
    };
  } else {
    conditions = {
      account: ctx.session.user.account,
    };
  }
  return configService.list(conditions).then((docs) => {
    /* eslint no-param-reassign:0 */
    ctx.body = _.map(docs, pickInfluxConfig);
  });
};

exports.get = (ctx) => {
  const query = Joi.validateThrow(ctx.query, {
    fill: Joi.boolean().optional(),
  });
  const fill = query.fill;
  const id = ctx.params.id;
  return configService.get(id).then((doc) => {
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

exports.update = (ctx) => {
  const token = ctx.get('X-Token');
  const account = ctx.session.user.account;
  const id = ctx.params.id;
  const data = validateConfig(ctx.request.body);
  return configService.update({
    _id: id,
    account,
    token,
  }, data).then((doc) => {
    /* eslint no-param-reassign:0 */
    ctx.body = pickInfluxConfig(doc);
  });
};

exports.remove = (ctx) => {
  const account = ctx.session.user.account;
  const id = ctx.params.id;
  return configService.remove({
    _id: id,
    account,
  }).then(() => {
    ctx.body = null;
  });
};
