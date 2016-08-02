'use strict';
/* eslint import/no-unresolved:0 */
import React, { PropTypes, Component } from 'react';
import * as _ from 'lodash';
import Select from 'react-select';
import InfluxdbVisualizationView from 'aslant/components/influxdb-visualization-view';
import AutoRefreshSelector from 'aslant/components/auto-refresh-selector';
import { OFFSET_TIME_LIST } from 'aslant/constants/common';

class InfluxdbVisualizationViewBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autoRefresh: '60s',
      offsetTime: _.get(props, 'configure.offsetTime', 'Custom'),
    };
  }
  renderOffsetTimeSelector() {
    return (
      <Select
        value={this.state.offsetTime}
        options={OFFSET_TIME_LIST}
        className="offsetTimeSelector"
        onChange={item => {
          const value = (item && item.value) || '';
          if (value !== this.state.offsetTime) {
            this.setState({
              offsetTime: value,
            });
          }
        }}
      />
    );
  }
  render() {
    const { dispatch, configure } = this.props;
    return (
      <div className="visualizationViewContainer">
        <div className="clearfix">
          <div className="pullRight mtop10 mright5">
            <AutoRefreshSelector
              value={this.state.autoRefresh}
              onChange={value => {
                this.setState({
                  autoRefresh: value,
                });
              }}
            />
            {this.renderOffsetTimeSelector()}
          </div>
        </div>
        <InfluxdbVisualizationView
          dispatch={dispatch}
          configure={configure}
          autoRefresh={this.state.autoRefresh}
          offsetTime={this.state.offsetTime}
          type={configure.statsView}
        />
      </div>
    );
  }
}

InfluxdbVisualizationViewBoard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  configure: PropTypes.object.isRequired,
};

export default InfluxdbVisualizationViewBoard;
