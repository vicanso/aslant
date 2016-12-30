const Joi = require('joi');

const settingService = localRequire('services/setting');
const errors = localRequire('helpers/errors');

function validateSetting(data) {
  return Joi.validateThrow(data, {
    table: Joi.object().keys({
      pageSize: Joi.number().integer(),
    }).optional(),
    chart: Joi.object().keys({
      height: Joi.number().integer(),
    }).optional(),
    gesture: Joi.string().optional(),
  });
}

exports.add = (ctx) => {
  const data = validateSetting(ctx.request.body);
  const account = ctx.session.user.account;
  data.account = account;
  return settingService.getByAccount(account).then((doc) => {
    if (doc) {
      throw errors.get(109);
    }
    return settingService.add(data);
  }).then((doc) => {
    /* eslint no-param-reassign:0 */
    ctx.body = doc;
  });
};

exports.get = (ctx) => {
  const account = ctx.session.user.account;
  return settingService.getByAccount(account).then((doc) => {
    /* eslint no-param-reassign:0 */
    ctx.body = doc;
  });
};

exports.update = (ctx) => {
  const token = ctx.get('X-Token');
  const {
    account,
    loginType,
  } = ctx.session.user;
  const data = validateSetting(ctx.request.body);
  if (loginType !== 'password' && data.gesture) {
    throw errors.get(110);
  }
  return settingService.update({
    account,
    token,
  }, data).then((doc) => {
    /* eslint no-param-reassign:0 */
    ctx.body = doc;
  });
};
