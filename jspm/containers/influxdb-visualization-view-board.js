'use strict';
/* eslint import/no-unresolved:0 */
import React, { PropTypes, Component } from 'react';
import * as _ from 'lodash';
import Select from 'react-select';
import InfluxdbVisualizationView from '../components/influxdb-visualization-view';
import { OFFSET_TIME_LIST } from '../constants/common';

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
  renderAutoRefreshSelector() {
    const seconds = [10, 15, 30, 45, 60];
    const minutes = [2, 5, 10];
    const options = [];
    _.forEach(seconds, v => options.push({
      label: `Auto Refresh:${v} seconds`,
      value: `${v}s`,
    }));
    _.forEach(minutes, v => options.push({
      label: `Auto Refresh:${v} minutes`,
      value: `${v}m`,
    }));
    return (
      <Select
        value={this.state.autoRefresh}
        options={options}
        className="autoRefreshSelector"
        onChange={item => {
          const value = (item && item.value) || '';
          if (value !== this.state.autoRefresh) {
            this.setState({
              autoRefresh: value,
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
            {this.renderAutoRefreshSelector()}
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
