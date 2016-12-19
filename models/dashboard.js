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
    group: {
      type: String,
      required: true,
    },
    desc: String,
    createdAt: String,
    updatedAt: String,
    configs: [],
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
