'use strict';
/* eslint import/no-unresolved:0 */
import React, { PropTypes, Component } from 'react';
import * as navigationAction from '../actions/navigation';
import * as influxdbAction from '../actions/influxdb';

class InfluxdbVisualizationList extends Component {
  constructor(props) {
    super(props);
    const dispatch = props.dispatch;
    dispatch(influxdbAction.listConfigure());
  }
  addVisualization(e) {
    const { dispatch } = this.props;
    e.preventDefault();
    dispatch(navigationAction.addVisualization())
  }
  renderVisualizations() {
    const { configures, dispatch } = this.props;
    return _.map(configures, configure => {
      const id = configure._id;
      return (
        <div
          className="pure-u-1-4"
          key={id}
        >
          <div className="visualization" onClick={() => dispatch(navigationAction.editVisualization(id))}>
            <div className="title">
              <i className="fa fa-bar-chart" aria-hidden="true"></i>
              {configure.name}
            </div>
            <p>{configure.desc}</p>
            <span className="author">
              <i className="fa fa-user mright3" aria-hidden="true"></i>
              {configure.owner}
            </span>
          </div>
        </div>
      );
    });
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
          { this.renderVisualizations() }
        </div>
      </div>
    );
  }
}

export default InfluxdbVisualizationList;
