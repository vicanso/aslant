const uuid = require('node-uuid');
const _ = require('lodash');

const Models = localRequire('models');
const errors = localRequire('helpers/errors');

exports.add = (data) => {
  const InfluxdbServer = Models.get('Influxdb-server');
  const date = (new Date()).toISOString();
  data.createdAt = date;
  data.updatedAt = date;
  data.token = uuid.v4();
  return (new InfluxdbServer(data)).save().then(doc => doc.toJSON());
};

exports.list = (conditon) => {
  const InfluxdbServer = Models.get('Influxdb-server');
  const convert = items => _.map(items, item => item.toJSON());
  return InfluxdbServer.find(conditon).sort({
    updatedAt: -1,
  }).then(convert);
};

exports.update = (conditon, data) => {
  data.token = uuid.v4();
  data.updatedAt = date;
  const InfluxdbServer = Models.get('Influxdb-server');
  return InfluxdbServer.findOneAndUpdate(conditon, data, {
    new: true,
  }).then((doc) => {
    if (!doc) {
      throw errors.get(4);
    }
    return doc.toJSON();
  });
};
