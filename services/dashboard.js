'use strict';
const _ = require('lodash');
const Models = localRequire('models');

exports.add = (data) => {
  const Dashboard = Models.get('Dashboard');
  return (new Dashboard(data)).save()
    .then(doc => {
      return doc.toJSON();
    }); 
};

exports.list = (conditions) => {
  const Dashboard = Models.get('Dashboard');
  return Dashboard.find(conditions).then(docs => {
    return _.map(docs, doc => doc.toJSON());
  });
};

exports.remove = (conditions) => {
  const Dashboard = Models.get('Dashboard');
  return Dashboard.findOneAndRemove(conditions).then(doc => {
    if (!doc) {
      return null;
    }
    return doc.toJSON();
  });
};
