'use strict';
/* eslint import/no-unresolved:0 */
import React, { PropTypes, Component } from 'react';
import PuzzleList from '../components/puzzle-list';
import * as navigationAction from '../actions/navigation';

class InfluxdbDashboardList extends Component {
  addDashboard(e) {
    const { dispatch } = this.props;
    e.preventDefault();
    dispatch(navigationAction.addDashboard());
  }
  render() {
    return (
      <div className="influxdbDashboardList puzzleList">
        <div className="pure-g">
          <div className="pure-u-1-4">
            <a
              className="item fullLineHeight"
              href="#"
              onClick={e => this.addDashboard(e)}
            >
              <i className="fa fa-plus" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default InfluxdbDashboardList;
