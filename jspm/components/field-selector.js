'use strict';
/* eslint import/no-unresolved:0 */
import React, { PropTypes, Component } from 'react';
import Select from 'react-select';
import * as _ from 'lodash';

class FieldSelector extends Component {
  renderSelector(opts) {
    const { options } = opts;
    const arr = _.map(options, option => {
      return {
        label: option,
        value: option,
      };
    });
    return <Select
      className="influxdbSelector"
      options={arr}
    />
  }
  render() {
    const { index, fields } = this.props;
    return <div className="pure-g">
      <div className="pure-u-1-2 fieldSelector">
        <span className="pullRight equal">BY</span>
        {
          this.renderSelector({
            options: fields,
          })
        }
      </div>
      <div className="pure-u-1-2 fieldSelector">
        <a className="pullRight toggle" href="#" onClick={e => this.onClickToggle(e)}>
          {index === 0 && <i className="fa fa-plus-square-o" aria-hidden="true"></i>}
          {index !== 0 && <i className="fa fa-minus-square-o" aria-hidden="true"></i>}
        </a>
        {
          this.renderSelector({
            options: ['count', 'sum']
          })
        }
      </div>
    </div>
  }
}

export default FieldSelector;
