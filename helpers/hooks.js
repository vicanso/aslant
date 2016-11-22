const uuid = require('node-uuid');


function createSaveStats(name) {
  return {
    pre: function prevSave(next) {
      if (!this.startedAt) {
        this.startedAt = Date.now();
      }
      next();
    },
    post: function postSave(doc) {
      /* eslint no-underscore-dangle:0 */
      const id = doc._id.toString();
      const use = Date.now() - doc.startedAt;
      console.info(`${name} save ${id} success, use:${use}ms`);
    },
  };
}

function findOneAndUpdate(next) {
  /* eslint no-underscore-dangle:0 */
  const data = this._update;
  data.updatedAt = (new Date()).toISOString();
  data.token = uuid.v4();
  if (data.$inc) {
    data.$inc.__v = 1;
  } else {
    data.$inc = {
      __v: 1,
    };
  }
  next();
}

exports.findOneAndUpdate = findOneAndUpdate;

exports.statistics = {
  save: createSaveStats,
};
