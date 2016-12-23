import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import * as _ from 'lodash';

import Pages from './pages';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: '',
      sortBy: '',
      page: 0,
      // each page item size
      size: 10,
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
          page: 0,
        });
        return;
      }
      this.setState({
        sortBy: 'asc',
        page: 0,
      });
    } else {
      this.setState({
        sort: key,
        sortBy: 'desc',
        page: 0,
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
  renderTbody(items) {
    const {
      page,
      size,
    } = this.state;
    const start = page * size;
    const end = start + size;
    const sliceItems = items.slice(start, end);
    const arr = _.map(sliceItems, (tmpArr, index) => {
      const key = `${index}-${tmpArr.join('')}`;
      const tdList = _.map(tmpArr, (item, i) => {
        const tdKey = `${i}-${item}`;
        const v = _.isNumber(item) ? item.toLocaleString() : item;
        return (
          <td key={tdKey}> {v} </td>
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
  renderPages(items) {
    if (!items || !items.length) {
      return null;
    }
    const {
      size,
      page,
    } = this.state;
    const max = Math.ceil(items.length / size);
    if (max === 1) {
      return null;
    }
    return (
      <Pages
        max={max}
        current={page}
        onSelect={(e, selectedPage) => {
          if (selectedPage === page) {
            return;
          }
          this.setState({
            page: selectedPage,
          });
        }}
      />
    );
  }
  render() {
    const items = this.getData();
    return (
      <div>
        <table className="table">
          { this.renderThead() }
          { this.renderTbody(items) }
        </table>
        { this.renderPages(items) }
      </div>
    );
  }
}

Table.propTypes = {
  keys: PropTypes.array.isRequired,
  items: PropTypes.array.isRequired,
};

export default Table;
