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
    host: {
      type: String,
      required: true,
    },
    port: {
      type: Number,
      required: true,
    },
    ssl: {
      type: Boolean,
      required: true,
      default: false,
    },
    enabled: {
      type: Boolean,
      required: true,
      default: true,
    },
    username: String,
    password: String,
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
