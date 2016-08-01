'use strict';
/* eslint import/no-unresolved:0 */
import React, { PropTypes, Component } from 'react';
import * as _ from 'lodash';
import * as userAction from '../actions/user';
import * as navigationAction from '../actions/navigation';
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
  to(e, fn) {
    e.preventDefault();
    const { dispatch } = this.props;
    const handler = navigationAction[fn];
    if (_.isFunction(handler)) {
      dispatch(handler());
    }
  }
  renderUserInfo() {
    const { status, message } = this.state;
    const { user } = this.props;
    const account = _.get(user, 'basic.account');
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
    if (account) {
      return (
        <li>
          <span>{account}</span>
          <a href="#" onClick={e => this.to(e, 'showServers')}>
            <i className="fa fa-server" aria-hidden="true"></i>
            influxdbs
          </a>
          <a href="#" onClick={e => this.to(e, 'showVisualizations')}>
            <i className="fa fa-bar-chart" aria-hidden="true"></i>
              visualizations
          </a>
          <a href="#" onClick={e => this.to(e, 'showDashboards')}>
            <i className="fa fa-tachometer" aria-hidden="true"></i>
              dashboards
          </a>
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
    const { dispatch } = this.props;
    return (
      <header className="mainHeader">
        <a
          href="#"
          onClick={e => {
            e.preventDefault();
            dispatch(navigationAction.home());
          }}
          className="logo"
        >Aslant</a>
        <ul
          className="pullRight"
          style={{
            marginRight: '10px',
          }}
        >
          {this.renderUserInfo()}
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
