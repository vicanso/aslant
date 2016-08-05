'use strict';
const Joi = require('joi');
const _ = require('lodash');
const serverService = localRequire('services/server');
const errors = localRequire('helpers/errors');

const validate = data => Joi.validateThrow(data, {
  name: Joi.string().trim().required(),
  host: Joi.string().trim().required(),
  port: Joi.number().integer().required(),
  ssl: Joi.boolean().required(),
  access: Joi.string().trim().required(),
  user: Joi.string().trim(),
  password: Joi.string().trim(),
});

exports.add = (ctx) => {
  const account = _.get(ctx, 'session.user.account');
  const data = validate(ctx.request.body);
  data.owner = account;
  return serverService.add(data).then(server => {
    /* eslint no-param-reassign:0 */
    ctx.status = 201;
    ctx.body = server;
  });
};

exports.list = (ctx) => {
  const account = _.get(ctx, 'session.user.account');
  return serverService.list({
    $or: [
      {
        owner: account,
      },
      {
        access: '*',
      },
    ],
  }).then(servers => {
    /* eslint no-param-reassign:0 */
    ctx.body = {
      items: servers,
    };
  });
};

exports.update = (ctx) => {
  const conditions = {
    owner: _.get(ctx, 'session.user.account'),
    _id: ctx.params.id,
  };
  const data = validate(ctx.request.body);
  return serverService.update(conditions, ctx.get('X-Token'), data).then(server => {
    if (!server) {
      throw errors.get('update server info fail, may be token is expired');
    }
    /* eslint no-param-reassign:0 */
    ctx.body = server;
  });
};

exports.remove = (ctx) => {
  const conditions = {
    owner: _.get(ctx, 'session.user.account'),
    _id: ctx.params.id,
  };
  return serverService.remove(conditions).then(() => {
    /* eslint no-param-reassign:0 */
    ctx.body = null;
  });
};
