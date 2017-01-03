const {
  Schema,
} = require('mongoose');

const {
  createUpdateHook,
  createSaveHook,
} = localRequire('helpers/hooks');

module.exports = {
  schema: {
    account: {
      type: String,
      required: true,
    },
    token: String,
    name: {
      type: String,
      required: true,
    },
    desc: String,
    createdAt: String,
    updatedAt: String,
    server: {
      type: String,
      required: true,
    },
    database: {
      type: String,
      required: true,
    },
    measurement: {
      type: String,
      required: true,
    },
    rp: String,
    fill: String,
    conditions: [Schema.Types.Mixed],
    customConditions: String,
    aggregations: [Schema.Types.Mixed],
    groups: Schema.Types.Mixed,
    time: Schema.Types.Mixed,
    view: Schema.Types.Mixed,
  },
  indexes: [
    {
      account: 1,
    },
  ],
  pre: {
    findOneAndUpdate: [
      createUpdateHook({
        updatedAt: 'date',
        token: 'ulid',
      }),
    ],
    save: [
      createSaveHook({
        createdAt: 'date',
        updatedAt: 'date',
        token: 'ulid',
      }),
    ],
  },
};
