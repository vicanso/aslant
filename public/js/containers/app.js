import React, { Component, PropTypes } from 'react';
import { Router, Route } from 'react-enroute';
import * as ReactRedux from 'react-redux';
import * as _ from 'lodash';

import * as globals from '../helpers/globals';

import {
  VIEW_LOGIN,
  VIEW_REGISTER,
  VIEW_ADD_SERVER,
  VIEW_EDIT_SERVER,
  VIEW_SERVERS,
} from '../constants/urls';

import Login from './login';
import Register from './register';
import MainHeader from './main-header';
import ServerView from './influxdb/server';
import ServersView from './influxdb/servers';

import * as navigationAction from '../actions/navigation';
import * as userAction from '../actions/user';
import * as influxdbAction from '../actions/influxdb';

class App extends Component {
  constructor(props) {
    super(props);
    const dispatch = props.dispatch;
    globals.set('onpopstate', () => {
      dispatch(navigationAction.back());
    });
    this.state = {
      isFetchingUserInfo: true,
    };
    dispatch(userAction.me()).then(() => {
      this.setState({
        isFetchingUserInfo: false,
      });
      dispatch(influxdbAction.list());
    }).catch((err) => {
      this.setState({
        isFetchingUserInfo: false,
      });
      console.error(err);
    });
    this.handleLink = this.handleLink.bind(this);
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
  renderAddServer() {
    const {
      dispatch,
    } = this.props;
    return (
      <ServerView
        dispatch={dispatch}
      />
    );
  }
  renderEditServer({ params: { id } }) {
    const {
      dispatch,
      influxdb,
    } = this.props;
    /* eslint no-underscore-dangle:0 */
    const server = _.find(influxdb.servers, item => item._id === id);
    if (!server) {
      return null;
    }
    return (
      <ServerView
        dispatch={dispatch}
        server={server}
      />
    );
  }
  renderLogin() {
    const { dispatch } = this.props;
    return (
      <Login
        dispatch={dispatch}
      />
    );
  }
  renderRegister() {
    const { dispatch } = this.props;
    return (
      <Register
        dispatch={dispatch}
      />
    );
  }
  renderServers() {
    const {
      dispatch,
      influxdb,
    } = this.props;
    return (
      <ServersView
        dispatch={dispatch}
        servers={influxdb.servers}
        handleLink={this.handleLink}
      />
    );
  }
  render() {
    const {
      isFetchingUserInfo,
    } = this.state;
    const {
      user,
      navigation,
      dispatch,
    } = this.props;
    const handleLink = this.handleLink;
    return (
      <div>
        <MainHeader
          user={user}
          isFetchingUserInfo={isFetchingUserInfo}
          handleLink={handleLink}
          dispatch={dispatch}
        />
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
        </Router>
      </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  influxdb: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
    navigation: state.navigation,
    influxdb: state.influxdb,
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
