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
            <i className="fa fa-plus" aria-hidden="true"></i>
          </div>
        </div>
        <a
          href="#" onClick={e => this.addVisualization(e)}
          className="pure-button pure-button-primary"
          style={{
            width: '100%',
            marginTop: '15px',
          }}
        >
          <i className="fa fa-plus mright5" aria-hidden="true"></i>
          Add Visualization
        </a>
      </div>
    );
  }
}

export default InfluxdbVisualizationList;
