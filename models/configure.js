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
    server: String,
    database: String,
    rp: String,
    measurement: String,
    groupByTime: String,
    offsetTime: String,
    conditions: Array,
    extracts: Array,
    groups: Array,
    fields: Array,
    date: {
      start: String,
      end: String,
    },
    hideEmptyPoint: Boolean,
    orderByTime: String,
    statsView: String,
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
