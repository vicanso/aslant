'use strcit';
const _ = require('lodash');
const Models = localRequire('models');
const errors = localRequire('helpers/errors');
const uuid = require('uuid');

const isExists = (name) => {
  const InfluxdbServer = Models.get('Influxdb-server');
  return InfluxdbServer.findOne({ name }).exec().then(doc => {
    if (!doc) {
      return false;
    }
    return true;
  });
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

exports.listServer = (owner) => {
  const InfluxdbServer = Models.get('Influxdb-server');
  return InfluxdbServer.find({ owner }).then(docs => {
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
