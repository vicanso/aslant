'use strict';
module.exports = [
  // system start
  '[GET] [/sys/version] [m.noQuery & m.cache-600 & c.system.version]',
  '[POST] [/sys/pause] [m.auth.admin & c.system.pause]',
  '[POST] [/sys/resume] [m.auth.admin & c.system.resume]',
  '[GET] [/sys/stats] [m.noQuery & c.system.stats]',
  '[POST] [/sys/restart] [m.auth.admin & c.system.restart]',

  // page view
  /* eslint max-len:0 */
  '[GET] [/,/login,/register,/servers/*,/visualizations,/visualizations/*,/dashboards,/dashboards/*] [v.home & c.home]',

  // user
  '[GET] [/users/me] [m.noCache & m.session.read & c.user.me]',
  '[DELETE] [/users/logout] [m.session & c.user.logout]',
  '[GET,POST] [/users/login] [m.noCache & m.session & c.user.login]',
  '[POST] [/users/register] [m.session & c.user.register]',

  // stats
  '[POST] [/stats/ajax] [c.stats.ajax]',
  '[POST] [/stats/exception] [c.stats.exception]',
  '[POST] [/stats/statistics] [c.stats.statistics]',

  // influxdb
  '[POST] [/api/servers] [m.session.login & c.server.add]',
  '[GET] [/api/servers] [m.session.login & c.server.list]',
  '[PUT] [/api/servers/:id] [m.session.login & m.validateToken & c.server.update]',
  '[DELETE] [/api/servers/:id] [m.session.login & c.server.remove]',

  '[POST] [/api/configures] [m.session.login & c.configure.add]',
  '[GET] [/api/configures] [m.session.login & c.configure.list]',
  '[PUT] [/api/configures/:id] [m.session.login & m.validateToken & c.configure.update]',
  '[DELETE] [/api/configures/:id] [m.session.login & c.configure.remove]',

  '[POST] [/api/dashboards] [m.session.login & c.dashboard.add]',
  '[GET] [/api/dashboards] [m.session.login & c.dashboard.list]',
  '[DELETE] [/api/dashboards/:id] [m.session.login & c.dashboard.remove]',
  '[PUT] [/api/dashboards/:id] [m.session.login & m.validateToken & c.dashboard.update]',

  '[GET] [/influxdb/:id/databases] [m.cache-60 & c.influxdb.listDatabase]',
  '[GET] [/influxdb/:id/:db/rps] [m.cache-60 & c.influxdb.listRP]',
  '[GET] [/influxdb/:id/:db/measurements] [m.cache-60 & c.influxdb.listMeasurement]',
  '[GET] [/influxdb/:id/:db/:measurement/tag-infos] [m.cache-60 & c.influxdb.listTagInfo]',
  '[GET] [/influxdb/:id/:db/:measurement/fields] [m.cache-60 & c.influxdb.listField]',
  '[GET] [/influxdb/:id/:db/points] [c.influxdb.listPoint]',
];
