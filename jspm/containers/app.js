'use strict';
/* eslint import/no-unresolved:0 */
import React, { Component, PropTypes } from 'react';
import { Router, Route } from 'react-enroute';
import * as ReactRedux from 'react-redux';
import RegisterLogin from './register-login';
import MainHeader from './main-header';
import MainNav from './main-nav';
import InfluxdbServerEditor from './influxdb-server-editor';
import InfluxdbServerList from './influxdb-server-list';
import InfluxdbVisualizationList from './influxdb-visualization-list';
import InfluxdbVisualizationEditor from './influxdb-visualization-editor';
import InfluxdbVisualizationViewBoard from './influxdb-visualization-view-board';
import InfluxdbDashboardEditor from './influxdb-dashboard-editor';
import InfluxdbDashboardList from './influxdb-dashboard-list';
import * as urls from '../constants/urls';
import * as navigationAction from '../actions/navigation';
import * as influxdbAction from '../actions/influxdb';
import * as dashboardAction from '../actions/dashboard';
import * as configureAction from '../actions/configure';
import * as serverAction from '../actions/server';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderRegister() {
    const { dispatch } = this.props;
    return <RegisterLogin
      type={"register"}
      dispatch={dispatch}
    />
  }
  renderLogin() {
    const { dispatch } = this.props;
    return <RegisterLogin
      type={"login"}
      dispatch={dispatch}
    />
  }
  renderAddServer() {
    const { dispatch } = this.props;
    return <InfluxdbServerEditor
      dispatch={dispatch}
    />
  }
  renderServerList() {
    const { dispatch, influxdbServer, user } = this.props;
    return <InfluxdbServerList
      dispatch={dispatch}
      influxdbServer={influxdbServer}
      user={user}
    />
  }
  renderEditServer({ params: { id } }) {
    const { dispatch, influxdbServer } = this.props;
    const server = _.find(influxdbServer.list, item => item._id === id);
    return <InfluxdbServerEditor
      dispatch={dispatch}
      server={server}
      type={'update'}
    />
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
    const { dispatch, user, influxdbServer } = this.props;
    const item = _.find(user.configures, item => item._id === id);
    if (!item) {
      return null;
    }
    return (
      <InfluxdbVisualizationViewBoard
        dispatch={dispatch}
        configure={item}
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
    const item = _.find(user.configures, item => item._id === id);
    if (!item) {
      return null;
    }
    return (
      <InfluxdbVisualizationEditor
        dispatch={dispatch}
        data={item}
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
  componentWillReceiveProps(nextProps, props) {
    const { dispatch } = this.props;
    const currentAccount = _.get(nextProps, 'user.basic.account');
    const account = _.get(this.props, 'user.basic.account');
    if (currentAccount && currentAccount !== account) {
      dispatch(serverAction.list());
      dispatch(configureAction.list());
      dispatch(dashboardAction.list());
    }
  }
  render() {
    const { user, navigation, influxdbServer, dispatch } = this.props;
    return <div>
      <MainHeader
        dispatch={dispatch}
        user={user}
        influxdbServer={influxdbServer}
      />
      <MainNav
        dispatch={dispatch}
      />
      <Router {...navigation}>
        <Route path={urls.REGISTER} component={this.renderRegister.bind(this)} />
        <Route path={urls.LOGIN} component={this.renderLogin.bind(this)} />
        <Route path={urls.ADD_SERVER} component={this.renderAddServer.bind(this)} />
        <Route path={urls.SHOW_SERVERS} component={this.renderServerList.bind(this)} />
        <Route path={urls.EDIT_SERVER + '/:id'} component={this.renderEditServer.bind(this)} />
        <Route path={urls.ADD_VISUALIZATIONS} component={this.renderAddVisualization.bind(this)} />
        <Route path={urls.EDIT_VISUALIZATIONS + '/:id'} component={this.renderEditVisualization.bind(this)} />
        <Route path={urls.SHOW_VISUALIZATIONS} component={this.renderVisualizations.bind(this)} />
        <Route path={urls.SHOW_VISUALIZATIONS + '/:id'} component={this.renderVisualization.bind(this)} />
        <Route path={urls.ADD_DASHBOARD} component={this.renderAddDashboard.bind(this)} />
        <Route path={urls.SHOW_DASHBOARDS} component={this.renderDashboards.bind(this)} />
      </Router>
    </div>
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
