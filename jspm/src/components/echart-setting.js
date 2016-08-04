'use strict';
/* eslint import/no-unresolved:0 */
import React, { PropTypes, Component } from 'react';
import * as _ from 'lodash';

class EchartSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setting: {},
    };
  }
  handleChange() {
    const { onChange } = this.props;
    const refs = this.refs;
    const data = {
      yAxis: {},
    };
    _.forEach(['min', 'max'], key => {
      const v = parseInt(refs[key].value);
      if (_.isInteger(v)) {
        data.yAxis[key] = v;
      }
    });
    onChange(data);
  }
  render() {
    const { setting } = this.props;
    return (
      <div className="echartSetting">
        <label>Echart Settng</label>
        <div className="yAxisSetting">
          <span className="pullLeft">yAxis:</span>
          <div className="pure-g">
            <div className="pure-u-1-2">
              <input
                type="number"
                placeholder="min"
                ref="min"
                defaultValue={_.get(setting, 'yAxis.min')}
                onChange={() => this.handleChange()}
              />
            </div>
            <div className="pure-u-1-2">
              <input
                type="number"
                placeholder="max"
                ref="max"
                defaultValue={_.get(setting, 'yAxis.max')}
                onChange={() => this.handleChange()}
              />
            </div>
          </div>
        </div>
      </div>
    ); 
  }
}

EchartSetting.propTypes = {
  onChange: PropTypes.func.isRequired,
  setting: PropTypes.object,
};

export default EchartSetting;
