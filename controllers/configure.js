'use strict';
const Joi = require('joi');
const _ = require('lodash');
const errors = localRequire('helpers/errors');
const configureService = localRequire('services/configure');

const validate = (data, opts) => Joi.validateThrow(data, {
  name: Joi.string().trim().required(),
  desc: Joi.string().trim().required(),
}, opts);

exports.add = (ctx) => {
  const account = _.get(ctx, 'session.user.account');
  const data = validate(ctx.request.body, {
    allowUnknown: true,
  });
  return configureService.add(_.extend({
    owner: account,
  }, data)).then(configure => {
    /* eslint no-param-reassign:0 */
    ctx.status = 201;
    ctx.body = configure;
  });
};

exports.list = (ctx) => {
  const account = _.get(ctx, 'session.user.account');
  let query = {
    owner: account,
  };
  if (ctx.query.id) {
    const ids = _.isArray(ctx.query.id) ? ctx.query.id : [ctx.query.id];
    query = {
      _id: {
        $in: ids,
      },
    };
  }
  return configureService.list(query).then(configures => {
    /* eslint no-param-reassign:0 */
    ctx.body = {
      items: configures,
    };
  });
};

exports.update = (ctx) => {
  const conditions = {
    owner: _.get(ctx, 'session.user.account'),
    _id: ctx.params.id,
  };
  const data = validate(ctx.request.body, {
    allowUnknown: true,
  });
  return configureService.update(conditions, ctx.get('X-Token'), data).then(configure => {
    if (!configure) {
      throw errors.get('update configure info fail, may be token is expired');
    }
    /* eslint no-param-reassign:0 */
    ctx.body = configure;
  });
};

exports.remove = (ctx) => {
  const conditions = {
    owner: _.get(ctx, 'session.user.account'),
    _id: ctx.params.id,
  };
  return configureService.remove(conditions).then(() => {
    /* eslint no-param-reassign:0 */
    ctx.body = null;
  });
};
