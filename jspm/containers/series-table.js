'use strict';
/* eslint  import/no-unresolved:0 */
import React, { PropTypes } from 'react';
import * as _ from 'lodash';
import Table from '../components/table';

class SeriesTable extends Table {
  constructor(props) {
    const { data } = props;
    const arr = [];
    arr.push(data.columns.slice(0));
    _.forEach(data.values, value => arr.push(value.slice(0)));
    super({
      data: arr,
    });
  }
  render() {
    return <div className="seriesTable">
      {this.renderTable()}
    </div>
  }
}

SeriesTable.propTypes = {
  data: PropTypes.object.isRequired,
};

export default SeriesTable;
