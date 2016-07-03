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

const getServerInfoById = (id) => {
  const InfluxdbServer = Models.get('Influxdb-server');
  return InfluxdbServer.findById(id).then(doc => {
    if (!doc) {
      throw errors.get('catn\'t get the influxdb server info', 404);
    }
    return doc.toJSON();
  });
};

const getInfluxClient = (id, db) => {
  return getServerInfoById(id).then(server => {
    const url = getInfluxdbUrl(server, db);
    return new Influx(url);
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
  return getInfluxClient(id, '_internal').then(client => {
    return client.showDatabases();
  }).then(data => {
    return _.flatten(_.get(data, 'results[0].series[0].values'));
  });
};

exports.listRP = (id, db) => {
  return getInfluxClient(id, db).then(client => {
    return client.showRetentionPolicies();
  }).then(data => {
    return _.map(_.get(data, 'results[0].series[0].values'), arr => arr[0]);
  });
};

exports.listMeasurement = (id, db) => {
return getInfluxClient(id, db).then(client => {
    return client.showMeasurements();
  }).then(data => {
    return _.map(_.get(data, 'results[0].series[0].values'), arr => arr[0]);
  });
};

exports.listTagInfo = (id, db, measurement) => {
  return getInfluxClient(id, db).then(client => {
    return client.showSeries(measurement);
  }).then(data => {
    const result = {};
    _.forEach(_.get(data, 'results[0].series[0].values'), arr => {
      const list = arr[0].split(',').slice(1);
      _.forEach(list, item => {
        const tmpArr = item.split('=');
        const tag = tmpArr[0];
        const value = tmpArr[1];
        if (!result[tag]) {
          result[tag] = [];
        }
        if (!~_.indexOf(result[tag], value)) {
          result[tag].push(value);
        }
      });
    });
    const tagInfos = [];
    _.forEach(result, (v, k) => {
      tagInfos.push({
        tag: k,
        value: v,
      });
    });
    return tagInfos;
  });
};

exports.listTagKey = (id, db, measurement) => {
  return getInfluxClient(id, db).then(client => {
    return client.showTagKeys(measurement);
  }).then(data => {
    return _.map(_.get(data, 'results[0].series[0].values'), arr => arr[0]);
  });
};

exports.listSeries = (id, db, measurement) => {
  return getInfluxClient(id, db).then(client => {
    return client.showSeries(measurement);
  }).then(data => {
    return _.map(_.get(data, 'results[0].series[0].values'), arr => arr[0]);
  });
};

