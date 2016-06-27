'use strict';
const Joi = require('joi');
const _ = require('lodash');
const influxdbService = localRequire('services/influxdb');

exports.addServer = (ctx) => {
  const account = _.get(ctx, 'session.user.account');
  const data = Joi.validateThrow(ctx.request.body, {
    name: Joi.string().trim().required(),
    host: Joi.string().trim().required(),
    port: Joi.number().integer().required(),
    ssl: Joi.boolean().required(),
    user: Joi.string().trim(),
    password: Joi.string().trim(),
  });
  data.owner = account;
  return influxdbService.addServer(data).then(server => {
    ctx.status = 201;
    ctx.body = server;
  });
};

exports.listServer = (ctx) => {
  const account = _.get(ctx, 'session.user.account');
  return influxdbService.listServer(account).then(servers => {
    ctx.body = servers;
  });
};
