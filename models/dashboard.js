'use strict';
const uuid = require('uuid');
const mongoose = require('mongoose');

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
