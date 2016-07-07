'use strict';
/* eslint  import/no-unresolved:0 */
import React, { PropTypes } from 'react';
import Table from '../components/table';

class SeriesTable extends Table {
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
