'use strict';
const utils = localRequire('helpers/utils');
module.exports = (ctx) => {
  utils.setCache(ctx, 600);
};
