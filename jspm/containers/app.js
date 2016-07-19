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
import InfluxdbVisualizationView from './influxdb-visualization-view';
import * as urls from '../constants/urls';
import * as navigationAction from '../actions/navigation';

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
    />
  }
  renderVisualizations() {
    const { dispatch, user } = this.props;
    return <InfluxdbVisualizationList
      configures={user.configures}
      dispatch={dispatch}
    />
  }
  renderVisualization({ params: { id } }) {
    const { dispatch, user, influxdbServer } = this.props;
    const item = _.find(user.configures, item => item._id === id);
    return (
      <InfluxdbVisualizationView
        dispatch={dispatch}
        configure={item.configure}
      />
    );
  }
  renderAddVisualization() {
    const { dispatch, influxdbServer } = this.props;
    return <InfluxdbVisualizationEditor
      dispatch={dispatch}
      influxdbServer={influxdbServer}
    />
  }
  renderEditVisualization({ params: { id } }) {
    const { dispatch, user, influxdbServer } = this.props;
    const configure = _.find(user.configures, item => item._id === id);
    return (
      <InfluxdbVisualizationEditor
        dispatch={dispatch}
        data={configure}
        influxdbServer={influxdbServer}
      />
    );
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
        <Route path={urls.SHOW_VISUALIZATIONS} component={this.renderVisualizations.bind(this)} />
        <Route path={urls.SHOW_VISUALIZATIONS + '/:id'} component={this.renderVisualization.bind(this)} />
        <Route path={urls.EDIT_VISUALIZATIONS} component={this.renderAddVisualization.bind(this)} />
        <Route path={urls.EDIT_VISUALIZATIONS + '/:id'} component={this.renderEditVisualization.bind(this)} />
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
