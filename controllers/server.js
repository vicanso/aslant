const Joi = require('joi');

const serverService = localRequire('services/server');

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
  return serverService.add(data).then((doc) => {
    /* eslint no-param-reassign:0 */
    ctx.body = doc;
  });
};

exports.list = (ctx) => {
  const account = ctx.session.user.account;
  return serverService.list({
    account,
    enabled: true,
  }).then((data) => {
    /* eslint no-param-reassign:0 */
    ctx.body = data;
  });
};

exports.update = (ctx) => {
  const token = ctx.get('X-Token');
  const account = ctx.session.user.account;
  const id = ctx.params.id;
  const data = validateServer(ctx.request.body);
  return serverService.update({
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
  return serverService.disabled({
    _id: id,
    account,
  }).then(() => {
    ctx.body = null;
  });
};
