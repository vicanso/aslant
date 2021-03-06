const session = require('koa-simple-session');
const RedisStore = require('koa-simple-redis');
const _ = require('lodash');

const config = localRequire('config');
const errors = localRequire('helpers/errors');

const sessionMiddleware = session({
  key: config.app,
  prefix: `${config.app}-session:`,
  ttl: config.session.ttl,
  errorHandler: err => console.error(err),
  store: new RedisStore({
    url: config.redisUri,
    key: config.session.key,
  }),
  cookie: {
    maxAge: config.session.maxAge,
  },
});

const normal = (ctx, next) => {
  if (ctx.session) {
    return next();
  }
  if (ctx.get('Cache-Control') !== 'no-cache' && ctx.query['cache-control'] !== 'no-cache') {
    throw errors.get(6);
  }
  const startAt = process.hrtime();
  const timing = ctx.state.timing;
  const end = timing.start('session');
  return sessionMiddleware(ctx, () => {
    const diff = process.hrtime(startAt);
    const time = (diff[0] * 1e3) + (diff[1] * 1e-6);
    const account = _.get(ctx, 'session.user.account', 'unknown');
    if (time > 10) {
      console.info(`get session user:${account} use:${time.toFixed(2)}ms`);
    }
    end();
    return next();
  });
};

exports.writable = normal;

exports.readonly = (ctx, next) => normal(ctx, () => {
  Object.freeze(ctx.session);
  return next();
});

exports.isLogined = (ctx, next) => normal(ctx, () => {
  if (!_.get(ctx, 'session.user.account')) {
    throw errors.get(107);
  }
  return next();
});
