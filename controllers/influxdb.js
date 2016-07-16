'use strict';
const Joi = require('joi');
const _ = require('lodash');
const influxdbService = localRequire('services/influxdb');
const errors = localRequire('helpers/errors');

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
    $or: [
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
  return influxdbService.removeServer(conditions).then(() => {
    /* eslint no-param-reassign:0 */
    ctx.body = null;
  });
};

exports.addConfigure = (ctx) => {
  const account = _.get(ctx, 'session.user.account');
  const data = Joi.validateThrow(ctx.request.body, {
    name: Joi.string().trim().required(),
    desc: Joi.string().trim().required(),
    configure: Joi.object().required(),
  });
  return influxdbService.addConfigure(_.extend({
    owner: account,
  }, data)).then(configure => {
    /* eslint no-param-reassign:0 */
    ctx.status = 201;
    ctx.body = configure;
  });
};

exports.listConfigure = (ctx) => {
  const account = _.get(ctx, 'session.user.account');
  return influxdbService.listConfigure({
    owner: account,
  }).then(configures => {
    /* eslint no-param-reassign:0 */
    ctx.body = {
      items: configures,
    };
  });
};

exports.listDatabase = (ctx) => influxdbService.listDatabases(ctx.params.id).then(data => {
  /* eslint no-param-reassign:0 */
  ctx.body = {
    items: data,
  };
});

exports.listRP = (ctx) => {
  const { id, db } = ctx.params;
  return influxdbService.listRP(id, db).then(data => {
    /* eslint no-param-reassign:0 */
    ctx.body = {
      items: data,
    };
  });
};

exports.listMeasurement = (ctx) => {
  const { id, db } = ctx.params;
  return influxdbService.listMeasurement(id, db).then(data => {
    /* eslint no-param-reassign:0 */
    ctx.body = {
      items: data,
    };
  });
};

exports.listTagInfo = (ctx) => {
  const { id, db, measurement } = ctx.params;
  return influxdbService.listTagInfo(id, db, measurement).then(data => {
    /* eslint no-param-reassign:0 */
    ctx.body = {
      items: data,
    };
  });
};

exports.listField = (ctx) => {
  const { id, db, measurement } = ctx.params;
  return influxdbService.listField(id, db, measurement).then(data => {
    /* eslint no-param-reassign:0 */
    ctx.body = {
      items: data,
    };
  });
};

exports.listPoint = (ctx) => {
  const { id, db } = ctx.params;
  const { ql } = ctx.query;
  if (!ql) {
    throw errors.get('ql can\'t be empty', 400);
  }
  return influxdbService.listPoint(id, db, ql).then(data => {
    const err = _.get(data, 'results[0].error');
    if (err) {
      throw errors.get(err);
    }
    /* eslint no-param-reassign:0 */
    ctx.body = {
      items: _.get(data, 'results[0].series'),
    };
  });
};

exports.updateConfigure = (ctx) => {
  const conditions = {
    owner: _.get(ctx, 'session.user.account'),
    _id: ctx.params.id,
  };
  const data = Joi.validateThrow(ctx.request.body, {
    name: Joi.string().required(),
    desc: Joi.string().required(),
    configure: Joi.object().required(),
  });
  return influxdbService.updateConfigure(conditions, ctx.get('X-Token'), data).then(configure => {
    /* eslint no-param-reassign:0 */
    ctx.body = configure;
  });
};

exports.removeConfigure = (ctx) => {
  const conditions = {
    owner: _.get(ctx, 'session.user.account'),
    _id: ctx.params.id,
  };
  return influxdbService.removeConfigure(conditions).then(() => {
    /* eslint no-param-reassign:0 */
    ctx.body = null;
  });
};

