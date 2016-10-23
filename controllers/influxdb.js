const _ = require('lodash');

const InfluxdbServer = localRequire('services/influxdb-server');

exports.add = (ctx) => {
  const data = ctx.request.body;
  data.account = ctx.session.user.account;
  return InfluxdbServer.add(data).then((doc) => {
    const keys = 'account token name host port'.split(' ');
    ctx.body = _.pick(doc, keys);
  });
};

exports.list = (ctx) => {
  /* eslint no-param-reassign:0 */
  ctx.body = [];
};
