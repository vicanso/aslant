
const errors = localRequire('helpers/errors');
const Models = localRequire('models');

exports.add = (data) => {
  const Setting = Models.get('Setting');
  return (new Setting(data)).save().then(doc => doc.toJSON());
};

exports.getByAccount = account => Models.get('Setting').findOne({ account })
  .then((doc) => {
    if (!doc) {
      return null;
    }
    return doc.toJSON();
  });

exports.update = (condition, data) => {
  const Setting = Models.get('Setting');
  return Setting.findOneAndUpdate(condition, data, {
    new: true,
  }).then((doc) => {
    if (!doc) {
      throw errors.get(4);
    }
    return doc.toJSON();
  });
};
