'use strict';
/* eslint import/no-unresolved:0 */
import React, { Component, PropTypes } from 'react';
import * as _ from 'lodash';
import classnames from 'classnames';

class Table extends Component {
  constructor(props) {
    super(props);
    const list = [];
    const head = props.data.shift();
    _.forEach(props.data, arr => list.push(arr.slice(0)));
    this.state = {
      data: list,
      head,
    };
  }
  renderThead() {
    const { head } = this.state;
    return <thead><tr>
      <th>#</th>
      {
        head.map(v => {
          return <th>{v}</th>
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
    const { data } = this.state;
    const renderTr = this.renderTr.bind(this);
    return <tbody>
      {data.map(renderTr)}
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
