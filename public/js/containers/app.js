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
  VIEW_SERVER_STATUS,
  VIEW_ADD_INFLUX,
} from '../constants/urls';

import Login from './login';
import Register from './register';
import MainHeader from './main-header';
import ServerView from './influxdb/server';
import ServersView from './influxdb/servers';
import ServerStatusView from './influxdb/status';
import InfluxView from './influxdb/influx';

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
      confirmDialogConfig: {
        shown: false,
        content: '',
        title: '',
        handler: null,
      },
    };
    dispatch(userAction.me()).then(() => {
      this.setState({
        isFetchingUserInfo: false,
      });
      // dispatch(influxdbAction.list());
    }).catch((err) => {
      this.setState({
        isFetchingUserInfo: false,
      });
      console.error(err);
    });
    this.handleLink = this.handleLink.bind(this);
    this.confirm = this.confirm.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const {
      dispatch,
    } = this.props;
    const currentAccount = _.get(this.props, 'user.account');
    const nextAccount = _.get(nextProps, 'user.account');
    if (currentAccount !== nextAccount) {
      if (nextAccount) {
        dispatch(influxdbAction.list());
      } else {
        dispatch(influxdbAction.reset());
      }
    }
  }
  confirm(options, handler) {
    const {
      confirmDialogConfig,
    } = this.state;
    const data = _.extend({}, confirmDialogConfig, options);
    data.handler = handler;
    data.shown = true;
    this.setState({
      confirmDialogConfig: data,
    });
  }
  closeConfirmDialog(e, type) {
    e.preventDefault();
    const {
      handler,
    } = this.state.confirmDialogConfig;
    if (_.isFunction(handler)) {
      handler(type);
    }
    this.setState({
      confirmDialogConfig: {
        shown: false,
      },
    });
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
  renderAddInflux() {
    const {
      dispatch,
      influxdb,
    } = this.props;
    return (
      <InfluxView
        dispatch={dispatch}
        servers={influxdb.servers}
      />
    );
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
  renderConfirmDialog() {
    const {
      shown,
      content,
      title,
    } = this.state.confirmDialogConfig;
    if (!shown) {
      return null;
    }
    return (
      <div
        className="dialog"
      >
        <div className="title">
          <a
            href="javascript:;"
            className="close pull-right"
            onClick={e => this.closeConfirmDialog(e, 'close')}
          >
            <i className="fa fa-times" aria-hidden="true" />
          </a>
          { title || 'Confirm' }
        </div>
        <div className="content">
          {
            React.createElement('div', {
              dangerouslySetInnerHTML: {
                __html: content,
              },
            })
          }
        </div>
        <div
          className="btns"
        >
          <button
            className="btn btn-primary"
            onClick={e => this.closeConfirmDialog(e, 'confirm')}
          >Confirm</button>
          <button
            className="btn"
            onClick={e => this.closeConfirmDialog(e, 'cancel')}
          >Cancel</button>
        </div>
      </div>
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
        confirm={this.confirm}
        dispatch={dispatch}
        servers={influxdb.servers}
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
        id={id}
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
        {
          this.renderConfirmDialog()
        }
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
