const _ = require('lodash');

const Models = localRequire('models');
const errors = localRequire('errors');

exports.list = (conditions) => {
  const InfluxDashboard = Models.get('Dashboard');
  return InfluxDashboard.find(conditions).sort({
    updatedAt: -1,
  }).then(docs => _.map(docs, item => item.toJSON()));
};

exports.add = (data) => {
  const InfluxDashboard = Models.get('Dashboard');
  return new InfluxDashboard(data).save().then(doc => doc.toJSON());
};

exports.remove = (condition) => {
  const InfluxDashboard = Models.get('Dashboard');
  return InfluxDashboard.findOneAndRemove(condition).then((doc) => {
    if (!doc) {
      throw errors.get(5);
    }
    return null;
  });
};

exports.update = (conditon, data) => {
  const InfluxDashboard = Models.get('Dashboard');
  return InfluxDashboard.findOneAndUpdate(conditon, data, {
    new: true,
  }).then((doc) => {
    if (!doc) {
      throw errors.get(4);
    }
    return doc.toJSON();
  });
};
