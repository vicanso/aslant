'use strict';
/* eslint import/no-unresolved:0 */
import React, { PropTypes, Component } from 'react';
import * as _ from 'lodash';
import * as userAction from '../actions/user';
import * as navigationAction from '../actions/navigation';
import * as influxdbAction from '../actions/influxdb';
import * as util from '../helpers/util';

class MainHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'processing',
    };
  }
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(userAction.fetch()).then(() => {
      this.setState({
        status: '',
      });
    }).catch(this.onError.bind(this));
  }
  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;
    const currentAccount = _.get(nextProps, 'user.account');
    const account = _.get(this.props, 'user.account');
    if (currentAccount && currentAccount !== account) {
      dispatch(influxdbAction.listServer());
    }
  }
  onError(err) {
    this.setState({
      status: 'error',
      message: util.getError(err),
    });
  }
  register(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(navigationAction.register());
  }
  logout(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    this.setState({
      status: 'processing',
    });
    dispatch(userAction.logout()).then(() => {
      this.setState({
        status: '',
      });
    }).catch(this.onError.bind(this));
  }
  login(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(navigationAction.login());
  }
  addServer(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(navigationAction.addServer());
  }
  showServers(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(navigationAction.showServers());
  }
  renderUserInfo() {
    const { status, message } = this.state;
    const { user, dispatch, influxdbServer } = this.props;
    const hasServer = !!_.get(influxdbServer, 'list.length', 0);
    if (status === 'error') {
      return (
        <li>
          <span className="warning">
            <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
            {message}
          </span>
        </li>
      );
    }
    if (status === 'processing') {
      return (
        <li>
          <i className="fa fa-spinner mright5" aria-hidden="true"></i>
            Loading...
        </li>
      );
    }
    if (user.account) {
      return (
        <li>
          <span>{user.account}</span>
          <a href='#' onClick={e => this.addServer(e)}>
            <i className="fa fa-plus" aria-hidden="true"></i>
            add-server
          </a>
          {
            hasServer && 
            <a href='#' onClick={e => this.showServers(e)}>
              <i className="fa fa-server" aria-hidden="true"></i>
              influxdbs
            </a>
          }
          <a href="#" onClick={e => this.logout(e)}>
            <i className="fa fa-sign-out" aria-hidden="true"></i>
          logout</a>
        </li>
      );
    }
    return (
      <li>
        <a href="#" className="mright5" onClick={e => this.register(e)}>
          <i className="fa fa-user" aria-hidden="true"></i>
        register</a>
        <a href="#" onClick={e => this.login(e)}>
          <i className="fa fa-sign-in" aria-hidden="true"></i>
        login</a>
      </li>
    );
  }

  render() {
    return (
      <header className="mainHeader">
        <ul className="pullRight">
          {this.renderUserInfo()}
          <li className="version">Version 3.x</li>
        </ul>
      </header>
    );
  }
}

MainHeader.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default MainHeader;
