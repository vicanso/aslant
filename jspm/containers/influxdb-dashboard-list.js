'use strict';
/* eslint import/no-unresolved:0 */
import React, { PropTypes } from 'react';
import PuzzleList from '../components/puzzle-list';
import * as navigationAction from '../actions/navigation';
import * as dashboardAction from '../actions/dashboard';

const InfluxdbDashboardList = (props) => {
  const { dispatch, dashboards } = props;
  return (
    <PuzzleList
      className="influxdbDashboardList"
      add={() => dispatch(navigationAction.addDashboard())}
      remove={id => dispatch(dashboardAction.remove(id))}
      edit={id => dispatch(navigationAction.editDashboard(id))}
      items={dashboards}
    />
  );
};

InfluxdbDashboardList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  dashboards: PropTypes.array.isRequired,
};

export default InfluxdbDashboardList;
