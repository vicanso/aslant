'use strcit';
const _ = require('lodash');
const Models = localRequire('models');

exports.add = (data) => {
  const Configure = Models.get('Configure');
  return (new Configure(data)).save()
    .then(doc => {
      return doc.toJSON();
    });
};

exports.list = (conditions) => {
  const Configure = Models.get('Configure');
  return Configure.find(conditions).then(docs => {
    return _.map(docs, doc => doc.toJSON());
  });
};

exports.update = (conditions, token, data) => {
  const Configure = Models.get('Configure');
  return Configure.findOneAndUpdateByToken(conditions, token, data).then(doc => {
    if (!doc) {
      return null;
    }
    return doc.toJSON();
  });
};

exports.remove = (conditions) => {
  const Configure = Models.get('Configure');
  return Configure.findOneAndRemove(conditions).then(doc => {
    if (!doc) {
      return null;
    }
    return doc.toJSON();
  });
};