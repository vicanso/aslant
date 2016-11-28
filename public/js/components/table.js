import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import * as _ from 'lodash';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: '',
      sortBy: '',
    };
  }
  getData() {
    const {
      sort,
      sortBy,
    } = this.state;
    const {
      items,
      keys,
    } = this.props;
    const index = _.indexOf(keys, sort);
    if (index === -1) {
      return items.slice(0);
    }
    const result = _.sortBy(items, arr => arr[index]);
    if (sortBy === 'desc') {
      return result.reverse();
    }
    return result;
  }
  changeSort(key) {
    const {
      sort,
      sortBy,
    } = this.state;
    if (key === sort) {
      if (sortBy !== 'desc') {
        this.setState({
          sortBy: 'desc',
        });
        return;
      }
      this.setState({
        sortBy: 'asc',
      });
    } else {
      this.setState({
        sort: key,
        sortBy: 'desc',
      });
    }
  }
  renderThead() {
    const {
      keys,
    } = this.props;
    const {
      sort,
      sortBy,
    } = this.state;
    const arr = _.map(keys, (key) => {
      const cls = {
        'pt-icon-standard': true,
      };
      if (sort === key) {
        if (sortBy === 'asc') {
          cls['pt-icon-sort-asc'] = true;
        } else {
          cls['pt-icon-sort-desc'] = true;
        }
      }
      return (
        <th
          key={key}
        >
          <a
            href="javascript:;"
            onClick={() => this.changeSort(key)}
          >
            {key}
            <span className={classnames(cls)} />
          </a>
        </th>
      );
    });
    return (
      <thead>
        <tr>
          { arr }
        </tr>
      </thead>
    );
  }
  renderTbody() {
    const items = this.getData();
    const arr = _.map(items, (tmpArr, index) => {
      const key = `${index}-${tmpArr.join('')}`;
      const tdList = _.map(tmpArr, (item, i) => {
        const tdKey = `${i}-${item}`;
        return (
          <td key={tdKey}> {item} </td>
        );
      });
      return (
        <tr key={key}>
          { tdList }
        </tr>
      );
    });
    return (
      <tbody>
        { arr }
      </tbody>
    );
  }
  render() {
    return (
      <table className="table">
        { this.renderThead() }
        { this.renderTbody() }
      </table>
    );
  }
}

Table.propTypes = {
  keys: PropTypes.array.isRequired,
  items: PropTypes.array.isRequired,
};

export default Table;
