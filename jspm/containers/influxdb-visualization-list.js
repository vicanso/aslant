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
    this.state = {
      stepDict: {},
    };
  }
  addVisualization(e) {
    const { dispatch } = this.props;
    e.preventDefault();
    dispatch(navigationAction.addVisualization())
  }
  toggleRemoveVisualizationStep(e, id) {
    e.preventDefault();
    e.stopPropagation();
    const stepDict = this.state.stepDict;
    if (!stepDict[id]) {
      stepDict[id] = 'confirm';
    } else {
      stepDict[id] = '';
    }
    this.setState({
      stepDict,
    });
  }
  confirmRemoveVisualizationStep(e, id) {
    e.preventDefault();
    e.stopPropagation();
    const { dispatch } = this.props;
    const stepDict = this.state.stepDict;
    stepDict[id] = 'processing';
    this.setState({
      stepDict,
    });
    dispatch(influxdbAction.removeConfigure(id)).then(() => {

    });
  }
  renderVisualizations() {
    const { configures, dispatch } = this.props;
    const stepDict = this.state.stepDict;
    return _.map(configures, configure => {
      const id = configure._id;
      const step = stepDict[id];
      return (
        <div
          className="pure-u-1-4"
          key={id}
        >
          <div className="visualization" onClick={() => dispatch(navigationAction.editVisualization(id))}>
            <div className="title">
              { !step &&
                <a
                  onClick={e => this.toggleRemoveVisualizationStep(e, id)}
                  className="pullRight"
                  href="#"
                >
                  <i className="fa fa-times" aria-hidden="true"></i>
                </a>
              }
              {
                step === 'confirm' &&
                <span className="pullRight">
                  <a
                    href="#"
                    onClick={e => this.confirmRemoveVisualizationStep(e, id)}
                  >
                    <i className="fa fa-check" aria-hidden="true"></i>
                  </a>
                  <a
                    onClick={e => this.toggleRemoveVisualizationStep(e, id)}
                    href="#"
                  >
                    <i className="fa fa-times" aria-hidden="true"></i>
                  </a>
                </span>
              }
              {
                step === 'processing' &&
                <span className="pullRight mright5">
                  <i className="fa fa-spinner" aria-hidden="true"></i>
                </span>
              }
              <i className="fa fa-bar-chart mright3" aria-hidden="true"></i>
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
