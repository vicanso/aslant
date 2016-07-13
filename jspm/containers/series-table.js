'use strict';
/* eslint  import/no-unresolved:0 */
import React, { PropTypes } from 'react';
import Table from '../components/table';

class SeriesTable extends Table {
  render() {
    const tags = this.props.tags;
    const tagsDesc = _.map(tags, (v, k) => {
      return `${k}(${v})`;
    }).join(' ');
    const desc = tagsDesc ? <div className="groupsContainer">Group:{tagsDesc}</div> : null;
    return <div className="seriesTable">
      {desc}
      {this.renderTable()}
    </div>
  }
}

SeriesTable.propTypes = {
  data: PropTypes.object.isRequired,
};

export default SeriesTable;
