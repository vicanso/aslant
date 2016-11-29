const {
  Schema,
} = require('mongoose');

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
    createdAt: {
      type: String,
      required: true,
    },
    updatedAt: {
      type: String,
      required: true,
    },
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
    ql: {
      type: String,
      required: true,
    },
    conditions: [Schema.Types.Mixed],
    cals: [Schema.Types.Mixed],
    groups: Schema.Types.Mixed,
    time: Schema.Types.Mixed,
    view: Schema.Types.Mixed,
  },
};
