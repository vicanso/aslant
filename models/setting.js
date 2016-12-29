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
    table: Schema.Types.Mixed,
    chart: Schema.Types.Mixed,
    gesture: String,
    createdAt: String,
    updatedAt: String,
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
