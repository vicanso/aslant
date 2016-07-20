'use strict';
/* eslint  import/no-unresolved:0 */
import React, { PropTypes } from 'react';
import Table from './table';
import * as util from '../helpers/util';

class SeriesTable extends Table {
  render() {
    const { hideEmptyPoint, seriesItem} = this.props;
    const result = hideEmptyPoint ? util.rejectEmptyPoint(seriesItem) : seriesItem;

    const tags = result.tags;
    const tagsDesc = _.map(tags, (v, k) => {
      return `${k}(${v})`;
    }).join(' ');
    const desc = tagsDesc ? <div className="groupsContainer">Group:{tagsDesc}</div> : null;
    return <div className="seriesTable">
      {desc}
      {this.renderTable(util.convertSeriesData(result))}
    </div>
  }
}

SeriesTable.propTypes = {
  data: PropTypes.object.isRequired,
};

export default SeriesTable;
