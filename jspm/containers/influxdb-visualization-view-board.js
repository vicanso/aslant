'use strict';
/* eslint import/no-unresolved:0 */
import React, { PropTypes, Component } from 'react';
import Select from 'react-select';
import InfluxdbVisualizationView from '../components/influxdb-visualization-view';
import RadioSelector from '../components/radio-selector';
import { STATS_VIEW_TYPES } from '../constants/common';

class InfluxdbVisualizationViewBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autoRefresh: '60s',
      offsetTime: 'Custom',
    };
  }
  renderOffsetTimeSelector() {
    const options = [
      {
        label: 'Past 5 minutes',
        value: '-5m',
      },
      {
        label: 'Past 15 minutes',
        value: '-15m',
      },
      {
        label: 'Past 30 minutes',
        value: '-30m',
      },
      {
        label: 'Past 1 hour',
        value: '-1h',
      },
      {
        label: 'Past 2 hours',
        value: '-2h',
      },
      {
        label: 'Past 6 hour',
        value: '-6h',
      },
      {
        label: 'Past 12 hour',
        value: '-12h',
      },
      {
        label: 'Past 1 day',
        value: '-1d',
      },
      {
        label: 'Past 2 days',
        value: '-2d',
      },
      {
        label: 'Past 7 days',
        value: '-7d',
      },
      {
        label: 'Past 30 days',
        value: '-30d',
      },
      {
        label: 'Custom',
        value: 'Custom',
      },
    ];
    return (
      <Select
        value={this.state.offsetTime}
        options={options}
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

export default InfluxdbVisualizationViewBoard;
