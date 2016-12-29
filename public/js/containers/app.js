import React, { Component, PropTypes } from 'react';
import { Router, Route } from 'react-enroute';
import * as ReactRedux from 'react-redux';
import * as _ from 'lodash';
import classnames from 'classnames';
import {
  Toaster,
  FocusStyleManager,
  Alert,
} from '@blueprintjs/core';

import * as globals from '../helpers/globals';

import {
  VIEW_LOGIN,
  VIEW_REGISTER,
  VIEW_ADD_SERVER,
  VIEW_EDIT_SERVER,
  VIEW_SERVERS,
  VIEW_SERVER_STATUS,
  VIEW_ADD_INFLUX,
  VIEW_EDIT_INFLUX,
  VIEW_INFLUX_CONFIGS,
  VIEW_INFLUX_VISUALIZATION,
  VIEW_ADD_DASHBOARD,
  VIEW_INFLUX_DASHBOARDS,
  VIEW_INFLUX_EDIT_DASHBOARD,
  VIEW_INFLUX_DASHBOARD,
  VIEW_ABOUT,
  VIEW_SETTING,
} from '../constants/urls';

import Login from './login';
import Register from './register';
import MainHeader from './main-header';
import MainNav from './main-nav';
import ServerView from './influxdb/server';
import ServersView from './influxdb/servers';
import ServerStatusView from './influxdb/status';
import InfluxView from './influxdb/influx';
import InfluxConfigsView from './influxdb/configs';
import InfluxVisualizationView from './influxdb/visualization';
import InfluxDashboardView from './influxdb/dashboard';
import InfluxDashboardsView from './influxdb/dashboards';
import InfluxDashboardVisualizationsView from './influxdb/dashboard-visualizations';
import HomeView from './home';
import AboutView from './about';
import SettingView from './setting';

import * as navigationAction from '../actions/navigation';
import * as userAction from '../actions/user';
import * as influxdbAction from '../actions/influxdb';
import * as serverActions from '../actions/server';
import * as dashboardActions from '../actions/dashboard';
import * as settingActions from '../actions/setting';

class App extends Component {
  constructor(props) {
    super(props);
    FocusStyleManager.onlyShowFocusOnTabs();
    const dispatch = props.dispatch;
    globals.set('onpopstate', () => {
      dispatch(navigationAction.back());
    });
    this.state = {
      isFetchingUserInfo: true,
      confirmDialogConfig: {
        shown: false,
        content: '',
        title: '',
        handler: null,
      },
      hiddenNav: false,
      forceToShowNav: false,
    };
    dispatch(userAction.me()).then(() => {
      this.setState({
        isFetchingUserInfo: false,
      });
      this.checkToRedirectHomePage();
    }).catch((err) => {
      this.setState({
        isFetchingUserInfo: false,
      });
      this.showError(err);
    });
    this.handleLink = this.handleLink.bind(this);
    this.showError = this.showError.bind(this);
    this.alert = this.alert.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const {
      dispatch,
    } = this.props;
    const currentAccount = _.get(this.props, 'user.account');
    const nextAccount = _.get(nextProps, 'user.account');
    if (currentAccount !== nextAccount) {
      if (nextAccount) {
        dispatch(influxdbAction.listConfig()).catch((err) => {
          this.showError(err);
        });
        dispatch(dashboardActions.list({
          group: '*',
        })).catch((err) => {
          this.showError(err);
        });
        dispatch(serverActions.list()).catch((err) => {
          this.showError(err);
        });
        dispatch(settingActions.get()).catch((err) => {
          this.showError(err);
        });
      } else {
        dispatch(serverActions.reset());
        dispatch(navigationAction.home());
      }
    }
    const location = _.get(nextProps, 'navigation.location');
    if (!nextAccount && location !== VIEW_LOGIN && location !== VIEW_REGISTER) {
      dispatch(navigationAction.login());
    }
  }
  checkToRedirectHomePage() {
    const {
      user,
      navigation,
      dispatch,
    } = this.props;
    const location = navigation.location;
    if (!user.account && location !== VIEW_LOGIN && location !== VIEW_REGISTER) {
      dispatch(navigationAction.home());
    }
  }
  alert(content, cb) {
    this.setState({
      alert: {
        content,
        cb,
      },
    });
  }
  showError(err) {
    let message = err;
    if (_.isObject(err)) {
      message = _.get(err, 'response.body.message', err.message);
    }
    this.toaster.show({
      message,
      className: 'pt-intent-warning',
    });
    if (err.stack) {
      console.error(err.stack);
    }
  }
  handleLink(url) {
    const {
      dispatch,
    } = this.props;
    return (e) => {
      e.preventDefault();
      dispatch(navigationAction.to(url));
    };
  }
  renderAlert() {
    const {
      alert,
    } = this.state;
    if (!alert) {
      return null;
    }
    const {
      content,
      cb,
    } = alert;
    const fn = (type) => {
      this.setState({
        alert: null,
      });
      cb(type);
    };
    return (
      <Alert
        isOpen
        confirmButtonText="Confirm"
        cancelButtonText="Cancel"
        onConfirm={() => fn('confirm')}
        onCancel={() => fn('cancel')}
      >
        <p>{ content }</p>
      </Alert>
    );
  }
  renderAddInflux() {
    const {
      dispatch,
      servers,
      setting,
    } = this.props;
    return (
      <InfluxView
        showError={this.showError}
        dispatch={dispatch}
        servers={servers}
        handleLink={this.handleLink}
        setting={setting}
      />
    );
  }
  renderAddServer() {
    const {
      dispatch,
    } = this.props;
    return (
      <ServerView
        showError={this.showError}
        dispatch={dispatch}
      />
    );
  }
  renderAddInfluxDashboard() {
    const {
      dispatch,
      influxdb,
    } = this.props;
    return (
      <InfluxDashboardView
        showError={this.showError}
        dispatch={dispatch}
        configs={influxdb.configs}
        handleLink={this.handleLink}
      />
    );
  }
  renderInfluxDashboards() {
    const {
      dispatch,
      dashboards,
      user,
    } = this.props;
    return (
      <InfluxDashboardsView
        showError={this.showError}
        dispatch={dispatch}
        dashboards={dashboards}
        handleLink={this.handleLink}
        user={user}
      />
    );
  }
  renderEditInflux({ params: { id } }) {
    const {
      dispatch,
      servers,
    } = this.props;
    const result = _.sortBy(servers, item => item.name);
    if (!result.length) {
      return null;
    }
    return (
      <InfluxView
        showError={this.showError}
        dispatch={dispatch}
        servers={result}
        id={id}
        handleLink={this.handleLink}
      />
    );
  }
  renderEditServer({ params: { id } }) {
    const {
      dispatch,
      servers,
    } = this.props;
    /* eslint no-underscore-dangle:0 */
    const result = _.find(servers, item => item._id === id);
    if (!result) {
      return null;
    }
    return (
      <ServerView
        dispatch={dispatch}
        server={result}
      />
    );
  }
  renderEditInfluxDashboard({ params: { id } }) {
    const {
      dispatch,
      dashboards,
      influxdb,
    } = this.props;
    /* eslint no-underscore-dangle:0 */
    const result = _.find(dashboards, item => item._id === id);
    if (!result) {
      return null;
    }
    return (
      <InfluxDashboardView
        dispatch={dispatch}
        dashboard={result}
        showError={this.showError}
        handleLink={this.handleLink}
        configs={influxdb.configs}
      />
    );
  }
  renderInfluxConfigs() {
    const {
      dispatch,
      influxdb,
    } = this.props;
    return (
      <InfluxConfigsView
        showError={this.showError}
        dispatch={dispatch}
        configs={influxdb.configs}
        handleLink={this.handleLink}
      />
    );
  }
  renderLogin() {
    const { dispatch } = this.props;
    return (
      <Login
        showError={this.showError}
        dispatch={dispatch}
      />
    );
  }
  renderRegister() {
    const { dispatch } = this.props;
    return (
      <Register
        showError={this.showError}
        dispatch={dispatch}
      />
    );
  }
  renderServers() {
    const {
      dispatch,
      servers,
    } = this.props;
    return (
      <ServersView
        showError={this.showError}
        dispatch={dispatch}
        servers={servers}
        handleLink={this.handleLink}
      />
    );
  }
  renderServerStatus({ params: { id } }) {
    const {
      dispatch,
    } = this.props;
    return (
      <ServerStatusView
        dispatch={dispatch}
        showError={this.showError}
        alert={this.alert}
        id={id}
      />
    );
  }
  renderInfluxVisualization({ params: { id } }) {
    const {
      influxdb,
      setting,
    } = this.props;
    if (!influxdb || !influxdb.configs) {
      return null;
    }
    const found = _.find(influxdb.configs, item => item._id === id);
    return (
      <InfluxVisualizationView
        key={id}
        config={found}
        setting={setting}
        showError={this.showError}
      />
    );
  }
  renderInfluxDashboardVisualizations({ params: { id } }) {
    const {
      dashboards,
    } = this.props;
    /* eslint no-underscore-dangle:0 */
    const result = _.find(dashboards, item => item._id === id);
    return (
      <InfluxDashboardVisualizationsView
        dashboard={result}
        showError={this.showError}
      />
    );
  }
  renderHome() {
    const {
      dashboards,
      influxdb,
    } = this.props;
    return (
      <HomeView
        dashboards={dashboards}
        configs={influxdb.configs}
        handleLink={this.handleLink}
      />
    );
  }
  render() {
    const {
      isFetchingUserInfo,
      hiddenNav,
      forceToShowNav,
    } = this.state;
    const {
      user,
      navigation,
      dispatch,
      dashboards,
      influxdb,
    } = this.props;
    const handleLink = this.handleLink;
    const cls = {
      'content-wrapper': true,
      fill: hiddenNav,
    };
    const mainNavStyle = {};
    if (forceToShowNav) {
      mainNavStyle.display = 'block';
    }
    return (
      <div>
        <MainHeader
          user={user}
          isFetchingUserInfo={isFetchingUserInfo}
          handleLink={handleLink}
          dispatch={dispatch}
          toggleNav={() => {
            // for mobile
            this.setState({
              forceToShowNav: !forceToShowNav,
            });
          }}
        />
        <MainNav
          style={mainNavStyle}
          dashboards={dashboards}
          handleLink={handleLink}
          navigation={navigation}
          configs={influxdb.configs}
          hidden={hiddenNav || false}
          onToggle={(hidden) => {
            this.setState({
              hiddenNav: hidden,
            });
          }}
        />
        <div className={classnames(cls)}>
          <Router {...navigation}>
            <Route
              path={VIEW_LOGIN}
              component={() => this.renderLogin()}
            />
            <Route
              path={VIEW_REGISTER}
              component={() => this.renderRegister()}
            />
            <Route
              path={VIEW_ADD_SERVER}
              component={() => this.renderAddServer()}
            />
            <Route
              path={VIEW_EDIT_SERVER}
              component={arg => this.renderEditServer(arg)}
            />
            <Route
              path={VIEW_SERVERS}
              component={() => this.renderServers()}
            />
            <Route
              path={VIEW_SERVER_STATUS}
              component={arg => this.renderServerStatus(arg)}
            />
            <Route
              path={VIEW_ADD_INFLUX}
              component={() => this.renderAddInflux()}
            />
            <Route
              path={VIEW_EDIT_INFLUX}
              component={arg => this.renderEditInflux(arg)}
            />
            <Route
              path={VIEW_INFLUX_CONFIGS}
              component={() => this.renderInfluxConfigs()}
            />
            <Route
              path={VIEW_INFLUX_VISUALIZATION}
              component={arg => this.renderInfluxVisualization(arg)}
            />
            <Route
              path={VIEW_ADD_DASHBOARD}
              component={() => this.renderAddInfluxDashboard()}
            />
            <Route
              path={VIEW_INFLUX_DASHBOARDS}
              component={() => this.renderInfluxDashboards()}
            />
            <Route
              path={VIEW_INFLUX_EDIT_DASHBOARD}
              component={arg => this.renderEditInfluxDashboard(arg)}
            />
            <Route
              path={VIEW_INFLUX_DASHBOARD}
              component={arg => this.renderInfluxDashboardVisualizations(arg)}
            />
            <Route
              path={VIEW_ABOUT}
              component={() => <AboutView />}
            />
            <Route
              path={VIEW_SETTING}
              component={() => <SettingView
                setting={this.props.setting}
                dispatch={dispatch}
                showError={this.showError}
                user={this.props.user}
              />}
            />
            <Route
              path="*"
              component={() => this.renderHome()}
            />
          </Router>
        </div>
        <Toaster
          ref={(c) => {
            this.toaster = c;
          }}
        />
        {
          this.renderAlert()
        }
      </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  influxdb: PropTypes.object.isRequired,
  servers: PropTypes.array,
  dashboards: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
  setting: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    user: state.user,
    navigation: state.navigation,
    influxdb: state.influxdb,
    servers: state.server,
    dashboards: state.dashboard,
    setting: state.setting,
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
