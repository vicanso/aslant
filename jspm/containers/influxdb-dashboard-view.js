'use strict';
/* eslint import/no-unresolved:0 */
import React, { PropTypes, Component } from 'react';
import * as _ from 'lodash';
import InfluxdbVisualizationView from '../components/influxdb-visualization-view';
import * as configureAction from '../actions/configure';

class InfluxdbDashboardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visualizations: null,
      status: '',
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
        visualizations: data.items,
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
      return (
        <div className={cls[width]}>
          <InfluxdbVisualizationView
            dispatch={dispatch}
            configure={item}
            type={item.statsView}
          />
        </div>
      );
    });
  }
  render() {
    if (!this.state.visualizations) {
      this.refreshData();
    }
    return (
      <div className="dashboardViewContainer pure-g">
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
