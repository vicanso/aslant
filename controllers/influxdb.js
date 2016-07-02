'use strict';
const Joi = require('joi');
const _ = require('lodash');
const influxdbService = localRequire('services/influxdb');

const validateServerData = data => Joi.validateThrow(data, {
  name: Joi.string().trim().required(),
  host: Joi.string().trim().required(),
  port: Joi.number().integer().required(),
  ssl: Joi.boolean().required(),
  group: Joi.string().trim().required(),
  user: Joi.string().trim(),
  password: Joi.string().trim(),
});

exports.addServer = (ctx) => {
  const account = _.get(ctx, 'session.user.account');
  const data = validateServerData(ctx.request.body);
  data.owner = account;
  return influxdbService.addServer(data).then(server => {
    /* eslint no-param-reassign:0 */
    ctx.status = 201;
    ctx.body = server;
  });
};

exports.listServer = (ctx) => {
  const account = _.get(ctx, 'session.user.account');
  return influxdbService.listServer({
    '$or': [
      {
        owner: account,
      },
      {
        group: '*',
      },
    ],
  }).then(servers => {
    /* eslint no-param-reassign:0 */
    ctx.body = {
      items: servers,
    };
  });
};


exports.editServer = (ctx) => {
  const conditions = {
    owner: _.get(ctx, 'session.user.account'),
    _id: ctx.params.id,
  };
  const data = validateServerData(ctx.request.body);
  return influxdbService.updateServer(conditions, ctx.get('X-Token'), data).then(server => {
    /* eslint no-param-reassign:0 */
    ctx.body = server;
  });
};

exports.removeServer = (ctx) => {
  const conditions = {
    owner: _.get(ctx, 'session.user.account'),
    _id: ctx.params.id,
  };
  return influxdbService.removeServer(conditions, ctx.get('X-Token')).then(() => {
    /* eslint no-param-reassign:0 */
    ctx.body = null;
  });
};

exports.listDatabase = (ctx) => {
  return influxdbService.listDatabases(ctx.params.id).then(data => {
    /* eslint no-param-reassign:0 */
    ctx.body = data;
  });
};

exports.listRP = (ctx) => {
  const { id, db } = ctx.params;
  return influxdbService.listRP(id, db).then(data => {
    /* eslint no-param-reassign:0 */
    ctx.body = data;
  });
};
