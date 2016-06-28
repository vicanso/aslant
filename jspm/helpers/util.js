'use strict';
/* eslint  import/no-unresolved:0 */
import * as _ from 'lodash';

export function getError(err) {
  return _.get(err, 'response.body.message', err.message);
}
