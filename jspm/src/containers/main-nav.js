'use strict';
/* eslint import/no-unresolved:0 */
import React, { PropTypes, Component } from 'react';
import * as navigationAction from 'aslant/actions/navigation';

class MainNav extends Component {
  goToHome(e) {
    const { dispatch } = this.props;
    e.preventDefault();
    dispatch(navigationAction.home());
  }
  render() {
    return (
      <nav className="mainNav">
        <a className="logo" href="#" onClick={e => this.goToHome(e)}>aslant</a>
        <ul>
          <li>
            <i className="fa fa-tachometer" aria-hidden="true"></i>Dashboard</li>
          <li>
            <i className="fa fa-bars" aria-hidden="true"></i>Setting</li>
        </ul>
      </nav>
    );
  }
}

MainNav.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default MainNav;
