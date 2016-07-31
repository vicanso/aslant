'use strict';
/* eslint import/no-unresolved:0 */
import React, { Component, PropTypes } from 'react';
import { Router, Route } from 'react-enroute';
import * as ReactRedux from 'react-redux';
import * as _ from 'lodash';
import RegisterLogin from './register-login';
import MainHeader from './main-header';
import InfluxdbServerEditor from './influxdb-server-editor';
import InfluxdbServerList from './influxdb-server-list';
import InfluxdbVisualizationList from './influxdb-visualization-list';
import InfluxdbVisualizationEditor from './influxdb-visualization-editor';
import InfluxdbVisualizationViewBoard from './influxdb-visualization-view-board';
import InfluxdbDashboardEditor from './influxdb-dashboard-editor';
import InfluxdbDashboardList from './influxdb-dashboard-list';
import InfluxdbDashboardView from './influxdb-dashboard-view';
import NotifyCenter from './notify-center';
import * as urls from '../constants/urls';
import * as dashboardAction from '../actions/dashboard';
import * as configureAction from '../actions/configure';
import * as serverAction from '../actions/server';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;
    const currentAccount = _.get(nextProps, 'user.basic.account');
    const account = _.get(this.props, 'user.basic.account');
    if (currentAccount && currentAccount !== account) {
      dispatch(serverAction.list());
      dispatch(configureAction.list());
      dispatch(dashboardAction.list());
    }
  }
  renderRegister() {
    const { dispatch } = this.props;
    return (
      <RegisterLogin
        type={"register"}
        dispatch={dispatch}
      />
    );
  }
  renderLogin() {
    const { dispatch } = this.props;
    return (
      <RegisterLogin
        type={"login"}
        dispatch={dispatch}
      />
    );
  }
  renderAddServer() {
    const { dispatch } = this.props;
    return (
      <InfluxdbServerEditor
        dispatch={dispatch}
      />
    );
  }
  renderServerList() {
    const { dispatch, influxdbServer, user } = this.props;
    return (
      <InfluxdbServerList
        dispatch={dispatch}
        influxdbServer={influxdbServer}
        user={user}
      />
    );
  }
  renderEditServer({ params: { id } }) {
    const { dispatch, influxdbServer } = this.props;
    /* eslint no-underscore-dangle:0 */
    const server = _.find(influxdbServer.list, item => item._id === id);
    return (
      <InfluxdbServerEditor
        dispatch={dispatch}
        server={server}
        type={'update'}
      />
    );
  }
  renderVisualizations() {
    const { dispatch, user } = this.props;
    return (
      <InfluxdbVisualizationList
        configures={user.configures}
        dispatch={dispatch}
      />
    );
  }
  renderVisualization({ params: { id } }) {
    const { dispatch, user } = this.props;
    const result = _.find(user.configures, item => item._id === id);
    if (!result) {
      return null;
    }
    return (
      <InfluxdbVisualizationViewBoard
        dispatch={dispatch}
        configure={result}
      />
    );
  }
  renderAddVisualization() {
    const { dispatch, influxdbServer } = this.props;
    return (
      <InfluxdbVisualizationEditor
        dispatch={dispatch}
        influxdbServer={influxdbServer}
      />
    );
  }
  renderEditVisualization({ params: { id } }) {
    const { dispatch, user, influxdbServer } = this.props;
    const result = _.find(user.configures, item => item._id === id);
    if (!result) {
      return null;
    }
    return (
      <InfluxdbVisualizationEditor
        dispatch={dispatch}
        data={result}
        influxdbServer={influxdbServer}
      />
    );
  }
  renderDashboards() {
    const { dispatch, user } = this.props;
    return (
      <InfluxdbDashboardList
        dispatch={dispatch}
        dashboards={user.dashboards}
      />
    );
  }
  renderAddDashboard() {
    const { dispatch, user } = this.props;
    return (
      <InfluxdbDashboardEditor
        dispatch={dispatch}
        configures={user.configures}
      />
    );
  }
  renderEditDashboard({ params: { id } }) {
    const { dispatch, user } = this.props;
    const result = _.find(user.dashboards, item => item._id === id);
    if (!result) {
      return null;
    }
    return (
      <InfluxdbDashboardEditor
        type={'update'}
        dispatch={dispatch}
        dashboard={result}
        configures={user.configures}
      />
    );
  }
  renderDashboard({ params: { id } }) {
    const { dispatch, user } = this.props;
    const result = _.find(user.dashboards, item => item._id === id);
    if (!result) {
      return null;
    }
    return (
      <InfluxdbDashboardView
        dashboard={result}
        dispatch={dispatch}
      />
    );
  }
  render() {
    const { user, navigation, influxdbServer, dispatch } = this.props;
    return (
      <div>
        <MainHeader
          dispatch={dispatch}
          user={user}
          influxdbServer={influxdbServer}
        />
        <NotifyCenter
          messages={[]}
        />
        <Router {...navigation}>
          <Route
            path={urls.REGISTER}
            component={() => this.renderRegister()}
          />
          <Route
            path={urls.LOGIN}
            component={() => this.renderLogin()}
          />
          <Route
            path={urls.ADD_SERVER}
            component={() => this.renderAddServer()}
          />
          <Route
            path={urls.SHOW_SERVERS}
            component={() => this.renderServerList()}
          />
          <Route
            path={`${urls.EDIT_SERVER}/:id`}
            component={() => this.renderEditServer()}
          />
          <Route
            path={urls.ADD_VISUALIZATIONS}
            component={() => this.renderAddVisualization()}
          />
          <Route
            path={`${urls.EDIT_VISUALIZATION}/:id`}
            component={params => this.renderEditVisualization(params)}
          />
          <Route
            path={urls.SHOW_VISUALIZATIONS}
            component={() => this.renderVisualizations()}
          />
          <Route
            path={`${urls.SHOW_VISUALIZATIONS}/:id`}
            component={arg => this.renderVisualization(arg)}
          />
          <Route
            path={urls.ADD_DASHBOARD}
            component={() => this.renderAddDashboard()}
          />
          <Route
            path={urls.SHOW_DASHBOARDS}
            component={() => this.renderDashboards()}
          />
          <Route
            path={`${urls.EDIT_DASHBOARD}/:id`}
            component={params => this.renderEditDashboard(params)}
          />
          <Route
            path={`${urls.SHOW_DASHBOARDS}/:id`}
            component={arg => this.renderDashboard(arg)}
          />
        </Router>
      </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  influxdbServer: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
    navigation: state.navigation,
    influxdbServer: state.influxdbServer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
