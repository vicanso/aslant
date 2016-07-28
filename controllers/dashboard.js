'use strict';
const Joi = require('joi');
const _ = require('lodash');
const dashboardService = localRequire('services/dashboard');

exports.add = (ctx) => {
  const data = Joi.validateThrow(ctx.request.body, {
    name: Joi.string().trim().required(),
    desc: Joi.string().trim().required(),
    configures: Joi.array().min(1).items(Joi.string().length(24)).required(),
  });
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
