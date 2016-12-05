const uuid = require('uuid');
const _ = require('lodash');

const Models = localRequire('models');

exports.add = (data) => {
  const InfluxConfig = Models.get('Config');
  return (new InfluxConfig(data)).save().then(doc => doc.toJSON());
};

exports.list = (conditions, sort) => {
  const InfluxConfig = Models.get('Config');
  return InfluxConfig.find(conditions).sort(sort).then(docs => _.map(docs, item => item.toJSON()));
};

exports.get = (id) => {
  return Models.get('Config').findById(id).then((doc) => {
    if (!doc) {
      return null;
    }
    return doc.toJSON();
  });
};

exports.update = (condition, data) => {
  const InfluxConfig = Models.get('Config');
  return InfluxConfig.findOneAndUpdate(condition, data, {
    new: true,
  }).then((doc) => {
    if (!doc) {
      throw errors.get(4);
    }
    return doc.toJSON();
  });
};

exports.remove = (condition) => {
  const InfluxConfig = Models.get('Config');
  return InfluxConfig.findOneAndRemove(condition).then((doc) => {
    if (!doc) {
      throw errors.get(5);
    }
    return null;
  });
};
