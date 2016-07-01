'use strcit';
const _ = require('lodash');
const Models = localRequire('models');
const errors = localRequire('helpers/errors');
const uuid = require('uuid');
const Influx = require('influxdb-nodejs');

const isExists = (name) => {
  const InfluxdbServer = Models.get('Influxdb-server');
  return InfluxdbServer.findOne({ name }).exec().then(doc => {
    if (!doc) {
      return false;
    }
    return true;
  });
};

const getInfluxdbUrl = (server, db = '_internal') => {
  let urlStr = '';
  if (server.ssl) {
    urlStr += 'https://';
  } else {
    urlStr += 'http://';
  }
  if (server.user && server.password) {
    urlStr += `${server.user}:${server.password}@`;
  }
  return urlStr + `${server.host}:${server.port}/${db}`;
};

exports.addServer = (data) => {
  const InfluxdbServer = Models.get('Influxdb-server');
  return isExists(data.name).then(exists => {
    if (exists) {
      throw errors.get('The name has been used', 400);
    }
    return (new InfluxdbServer(data)).save();
  }).then(doc => {
    return doc.toJSON();
  });
};

exports.listServer = (conditions) => {
  const InfluxdbServer = Models.get('Influxdb-server');
  return InfluxdbServer.find(conditions).then(docs => {
    return _.map(docs, doc => doc.toJSON());
  });
};

exports.updateServer = (conditions, token, data) => {
  const InfluxdbServer = Models.get('Influxdb-server');
  const query = _.extend({}, conditions, {
    token,
  });
  const updateData = _.extend({}, data, {
    token: uuid.v4(),
  });
  return InfluxdbServer.findOneAndUpdate(query, updateData, {
    'new': true,
  }).then(doc => {
    if (!doc) {
      throw errors.get('update server info fail, may be token is expired');
    }
    return doc.toJSON();
  });
};

exports.removeServer = (conditions, token) => {
  const InfluxdbServer = Models.get('Influxdb-server');
  const query = _.extend({}, conditions, {
    token,
  });
  return InfluxdbServer.findOneAndRemove(query).then(doc => {
    if (!doc) {
      throw errors.get('update server info fail, may be token is expired');
    }
    return doc.toJSON();
  });
};


exports.listDatabases = (id) => {
  const InfluxdbServer = Models.get('Influxdb-server');
  return InfluxdbServer.findById(id).then(doc => {
    if (!doc) {
      throw errors.get('catn\'t get the influxdb server info', 404);
    }
    const url = getInfluxdbUrl(doc.toJSON(), '_internal');
    const client = new Influx(url);
    return client.showDatabases();
  }).then(data => {
    return _.flatten(_.get(data, 'results[0].series[0].values'));
  });
};
