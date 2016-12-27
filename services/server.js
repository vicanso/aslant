const _ = require('lodash');

const Models = localRequire('models');
const errors = localRequire('helpers/errors');


function mask(data) {
  if (!data.password) {
    return data;
  }
  return _.extend(data, {
    password: '***',
  });
}

exports.add = (data) => {
  const Server = Models.get('Server');
  return (new Server(data)).save().then(doc => mask(doc.toJSON()));
};

exports.getById = (id) => {
  const Server = Models.get('Server');
  return Server.findById(id).then(doc => mask(doc.toJSON()));
};

exports.list = (conditon) => {
  const Server = Models.get('Server');
  return Server.find(conditon).sort({
    updatedAt: -1,
  }).then(docs => _.map(docs, item => mask(item.toJSON())));
};

exports.update = (conditon, data) => {
  const Server = Models.get('Server');
  return Server.findOneAndUpdate(conditon, data, {
    new: true,
  }).then((doc) => {
    if (!doc) {
      throw errors.get(4);
    }
    return mask(doc.toJSON());
  });
};

exports.disabled = (conditon) => {
  const Server = Models.get('Server');
  return Server.findOneAndUpdate(conditon, {
    enabled: false,
  }).then((doc) => {
    if (!doc) {
      throw errors.get(5);
    }
    return null;
  });
};
