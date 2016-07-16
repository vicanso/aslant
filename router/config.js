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
  '[GET] [/,/login,/register,/servers/*,/visualizations,/visualizations/*] [v.home & c.home]',

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
  '[POST] [/influxdb/servers] [m.session.login & c.influxdb.addServer]',
  '[GET] [/influxdb/servers] [m.session.login & c.influxdb.listServer]',
  '[PUT] [/influxdb/servers/:id] [m.session.login & m.validateToken & c.influxdb.editServer]',
  '[DELETE] [/influxdb/servers/:id] [m.session.login & c.influxdb.removeServer]',

  '[POST] [/influxdb/configures] [m.session.login & c.influxdb.addConfigure]',
  '[GET] [/influxdb/configures] [m.session.login & c.influxdb.listConfigure]',
  '[PUT] [/influxdb/configures/:id] [m.session.login & m.validateToken & c.influxdb.updateConfigure]',
  '[DELETE] [/influxdb/configures/:id] [m.session.login & c.influxdb.removeConfigure]',

  '[GET] [/influxdb/:id/databases] [m.cache-60 & c.influxdb.listDatabase]',
  '[GET] [/influxdb/:id/:db/rps] [m.cache-60 & c.influxdb.listRP]',
  '[GET] [/influxdb/:id/:db/measurements] [m.cache-60 & c.influxdb.listMeasurement]',
  '[GET] [/influxdb/:id/:db/:measurement/tag-infos] [m.cache-60 & c.influxdb.listTagInfo]',
  '[GET] [/influxdb/:id/:db/:measurement/fields] [m.cache-60 & c.influxdb.listField]',
  '[GET] [/influxdb/:id/:db/points] [c.influxdb.listPoint]',
];
