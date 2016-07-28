'use strcit';
const _ = require('lodash');
const Models = localRequire('models');
const errors = localRequire('helpers/errors');
const uuid = require('uuid');
const Influx = require('influxdb-nodejs');
const serverService = localRequire('services/server');


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

const getInfluxClient = (id, db) => {
  return serverService.findById(id).then(server => {
    const url = getInfluxdbUrl(server, db);
    return new Influx(url);
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
        value: v.sort(),
      });
    });
    return tagInfos;
  });
};

exports.listField = (id, db, measurement) => {
  return getInfluxClient(id, db).then(client => {
    return client.showFieldKeys(measurement);
  }).then(data => {
    return _.flatten(_.get(data, 'results[0].series[0].values', []));
  });
};

exports.listPoint = (id, db, ql) => {
  return getInfluxClient(id, db).then(client => {
    return client.queryRaw(ql, db);
  }).then(data => {
    return data;
  });
};

exports.addConfigure = (data) => {
  const InfluxdbConfigure = Models.get('Influxdb-configure');
  return (new InfluxdbConfigure(data)).save()
    .then(doc => {
      return doc.toJSON();
    });
};

exports.listConfigure = (conditions) => {
  const InfluxdbConfigure = Models.get('Influxdb-configure');
  return InfluxdbConfigure.find(conditions).then(docs => {
    return _.map(docs, doc => doc.toJSON());
  });
};

exports.updateConfigure = (conditions, token, data) => {
  const InfluxdbConfigure = Models.get('Influxdb-configure');
  return InfluxdbConfigure.findOneAndUpdateByToken(conditions, token, data).then(doc => {
    if (!doc) {
      throw errors.get('update configure info fail, may be token is expired');
    }
    return doc.toJSON();
  });
};

exports.removeConfigure = (conditions) => {
  const InfluxdbConfigure = Models.get('Influxdb-configure');
  return InfluxdbConfigure.findOneAndRemove(conditions).then(doc => {
    if (!doc) {
      return null;
    }
    return doc.toJSON();
  });
};
