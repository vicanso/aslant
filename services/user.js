const crypto = require('crypto');
const _ = require('lodash');

const Models = localRequire('models');
const errors = localRequire('helpers/errors');
const settingServcice = localRequire('services/setting');

const isExists = (condition) => {
  const User = Models.get('User');
  return User.findOne(condition).exec().then(doc => !_.isNil(doc));
};

exports.add = (data) => {
  const User = Models.get('User');
  return isExists({
    account: data.account,
  }).then((exists) => {
    if (exists) {
      throw errors.get(104);
    }
    return isExists({
      email: data.email,
    });
  }).then((exists) => {
    if (exists) {
      throw errors.get(105);
    }
    const userData = _.clone(data);
    const date = (new Date()).toISOString();
    userData.createdAt = date;
    userData.lastLoginedAt = date;
    userData.loginCount = 1;
    return (new User(userData)).save().then(doc => doc.toJSON());
  });
};

exports.get = (account, password, token, type) => {
  const User = Models.get('User');
  return User.findOne({
    account,
  }).then((doc) => {
    const incorrectError = errors.get(106);
    if (!doc) {
      throw incorrectError;
    }
    const validatePassword = (value) => {
      const hash = crypto.createHash('sha256');
      if (hash.update(value + token).digest('hex') !== password) {
        return false;
      }
      return true;
    };
    if (type === 'gesture') {
      return settingServcice.getByAccount(account).then((setting) => {
        if (!validatePassword(setting.gesture)) {
          throw incorrectError;
        }
        return doc.toJSON();
      });
    }
    if (!validatePassword(doc.password)) {
      throw incorrectError;
    }
    return doc.toJSON();
  });
};

exports.update = (id, data) => {
  const User = Models.get('User');
  return User.findByIdAndUpdate(id, data).then(doc => doc.toJSON());
};

exports.addLoginRecord = (data) => {
  const Login = Models.get('Login');
  /* eslint no-param-reassign:0 */
  data.createdAt = (new Date()).toISOString();
  return (new Login(data)).save().catch((err) => {
    console.error(`add login record fail, account:${data.account}, err:${err.message}`);
  });
};
