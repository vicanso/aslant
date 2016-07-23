'use strict';
/* eslint import/no-unresolved:0 */
import React, { PropTypes, Component } from 'react';
import * as _ from 'lodash';
import classnames from 'classnames';

class RadioSelector extends Component {
  select(e, option) {
    const { onSelect } = this.props;
    e.preventDefault();
    onSelect(option);
  }
  renderOptions() {
    const { selected, options } = this.props;
    const cur = selected || options[0];
    return _.map(options, option => {
      const cls = {
        fa: true,
      };
      if (cur === option) {
        cls['fa-check-square-o'] = true;
      } else {
        cls['fa-square-o'] = true;
      }
      return (
        <a
          key={option}
          href="#"
          onClick={e => this.select(e, option)}
        >
          <i className={classnames(cls)}></i>
          {option}
        </a>
      );
    });
  }
  render() {
    const { desc, options, className } = this.props;
    const cls = `radioSelector ${className || ""}`.trim();
    return (
      <div className={cls}>
        <span>{desc}</span>
        {this.renderOptions()}
      </div>
    );
  }
}

export default RadioSelector;
