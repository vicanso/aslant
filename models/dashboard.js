'use strict';
const uuid = require('uuid');

module.exports = {
  schema: {
    owner: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    configures: {
      type: Array,
      required: true,
    },
    offsetTime: String,
    autoRefresh: String,
    token: {
      type: String,
      default: () => uuid.v4(),
    },
    createdAt: {
      type: String,
      default: () => (new Date()).toISOString(),
    },
  },
  indexes: [
    {
      owner: 1,
    },
  ],
};
