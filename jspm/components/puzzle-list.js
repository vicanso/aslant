'use strict';
/* eslint import/no-unresolved:0 */
import React, { PropTypes, Component } from 'react';
import * as _ from 'lodash';

class PuzzleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepDict: {},
    };
  }
  add(e) {
    e.preventDefault();
    _.invoke(this.props, 'add');
  }
  toggleRemoveStep(e, id) {
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
  confirmRemoveStep(e, id) {
    e.preventDefault();
    e.stopPropagation();
    const { dispatch } = this.props;
    const stepDict = this.state.stepDict;
    stepDict[id] = 'processing';
    this.setState({
      stepDict,
    });
    _.invoke(this.props, 'remove', id);
  }
  edit(e, id) {
    e.preventDefault();
    _.invoke(this.props, 'edit', id);
  }
  show(e, id) {
    e.preventDefault();
    _.invoke(this.props, 'show', id);
  }
  renderList() {
    const { items, dispatch } = this.props;
    const stepDict = this.state.stepDict;
    return _.map(items, item => {
      const id = item._id;
      const step = stepDict[id];
      return (
        <div
          className="pure-u-1-4"
          key={id}
        >
          <div className="item">
            <div className="title">
              { !step &&
                <a
                  onClick={e => this.toggleRemoveStep(e, id)}
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
                    onClick={e => this.confirmRemoveStep(e, id)}
                  >
                    <i className="fa fa-check" aria-hidden="true"></i>
                  </a>
                  <a
                    onClick={e => this.toggleRemoveStep(e, id)}
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
              <a
                className="pullRight"
                href="#"
                onClick={e => this.edit(e, id)}
              >
                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
              </a>
              <i className="fa fa-bar-chart mright3" aria-hidden="true"></i>
              {item.name}

            </div>
            <div
              className="content"
              onClick={e => this.show(e, id)}
            >
              <p>{item.desc}</p>
              <span className="author">
                <i className="fa fa-user mright3" aria-hidden="true"></i>
                {item.owner}
              </span>
            </div>
          </div>
        </div>
      );
    });
  }
  render() {
    const cls = `${(this.props.className || '')} puzzleList`.trim(); 
    return (
      <div className={cls}>
        <div className="pure-g">
          <div className="pure-u-1-4">
            <a className="item fullLineHeight" href="#" onClick={e => this.add(e)}>
              <i className="fa fa-plus" aria-hidden="true"></i>
            </a>
          </div>
          { this.renderList() }
        </div>
      </div>
    );
  }
}

export default PuzzleList;
