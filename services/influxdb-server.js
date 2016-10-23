const uuid = require('node-uuid');

const Models = localRequire('models');

exports.add = (data) => {
  const InfluxdbServer = Models.get('Influxdb-server');
  const date = (new Date()).toISOString();
  data.createdAt = date;
  data.token = uuid.v4();
  return (new InfluxdbServer(data)).save().then(doc => doc.toJSON());
};
