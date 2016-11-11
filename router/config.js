const middlewares = localRequire('middlewares');
const {
  version,
  tracker,
} = middlewares.common;
module.exports = [
  // system start
  '[GET] [/api/sys/version] [m.noQuery & c.system.version]',
  '[POST] [/api/sys/pause] [m.auth.admin & c.system.pause]',
  '[POST] [/api/sys/resume] [m.auth.admin & c.system.resume]',
  '[GET] [/api/sys/stats] [m.noQuery & c.system.stats]',
  '[POST] [/api/sys/restart] [m.auth.admin & c.system.restart]',

  // page view
  '[GET] [/,/login,/register,/influxdb/*] [v.home & c.home]',

  // user
  '[GET] [/api/users/me] [m.noCache & m.session.read & c.user.me]',
  '[DELETE] [/api/users/logout] [m.session & c.user.logout]',
  '[GET,POST] [/api/users/login] [m.noCache & m.session & c.user.login]',
  '[POST] [/api/users/register] [m.session & c.user.register]',
  {
    methods: ['POST'],
    urls: ['/api/users/like'],
    handlers: [
      tracker('user-like', ['code']),
      version([2, 3]),
      'm.session.read',
      'c.user.like',
    ],
  },

  // influxdb
  '[GET] [/api/influxdb/servers] [m.session.isLogined & m.session.read & c.influxdb.list]',
  '[POST] [/api/influxdb/servers] [m.session.isLogined & m.session.read & c.influxdb.add]',
  '[PUT] [/api/influxdb/servers/:id] [m.validateAccessToken & m.session.isLogined & m.session.read & c.influxdb.update]',
  '[DELETE] [/api/influxdb/servers/:id] [m.session.isLogined & m.session.read & c.influxdb.remove]',
  '[GET] [/api/influxdb/server/:id/dbs] [c.influxdb.showDatabases]',
  '[GET] [/api/influxdb/server/:id/:db/rps] [c.influxdb.showRetentionPolicies]',
  '[GET] [/api/influxdb/server/:id/:db/measurements] [c.influxdb.showMeasurements]',
  '[GET] [/api/influxdb/server/:id/:db/tag-keys,/api/influxdb/server/:id/:db/:measurement/tag-keys] [c.influxdb.showTagKeys]',
  '[GET] [/api/influxdb/server/:id/:db/field-keys,/api/influxdb/server/:id/:db/:measurement/field-keys] [c.influxdb.showFieldKeys]',
  '[GET] [/api/influxdb/server/:id/:db/series,/api/influxdb/server/:id/:db/:measurement/series] [c.influxdb.showSeries]',
  '[GET] [/api/influxdb/query/:id/:db] [c.influxdb.query]',

  '[GET] [/api/influxdb/select/:id/:db/:measurement] [c.influxdb.select]',

  '[GET] [/api/influxdb/configs] [m.session.isLogined & m.session.read & c.influxdb.listConfig]',
  '[GET] [/api/influxdb/configs/:id] [c.influxdb.getConfig]',
  '[POST] [/api/influxdb/configs] [m.session.isLogined & m.session.read & c.influxdb.addConfig]',
  '[PUT] [/api/influxdb/configs/:id] [m.validateAccessToken & m.session.isLogined & m.session.read & c.influxdb.updateConfig]',

  // stats
  '[POST] [/api/stats/ajax] [c.stats.ajax]',
  '[POST] [/api/stats/exception] [c.stats.exception]',
  '[POST] [/api/stats/statistics] [c.stats.statistics]',
];
