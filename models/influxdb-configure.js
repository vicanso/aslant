'use strict';
const uuid = require('uuid');
const mongoose = require('mongoose');

function addModifyTime() {
}

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
    configure: {
      type: mongoose.Schema.Types.Mixed,
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
  post: {
    validate: [
      addModifyTime,
    ],
  },
};
