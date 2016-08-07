'use strict';
/* eslint import/no-unresolved:0 */
import React, { PropTypes } from 'react';
import PuzzleList from 'aslant/components/puzzle-list';
import * as navigationAction from 'aslant/actions/navigation';
import * as dashboardAction from 'aslant/actions/dashboard';

const InfluxdbDashboardList = (props) => {
  const { dispatch, dashboards, account } = props;
  return (
    <PuzzleList
      className="influxdbDashboardList"
      account={account}
      add={() => dispatch(navigationAction.addDashboard())}
      remove={id => dispatch(dashboardAction.remove(id))}
      edit={id => dispatch(navigationAction.editDashboard(id))}
      show={id => dispatch(navigationAction.showDashboard(id))}
      items={dashboards}
    />
  );
};

InfluxdbDashboardList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  dashboards: PropTypes.array.isRequired,
  account: PropTypes.string,
};

export default InfluxdbDashboardList;
