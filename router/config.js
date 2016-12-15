const middlewares = localRequire('middlewares');
const tracker = middlewares.tracker;

module.exports = [
  // system start
  '[GET] [/api/sys/version] [m.noQuery & c.system.version]',
  '[POST] [/api/sys/pause] [m.auth.admin & c.system.pause]',
  '[POST] [/api/sys/resume] [m.auth.admin & c.system.resume]',
  '[GET] [/api/sys/stats] [m.noQuery & c.system.stats]',
  '[POST] [/api/sys/restart] [m.auth.admin & c.system.restart]',

  // page view
  '[GET] [/,/login,/register,/about,/influxdb/*] [v.home & c.home]',

  // user
  '[GET] [/api/users/me] [m.session.read & c.user.me]',
  '[DELETE] [/api/users/logout] [m.session & c.user.logout]',
  '[GET] [/api/users/login] [m.session & c.user.login]',
  {
    methods: ['POST'],
    urls: ['/api/users/login'],
    handlers: [
      'm.session',
      tracker('login', ['account']),
      'c.user.login',
    ],
  },
  {
    methods: ['POST'],
    urls: ['/api/users/register'],
    handlers: [
      'm.session',
      tracker('register', ['account', 'email']),
      'c.user.register',
    ],
  },
  '[PUT] [/api/users/me] [m.session & c.user.refreshSession]',

  // influxdb server route configs
  '[GET] [/api/influxdb/servers] [m.session.isLogined & m.session.read & c.server.list]',
  {
    methods: ['POST'],
    urls: ['/api/influxdb/servers'],
    handlers: [
      'm.session.isLogined',
      'm.session.read',
      tracker('add-server', ['name', 'host', 'port']),
      'c.server.add',
    ],
  },
  {
    methods: ['PUT'],
    urls: ['/api/influxdb/servers/:id'],
    handlers: [
      'm.validateAccessToken',
      'm.session.isLogined',
      'm.session.read',
      tracker('update-server', ['name', 'host', 'port']),
      'c.server.update',
    ],
  },
  {
    methods: ['DELETE'],
    urls: ['/api/influxdb/servers/:id'],
    handlers: [
      'm.session.isLogined',
      'm.session.read',
      tracker('remove-server', ['id']),
      'c.server.remove',
    ],
  },

  // influxb ql
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
  {
    methods: ['POST'],
    urls: ['/api/influxdb/dashboards'],
    handlers: [
      'm.session.isLogined',
      'm.session.read',
      tracker('add-dashboard', ['name']),
      'c.dashboard.add',
    ],
  },
  '[DELETE] [/api/influxdb/dashboards/:id] [m.session.isLogined & m.session.read & c.dashboard.remove]',
  {
    methods: ['PUT'],
    urls: ['/api/influxdb/dashboards/:id'],
    handlers: [
      'm.session.isLogined',
      'm.session.read',
      tracker('update-dashboard', ['name']),
      'c.dashboard.update',
    ],
  },

  // influxdb configs
  '[GET] [/api/influxdb/configs] [m.session.isLogined & m.session.read & c.config.list]',
  '[GET] [/api/influxdb/configs/:id] [c.config.get]',
  {
    methods: ['POST'],
    urls: ['/api/influxdb/configs'],
    handlers: [
      'm.session.isLogined',
      'm.session.read',
      tracker('add-config', ['name', 'server', 'database']),
      'c.config.add',
    ],
  },
  {
    methods: ['PUT'],
    urls: ['/api/influxdb/configs/:id'],
    handlers: [
      'm.validateAccessToken',
      'm.session.isLogined',
      'm.session.read',
      tracker('update-config', ['name', 'server', 'database']),
      'c.config.update',
    ],
  },
  '[DELETE] [/api/influxdb/configs/:id] [m.session.isLogined & m.session.read & c.config.remove]',

  // stats
  '[POST] [/api/stats/ajax] [c.stats.ajax]',
  '[POST] [/api/stats/exception] [c.stats.exception]',
  '[POST] [/api/stats/statistics] [c.stats.statistics]',
];
