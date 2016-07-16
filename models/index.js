'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _ = require('lodash');
const uuid = require('uuid');
const config = localRequire('config');
const requireTree = require('require-tree');
mongoose.Promise = require('bluebird');

function findOneAndUpdateByToken(conditions, token, data) {
  const query = _.extend({}, conditions, {
    token,
  });
  const updateData = _.extend({}, data, {
    token: uuid.v4(),
  });
  return this.findOneAndUpdate(query, updateData, {
    new: true,
  });
}

const initModels = (client, modelPath) => {
  const models = requireTree(modelPath);
  _.forEach(models, (model, key) => {
    const name = model.name || (key.charAt(0).toUpperCase() + key.substring(1));
    const schema = new Schema(model.schema, model.options);
    schema.static('findOneAndUpdateByToken', findOneAndUpdateByToken);
    if (model.indexes) {
      _.forEach(model.indexes, options => schema.index(options));
    }
    _.forEach(['pre', 'post'], type => {
      _.forEach(model[type], (fns, k) => {
        _.forEach(fns, fn => schema[type](k, fn));
      });
    });

    client.model(name, schema);
  });
};

const initClient = (uri, options) => {
  /* istanbul ignore if */
  if (!uri) {
    return null;
  }
  const opts = _.extend({
    db: {
      native_parser: true,
    },
    server: {
      poolSize: 5,
    },
  }, options);
  const client = mongoose.createConnection(uri, opts);
  client.on('connected', () => {
    console.info(`${uri} connected`);
  });
  client.on('disconnected', () => {
    /* istanbul ignore next */
    console.error(`${uri} disconnected`);
  });
  client.on('reconnected', _.debounce(() => {
    /* istanbul ignore next */
    console.error(`${uri} reconnected`);
  }, 3000));
  client.on('connecting', () => {
    /* istanbul ignore next */
    console.error(`${uri} connecting`);
  });
  client.on('error', err => {
    /* istanbul ignore next */
    console.error(`${uri} error, %s`, err);
  });
  initModels(client, __dirname);
  return client;
};

const client = initClient(config.mongoUri);

exports.get = (name) => {
  /* istanbul ignore if */
  if (!client) {
    throw new Error('the db is not init!');
  }
  return client.model(name);
};

