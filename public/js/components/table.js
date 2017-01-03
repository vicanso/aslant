import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import * as _ from 'lodash';

import Pages from './pages';


class Table extends Component {
  constructor(props) {
    super(props);
    const defaultPageSize = props.pageSize || 10;
    this.state = {
      sort: '',
      sortBy: '',
      page: 0,
      defaultPageSize,
      // each page item size
      size: defaultPageSize,
    };
  }
  getData() {
    const {
      sort,
      sortBy,
      keyword,
    } = this.state;
    const {
      items,
      keys,
    } = this.props;
    let filterResult = items;
    if (keyword) {
      const keywords = keyword.split(':');
      let filterIndex = -1;
      let filterKeyword = keyword;
      if (keywords.length === 2) {
        filterIndex = _.indexOf(keys, keywords[0]);
        filterKeyword = keywords[1];
      }
      const reg = new RegExp(filterKeyword, 'gi');
      filterResult = _.filter(items, (arr) => {
        if (filterIndex !== -1) {
          return reg.test(`${arr[filterIndex]}`);
        }
        return reg.test(arr.join(''));
      });
    }
    const index = _.indexOf(keys, sort);
    if (index === -1) {
      return filterResult.slice(0);
    }
    const result = _.sortBy(filterResult, arr => arr[index]);
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
    const {
      defaultPageSize,
    } = this.state;
    const items = this.getData();
    const debouncePageSizgeChange = _.debounce(() => {
      const size = parseInt(this.pageSizeInput && this.pageSizeInput.value, 10);
      if (!_.isInteger(size)) {
        this.setState({
          size: defaultPageSize,
        });
        return;
      }
      this.setState({
        size,
      });
    }, 500);

    const debounceKeywordChange = _.debounce(() => {
      const keyword = this.keywordInput && this.keywordInput.value;
      this.setState({
        keyword,
        page: 0,
      });
    }, 1000);
    return (
      <div className="table-view">
        <table className="table">
          { this.renderThead() }
          { this.renderTbody(items) }
        </table>
        <div className="clearfix functions">
          <div
            className="pull-right"
            style={{
              marginTop: '3px',
            }}
          >
            { this.renderPages(items) }
          </div>
          <div
            className="pt-input-group pull-right mright5"
          >
            <span className="pt-icon pt-icon-helper-management" />
            <input
              className="pt-input"
              type="number"
              placeholder="Input page size"
              dir="auto"
              ref={(c) => {
                this.pageSizeInput = c;
              }}
              onChange={debouncePageSizgeChange}
            />
          </div>
          <div
            className="pt-input-group pull-right mright5"
          >
            <span className="pt-icon pt-icon-search" />
            <input
              className="pt-input"
              type="text"
              placeholder="Input keyword"
              dir="auto"
              ref={(c) => {
                this.keywordInput = c;
              }}
              onChange={debounceKeywordChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

Table.propTypes = {
  keys: PropTypes.array.isRequired,
  items: PropTypes.array.isRequired,
  pageSize: PropTypes.number,
};

export default Table;
