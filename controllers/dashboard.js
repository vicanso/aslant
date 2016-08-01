'use strict';
const Joi = require('joi');
const _ = require('lodash');
const dashboardService = localRequire('services/dashboard');
const errors = localRequire('helpers/errors');

const validate = (data, opts) => Joi.validateThrow(data, {
  name: Joi.string().trim().required(),
  desc: Joi.string().trim().required(),
  autoRefresh: Joi.string().trim(),
  offsetTime: Joi.string().trim(),
  configures: Joi.array().min(1).items(
    Joi.object().keys({
      id: Joi.string().length(24).required(),
      width: Joi.string().required(),
    })
  )
  .required(),
}, opts);

exports.add = (ctx) => {
  const data = validate(ctx.request.body);
  const account = _.get(ctx, 'session.user.account');
  return dashboardService.add(_.extend({
    owner: account,
  }, data)).then(dashboard => {
    /* eslint no-param-reassign:0 */
    ctx.status = 201;
    ctx.body = dashboard;
  });
};

exports.list = (ctx) => {
  const account = _.get(ctx, 'session.user.account');
  return dashboardService.list({
    owner: account,
  }).then(dashboards => {
    /* eslint no-param-reassign:0 */
    ctx.body = {
      items: dashboards,
    };
  });
};

exports.remove = (ctx) => {
  const conditions = {
    owner: _.get(ctx, 'session.user.account'),
    _id: ctx.params.id,
  };
  return dashboardService.remove(conditions).then(() => {
    /* eslint no-param-reassign:0 */
    ctx.body = null;
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
  return dashboardService.update(conditions, ctx.get('X-Token'), data).then(dashboard => {
    if (!dashboard) {
      throw errors.get('update dashboard info fail, may be token is expired');
    }
    /* eslint no-param-reassign:0 */
    ctx.body = dashboard;
  });
};
