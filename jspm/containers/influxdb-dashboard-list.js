'use strict';
/* eslint import/no-unresolved:0 */
import React, { PropTypes, Component } from 'react';
import PuzzleList from '../components/puzzle-list';
import * as navigationAction from '../actions/navigation';
import * as influxdbAction from '../actions/influxdb';
import * as dashboardAction from '../actions/dashboard';

class InfluxdbDashboardList extends Component {
  render() {
    const { dispatch, dashboards } = this.props;
    return (
      <PuzzleList
        className="influxdbDashboardList"
        add={() => dispatch(navigationAction.addDashboard())}
        remove={id => dispatch(dashboardAction.remove(id))}
        items={dashboards}
      />
    );
  }
}

export default InfluxdbDashboardList;
