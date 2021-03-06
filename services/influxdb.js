const _ = require('lodash');
const Influx = require('influxdb-nodejs');

const Models = localRequire('models');
const errors = localRequire('helpers/errors');
const clientMap = new Map();

function getInfluxClient(id, db = '_internal') {
  const key = `${id}-${db}`;
  const client = clientMap.get(key);
  if (client) {
    return Promise.resolve(client);
  }
  const InfluxdbServer = Models.get('Server');
  return InfluxdbServer.findById(id).then((doc) => {
    if (!doc) {
      throw errors.get(201);
    }
    const config = doc.toJSON();
    const arr = [];
    arr.push(config.ssl ? 'https://' : 'http://');
    if (config.username && config.password) {
      arr.push(`${config.username}:${config.password}@`);
    }
    arr.push(`${config.host}:${config.port}/${db}`);
    const tmpClient = new Influx(arr.join(''));
    tmpClient.timeout = 30000;
    clientMap.set(key, tmpClient);
    return tmpClient;
  });
}

exports.clearClientWithPrefix = (prefix) => {
  clientMap.forEach((value, key) => {
    if (key.indexOf(prefix) === 0) {
      clientMap.delete(key);
    }
  });
};


exports.showDatabases = id => getInfluxClient(id)
  .then(client => client.showDatabases());

exports.showRetentionPolicies = (id, db) => getInfluxClient(id, db)
  .then(client => client.showRetentionPolicies());

exports.addRetentionPolicy = (id, db, data) => getInfluxClient(id, db)
  .then((client) => {
    const {
      name,
      duration,
      replication,
    } = data;
    return client.createRetentionPolicy(name, duration, replication, data.default);
  });

exports.dropRetentionPolicy = (id, db, rp) => getInfluxClient(id, db)
  .then(client => client.dropRetentionPolicy(rp));


exports.updateRetentionPolicy = (id, db, data) => getInfluxClient(id, db)
  .then((client) => {
    const {
      name,
      duration,
      replication,
      shardDuration,
    } = data;
    return client.updateRetentionPolicy(name, duration, replication, shardDuration, data.default);
  });

exports.showMeasurements = (id, db) => getInfluxClient(id, db)
  .then(client => client.showMeasurements());

exports.showTagKeys = (id, db, measurement) => getInfluxClient(id, db)
  .then(client => client.showTagKeys(measurement));

exports.showFieldKeys = (id, db, measurement) => getInfluxClient(id, db)
  .then(client => client.showFieldKeys(measurement));

exports.showSeries = (id, db, measurement) => getInfluxClient(id, db)
  .then(client => client.showSeries(measurement));

exports.select = (id, db, measurement, query) => getInfluxClient(id, db)
  .then((client) => {
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

exports.query = (id, db, ql) => getInfluxClient(id, db)
  .then(client => client.queryRaw(ql));
