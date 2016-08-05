'use strict';
/* eslint import/no-unresolved:0 */
import React, { PropTypes, Component } from 'react';
import * as _ from 'lodash';
import Select from 'react-select';
import InfluxdbVisualizationView from 'aslant/components/influxdb-visualization-view';
import AutoRefreshSelector from 'aslant/components/auto-refresh-selector';
import { OFFSET_TIME_LIST } from 'aslant/constants/common';
import * as configureAction from 'aslant/actions/configure';

class InfluxdbDashboardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visualizations: null,
      status: '',
      offsetTime: _.get(props, 'dashboard.offsetTime'),
      autoRefresh: _.get(props, 'dashboard.autoRefresh'),
    };
  }
  refreshData() {
    const { dashboard } = this.props;
    if (!dashboard.configures) {
      return;
    }
    const ids = _.map(dashboard.configures, item => item.id);
    configureAction.getByIds(ids).then(data => {
      this.setState({
        /* eslint no-underscore-dangle:0 */
        visualizations: _.sortBy(data.items, item => _.indexOf(ids, item._id)),
      });
    });
  }
  renderVisualizations() {
    const { dispatch, dashboard } = this.props;
    if (!this.state.visualizations) {
      return null;
    }
    return _.map(this.state.visualizations, (item, i) => {
      const width = dashboard.configures[i].width;
      const cls = {
        '100%': 'pure-u-1-1',
        '50%': 'pure-u-1-2',
        '33%': 'pure-u-1-3',
        '25%': 'pure-u-1-4',
      };
      /* eslint no-underscore-dangle:0 */
      const key = item._id;
      return (
        <div
          className={cls[width]}
          key={key}
        >
          <InfluxdbVisualizationView
            dispatch={dispatch}
            configure={item}
            autoRefresh={this.state.autoRefresh}
            offsetTime={this.state.offsetTime}
            type={item.statsView}
          />
        </div>
      );
    });
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
    if (!this.state.visualizations) {
      this.refreshData();
    }
    return (
      <div className="dashboardViewContainer pure-g">
        <div className="clearfix pure-u-1-1">
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
        {this.renderVisualizations()}
      </div>
    );
  }
}

InfluxdbDashboardView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  dashboard: PropTypes.object.isRequired,
};

export default InfluxdbDashboardView;
