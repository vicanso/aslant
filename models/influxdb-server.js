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
    },
    group: String,
    token: {
      type: String,
      default: () => uuid.v4(),
    },
    user: String,
    password: String,
    createdAt: {
      type: String,
      default: () => (new Date()).toISOString(),
    },
  },
  indexes: [
    {
      owner: 1,
    },
    {
      group: 1,
    },
  ],
};