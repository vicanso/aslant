const Joi = require('joi');
const _ = require('lodash');

const dashboardService = localRequire('services/dashboard');

function validate(data) {
  return Joi.validateThrow(data, {
    name: Joi.string().required(),
    configs: Joi.array().items(Joi.string()).min(1).required(),
    desc: Joi.string().optional(),
    group: Joi.string().valid('*', 'personal'),
  });
}

exports.list = (ctx) => {
  const group = ctx.query.group || 'personal';
  const account = ctx.session.user.account;
  const conditions = {};
  if (group === '*') {
    conditions.$or = [
      {
        group: '*',
      },
      {
        account,
      },
    ];
  } else {
    conditions.account = account;
  }
  return dashboardService.list(conditions).then((docs) => {
    /* eslint no-param-reassign:0 */
    ctx.body = _.sortBy(docs, (item) => {
      if (item.account === account) {
        return `0${item.updatedAt}`;
      }
      return `1${item.updatedAt}`;
    });
  });
};

exports.add = (ctx) => {
  const data = validate(ctx.request.body);
  data.account = ctx.session.user.account;
  return dashboardService.add(data).then((doc) => {
    /* eslint no-param-reassign:0 */
    ctx.body = doc;
  });
};

exports.remove = (ctx) => {
  const account = ctx.session.user.account;
  const id = ctx.params.id;
  return dashboardService.remove({
    _id: id,
    account,
  }).then(() => {
    ctx.body = null;
  });
};

exports.update = (ctx) => {
  const token = ctx.get('X-Token');
  const account = ctx.session.user.account;
  const id = ctx.params.id;
  const data = validate(ctx.request.body);
  return dashboardService.update({
    _id: id,
    account,
    token,
  }, data).then((doc) => {
    /* eslint no-param-reassign:0 */
    ctx.body = doc;
  });
};
