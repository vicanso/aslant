import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import * as _ from 'lodash';

class Pages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageCount: 5,
    };
  }
  onSelect(e, page) {
    this.props.onSelect(e, page);
  }
  getBtn(type, page) {
    const clsDict = {
      first: 'pt-icon-chevron-backward',
      last: 'pt-icon-chevron-forward',
      prev: 'pt-icon-chevron-left',
      next: 'pt-icon-chevron-right',
    };
    const cls = {
      'pt-icon-standard': true,
    };
    cls[clsDict[type]] = true;
    return (
      <a
        href="javascript:;"
        className="page"
        onClick={(e) => {
          this.onSelect(e, page);
        }}
      >
        <span className={classnames(cls)} />
      </a>
    );
  }
  render() {
    const {
      pageCount,
    } = this.state;
    const {
      max,
      current,
    } = this.props;
    const start = Math.max(0, current - Math.floor(pageCount / 2));
    const end = Math.min(max, start + pageCount);
    const arr = _.map(_.range(start, end), (page, index) => {
      const cls = {
        page: true,
      };
      if (page === current) {
        cls.active = true;
      }
      return (
        <a
          href="javascript:;"
          className={classnames(cls)}
          key={index}
          onClick={(e) => {
            this.onSelect(e, page);
          }}
        >
          { page + 1}
        </a>
      );
    });
    const more = (
      <span
        className="pt-icon-standard pt-icon-more font12"
        style={{
          margin: '0 5px',
        }}
      />
    );
    const lastPage = (
      <a
        href="javascript:;"
        className="page"
        onClick={(e) => {
          this.onSelect(e, max - 1);
        }}
      >
        { max }
      </a>
    );
    return (
      <div className="pages">
        {
          current !== 0 && this.getBtn('first', 0)
        }
        {
          current !== 0 && this.getBtn('prev', current - 1)
        }
        { arr }
        {
          end < (max - 2) && more
        }
        {
          end < (max - 1) && lastPage
        }
        {
          current !== (max - 1) && this.getBtn('next', current + 1)
        }
        {
          current !== (max - 1) && this.getBtn('last', max - 1)
        }
      </div>
    );
  }
}

Pages.propTypes = {
  max: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Pages;
