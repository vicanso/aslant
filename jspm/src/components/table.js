'use strict';
/* eslint import/no-unresolved:0 */
import React, { Component, PropTypes } from 'react';
import * as _ from 'lodash';
import classnames from 'classnames';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortIndex: -1,
      sortBy: 'desc',
    };
  }
  onClickHead(index) {
    const curSortIndex = this.state.sortIndex;
    const data = {};
    if (curSortIndex === index) {
      data.sortBy = this.state.sortBy === 'desc' ? 'asc' : 'desc';
    } else {
      data.sortIndex = index;
      data.sortBy = 'desc';
    }
    this.setState(data);
  }
  renderThead(data) {
    const head = data[0].slice(0);
    const { sortIndex, sortBy } = this.state;
    return (
      <thead><tr>
        <th>#</th>
        {
          head.map((v, i) => {
            const cls = {
              fa: true,
              invisible: true,
            };
            if (sortIndex === i) {
              cls.invisible = false;
              cls[`fa-sort-${sortBy}`] = true;
            }
            return (
              <th
                key={`table-th-${i}`}
                onClick={() => this.onClickHead(i)}
              >
                {v}
                <i className={classnames(cls)} aria-hidden="true"></i>
              </th>
            );
          })
        }
      </tr></thead>
    );
  }
  renderTr(arr, index) {
    const trClass = {};
    if (index % 2 === 0) {
      trClass['pure-table-odd'] = true;
    }
    return (
      <tr
        className={classnames(trClass)}
        key={`table-tr-${index}`}
      >
        <td>{index + 1}</td>
        {
          arr.map((v, i) => <td key={`table-td-${i}`}>{v}</td>)
        }
      </tr>
    );
  }
  renderTbody(data) {
    const { sortIndex, sortBy } = this.state;
    let list = [];
    _.forEach(data.slice(1), arr => list.push(arr.slice(0)));
    if (~sortIndex) {
      list = _.sortBy(list, item => item[sortIndex]);
      if (sortBy === 'desc') {
        list = list.reverse();
      }
    }
    const renderTr = this.renderTr.bind(this);
    return (
      <tbody>
        {list.map(renderTr)}
      </tbody>
    );
  }
  renderTable(data) {
    return (
      <table className="pure-table">
        {this.renderThead(data || this.props.list)}
        {this.renderTbody(data || this.props.list)}
      </table>
    );
  }
  render() {
    return this.renderTable();
  }
}

Table.propTypes = {
  data: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired,
};

export default Table;
