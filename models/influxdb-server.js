module.exports = {
  schema: {
    account: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
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
    password: String,
    createdAt: {
      type: String,
      required: true,
    },
  },
  indexes: [
    {
      account: 1,
    },
  ],
};
