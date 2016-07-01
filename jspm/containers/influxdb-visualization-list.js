'use strict';
/* eslint import/no-unresolved:0 */
import React, { PropTypes, Component } from 'react';
import * as navigationAction from '../actions/navigation';

class InfluxdbVisualizationList extends Component {
  addVisualization(e) {
    const { dispatch } = this.props;
    e.preventDefault();
    dispatch(navigationAction.addVisualization())
  }
  render() {
    return (
      <div className="influxdbVisualizationList">
        <div className="pure-g">
          <div className="pure-u-1-4">
            <a className="visualization addVisualization" href="#" onClick={e => this.addVisualization(e)}>
              <i className="fa fa-plus" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default InfluxdbVisualizationList;
