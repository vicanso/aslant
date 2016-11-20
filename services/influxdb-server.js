const uuid = require('node-uuid');
const _ = require('lodash');
const Influx = require('influxdb-nodejs');

const Models = localRequire('models');
const errors = localRequire('helpers/errors');

function docsToJSON(docs) {
  return _.map(docs, item => item.toJSON());
}

function getInfluxClient(id, db = '_internal') {
  const InfluxdbServer = Models.get('Influxdb-server');
  return InfluxdbServer.findById(id).then((doc) => {
    if (!doc) {
      throw errors.get(201);
    }
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

exports.getById = (id) => {
  const InfluxdbServer = Models.get('Influxdb-server');
  return InfluxdbServer.findById(id).then(doc => doc.toJSON());
};

exports.list = (conditon) => {
  const InfluxdbServer = Models.get('Influxdb-server');
  return InfluxdbServer.find(conditon).sort({
    updatedAt: -1,
  }).then(docsToJSON);
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

exports.disabled = (conditon) => {
  const InfluxdbServer = Models.get('Influxdb-server');
  return InfluxdbServer.findOneAndUpdate(conditon, {
    enabled: false,
  }).then((doc) => {
    if (!doc) {
      throw errors.get(5);
    }
    return null;
  });
};

exports.showDatabases = id => getInfluxClient(id).then(client => client.showDatabases());

exports.showRetentionPolicies = (id, db) => getInfluxClient(id, db).then(client => client.showRetentionPolicies());

exports.addRetentionPolicy = (id, db, data) => {
  return getInfluxClient(id, db).then((client) => {
    return client.createRetentionPolicy(data.name, data.duration, data.replication, data.default);
  });
};

exports.dropRetentionPolicy = (id, db, rp) => {
  return getInfluxClient(id, db).then((client) => {
    return client.dropRetentionPolicy(rp);
  });
};

exports.updateRetentionPolicy = (id, db, data) => {
  return getInfluxClient(id, db).then((client) => {
    return client.updateRetentionPolicy(data.name, data.duration, data.replication, data.shardDuration, data.default);
  });
};


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

exports.query = (id, db, ql) => {
  return getInfluxClient(id, db).then((client) => {
    return client.queryRaw(ql);
  });
};

exports.addConfig = (data) => {
  const InfluxConfig = Models.get('Influx-config');
  const date = (new Date()).toISOString();
  data.createdAt = date;
  data.updatedAt = date;
  data.token = uuid.v4();
  return (new InfluxConfig(data)).save().then(doc => doc.toJSON());
};

exports.listConfig = (conditions) => {
  const InfluxConfig = Models.get('Influx-config');
  return InfluxConfig.find(conditions).sort({
    updatedAt: -1,
  }).then(docsToJSON);
};

exports.getConfig = (id) => {
  return Models.get('Influx-config').findById(id).then((doc) => {
    if (!doc) {
      return null;
    }
    return doc.toJSON();
  });
};


exports.updateConfig = (conditon, data) => {
  data.token = uuid.v4();
  data.updatedAt = (new Date()).toISOString();
  const InfluxConfig = Models.get('Influx-config');
  return InfluxConfig.findOneAndUpdate(conditon, data, {
    new: true,
  }).then((doc) => {
    if (!doc) {
      throw errors.get(4);
    }
    return doc.toJSON();
  });
};

exports.removeConfig = (conditon) => {
  const InfluxConfig = Models.get('Influx-config');
  return InfluxConfig.findOneAndRemove(conditon).then((doc) => {
    if (!doc) {
      throw errors.get(5);
    }
    return null;
  });
};
