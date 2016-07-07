'use strict';
/* eslint import/no-unresolved:0 */
import React, { Component, PropTypes } from 'react';
import * as _ from 'lodash';
import classnames from 'classnames';

class Table extends Component {
  constructor(props) {
    super(props);
    // const list = [];
    // const head = props.list[0].slice(0);
    // _.forEach(props.data, arr => list.push(arr.slice(0)));
    this.state = {
      sortIndex: -1,
      sortBy: 'desc'
    };
  }
  onClickHead(index) {
    const curSortIndex = this.state.sortIndex;
    const data = {};
    if (curSortIndex === index) {
      data.sortBy = this.state.sortBy === 'desc'? 'asc' : 'desc';
    } else {
      data.sortIndex = index;
      data.sortBy = 'desc';
    }
    // const arr = _.map(this.state.data, item => item.slice(0));
    // const result = _.sortBy(arr, item => item[index]);
    // if (data.sortBy === 'desc') {
    //   data.data = result.reverse();
    // } else {
    //   data.data = result;
    // }
    this.setState(data);
  }
  renderThead() {
    const head = this.props.list[0].slice(0);
    const { sortIndex, sortBy } = this.state;
    return <thead><tr>
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
          return <th onClick={e => this.onClickHead(i)}>
            {v}
            <i className={classnames(cls)} aria-hidden="true"></i>
          </th>
        })
      }
    </tr></thead>
  }
  renderTr(arr, index) {
    const trClass = {};
    if (index % 2 === 0) {
      trClass['pure-table-odd'] = true;
    }
    return <tr className={classnames(trClass)}>
      <td>{index + 1}</td>
      {
        arr.map(v => {
          return <td>{v}</td>
        })
      }
    </tr>
  }
  renderTbody() {
    const { sortIndex, sortBy } = this.state;
    let list = [];
    _.forEach(this.props.list.slice(1), arr => list.push(arr.slice(0)));
    list = _.sortBy(list, item => item[sortIndex]);
    if (sortBy === 'desc') {
      list = list.reverse();
    }
    const renderTr = this.renderTr.bind(this);
    return <tbody>
      {list.map(renderTr)}
    </tbody>
  }
  renderTable() {
    return <table className="pure-table">
      {this.renderThead()}
      {this.renderTbody()}
    </table>
  }
  render() {
    return this.renderTable();
  }
}

Table.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Table;
