const uuid = require('uuid');
const _ = require('lodash');

const Models = localRequire('models');

exports.add = (data) => {
  const InfluxConfig = Models.get('Config');
  return (new InfluxConfig(data)).save().then(doc => doc.toJSON());
};

exports.list = (conditions) => {
  const InfluxConfig = Models.get('Config');
  return InfluxConfig.find(conditions).sort({
    updatedAt: -1,
  }).then(docs => _.map(docs, item => item.toJSON()));
};

exports.get = (id) => {
  return Models.get('Config').findById(id).then((doc) => {
    if (!doc) {
      return null;
    }
    return doc.toJSON();
  });
};

exports.update = (conditon, data) => {
  const InfluxConfig = Models.get('Config');
  return InfluxConfig.findOneAndUpdate(conditon, data, {
    new: true,
  }).then((doc) => {
    if (!doc) {
      throw errors.get(4);
    }
    return doc.toJSON();
  });
};

exports.remove = (conditon) => {
  const InfluxConfig = Models.get('Config');
  return InfluxConfig.findOneAndRemove(conditon).then((doc) => {
    if (!doc) {
      throw errors.get(5);
    }
    return null;
  });
};
