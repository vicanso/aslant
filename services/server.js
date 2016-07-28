'use strict';
const _ = require('lodash');
const Models = localRequire('models');

const isExists = (name) => {
  const Server = Models.get('Server');
  return Server.findOne({ name }).exec().then(doc => {
    if (!doc) {
      return false;
    }
    return true;
  });
};

exports.findById = (id) => {
  const Server = Models.get('Server');
  return Server.findById(id).then(doc => {
    if (!doc) {
      throw errors.get('catn\'t get the influxdb server info', 404);
    }
    return doc.toJSON();
  });
};

exports.add = (data) => {
  const Server = Models.get('Server');
  return isExists(data.name).then(exists => {
    if (exists) {
      throw errors.get('The name has been used', 400);
    }
    return (new Server(data)).save();
  }).then(doc => {
    return doc.toJSON();
  });
};

exports.list = (conditions) => {
  const Server = Models.get('Server');
  return Server.find(conditions).then(docs => {
    return _.map(docs, doc => doc.toJSON());
  });
};

exports.update = (conditions, token, data) => {
  const Server = Models.get('Server');
  return Server.findOneAndUpdateByToken(conditions, token, data).then(doc => {
    if (!doc) {
      throw errors.get('update server info fail, may be token is expired');
    }
    return doc.toJSON();
  });
};

exports.remove = (conditions, token) => {
  const Server = Models.get('Server');
  return Server.findOneAndRemove(conditions).then(doc => {
    if (!doc) {
      return null;
    }
    return doc.toJSON();
  });
};
