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
  '[GET] [/api/users/me] [m.session.read & c.user.me]',
  '[DELETE] [/api/users/logout] [m.session & c.user.logout]',
  '[GET,POST] [/api/users/login] [m.session & c.user.login]',
  '[POST] [/api/users/register] [m.session & c.user.register]',
  '[PUT] [/api/users/me] [m.session & c.user.refreshSession]',
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

  // influxdb server route configs
  '[GET] [/api/influxdb/servers] [m.session.isLogined & m.session.read & c.server.list]',
  '[POST] [/api/influxdb/servers] [m.session.isLogined & m.session.read & c.server.add]',
  '[PUT] [/api/influxdb/servers/:id] [m.validateAccessToken & m.session.isLogined & m.session.read & c.server.update]',
  '[DELETE] [/api/influxdb/servers/:id] [m.session.isLogined & m.session.read & c.server.remove]',


  '[GET] [/api/influxdb/server/:id/dbs] [c.influxdb.showDatabases]',

  '[GET] [/api/influxdb/server/:id/:db/rps] [c.influxdb.showRetentionPolicies]',
  '[POST] [/api/influxdb/server/:id/:db/rps] [m.session.isLogined & m.session.read & c.influxdb.addRetentionPolicy]',
  '[DELETE] [/api/influxdb/server/:id/:db/rps/:rp] [m.session.isLogined & m.session.read & c.influxdb.removeRetentionPolicy]',
  '[PUT] [/api/influxdb/server/:id/:db/rps/:rp] [m.session.isLogined & m.session.read & c.influxdb.updateRetentionPolicy]',

  '[GET] [/api/influxdb/server/:id/:db/measurements] [c.influxdb.showMeasurements]',
  '[GET] [/api/influxdb/server/:id/:db/tag-keys,/api/influxdb/server/:id/:db/:measurement/tag-keys] [c.influxdb.showTagKeys]',
  '[GET] [/api/influxdb/server/:id/:db/field-keys,/api/influxdb/server/:id/:db/:measurement/field-keys] [c.influxdb.showFieldKeys]',
  '[GET] [/api/influxdb/server/:id/:db/series,/api/influxdb/server/:id/:db/:measurement/series] [c.influxdb.showSeries]',
  '[GET] [/api/influxdb/query/:id/:db] [c.influxdb.query]',

  '[GET] [/api/influxdb/select/:id/:db/:measurement] [c.influxdb.select]',

  // influxdb dashboards
  '[GET] [/api/influxdb/dashboards] [m.session.isLogined & m.session.read & c.dashboard.list]',
  '[POST] [/api/influxdb/dashboards] [m.session.isLogined & m.session.read & c.dashboard.add]',
  '[DELETE] [/api/influxdb/dashboards/:id] [m.session.isLogined & m.session.read & c.dashboard.remove]',
  '[PUT] [/api/influxdb/dashboards/:id] [m.session.isLogined & m.session.read & c.dashboard.update]',

  // influxdb configs
  '[GET] [/api/influxdb/configs] [m.session.isLogined & m.session.read & c.config.list]',
  '[GET] [/api/influxdb/configs/:id] [c.config.get]',
  '[POST] [/api/influxdb/configs] [m.session.isLogined & m.session.read & c.config.add]',
  '[PUT] [/api/influxdb/configs/:id] [m.validateAccessToken & m.session.isLogined & m.session.read & c.config.update]',
  '[DELETE] [/api/influxdb/configs/:id] [m.session.isLogined & m.session.read & c.config.remove]',

  // stats
  '[POST] [/api/stats/ajax] [c.stats.ajax]',
  '[POST] [/api/stats/exception] [c.stats.exception]',
  '[POST] [/api/stats/statistics] [c.stats.statistics]',
];
