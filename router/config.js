'use strict';
module.exports = [
  // system start
  '[GET] [/sys/version] [m.noQuery & m.cache-600 & c.system.version]',
  '[POST] [/sys/pause] [m.auth.admin & c.system.pause]',
  '[POST] [/sys/resume] [m.auth.admin & c.system.resume]',
  '[GET] [/sys/stats] [m.noQuery & c.system.stats]',
  '[POST] [/sys/restart] [m.auth.admin & c.system.restart]',

  // page view
  '[GET] [/,/login,/register,/servers/*,/visualizations,/visualizations/edit] [v.home & c.home]',

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
  '[POST] [/influxdb/servers/add] [m.session.login & c.influxdb.addServer]',
  '[GET] [/influxdb/servers] [m.session.login & c.influxdb.listServer]',
  '[PUT] [/influxdb/servers/:id] [m.session.login & m.validateToken & c.influxdb.editServer]',
  '[DELETE] [/influxdb/servers/:id] [m.session.login & m.validateToken & c.influxdb.removeServer]',
  '[GET] [/influxdb/:id/databases] [m.cache-60 & c.influxdb.listDatabase]',
];
