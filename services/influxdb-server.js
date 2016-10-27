const uuid = require('node-uuid');
const _ = require('lodash');
const Influx = require('influxdb-nodejs');

const Models = localRequire('models');
const errors = localRequire('helpers/errors');

function getInfluxClient(id, db = '_internal') {
  const InfluxdbServer = Models.get('Influxdb-server');
  return InfluxdbServer.findById(id).then((doc) => {
    const config = doc.toJSON();
    const arr = [];
    arr.push(config.ssl? 'https://' : 'http://');
    if (config.username && config.password) {
      arr.push(`${config.username}:${config.password}@`)
    }
    arr.push(`${config.host}:${config.port}/${db}`);
    return new Influx(arr.join(''));
  });
}

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
  data.updatedAt = (new Date()).toISOString();
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

exports.remove = (conditon) => {
  const InfluxdbServer = Models.get('Influxdb-server');
  return InfluxdbServer.findOneAndRemove(conditon).then((doc) => {
    if (!doc) {
      throw errors.get(5);
    }
    return null;
  });
};

exports.showDatabases = id => getInfluxClient(id).then(client => client.showDatabases());

exports.showRetentionPolicies = (id, db) => getInfluxClient(id, db).then(client => client.showRetentionPolicies());

exports.showMeasurements = (id, db) => getInfluxClient(id, db).then(client => client.showMeasurements());

exports.showTagKeys = (id, db, measurement) => getInfluxClient(id, db).then(client => client.showTagKeys(measurement));

exports.showFieldKeys = (id, db, measurement) => getInfluxClient(id, db).then(client => client.showFieldKeys(measurement));

exports.showSeries = (id, db, measurement) => getInfluxClient(id, db).then(client => client.showSeries(measurement));


exports.select = (id, db, measurement, query) => {
  return getInfluxClient(id, db).then((client) => {
    const reader = client.query(measurement);
    _.forEach(query, (v, k) => {
      switch (k) {
        case 'fields':
          reader.addField(...v);
          break;
        case 'conditon':
          reader.conditon(v);
          break;
        default:
          reader[k] = v;
          break;
      }
    });
    return reader;
  });
};

