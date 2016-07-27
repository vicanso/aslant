'use strict';
/* eslint import/no-unresolved:0 */
import React, { PropTypes, Component } from 'react';
import * as _ from 'lodash';
import classnames from 'classnames';
import * as influxdbAction from '../actions/influxdb';
import * as navigationAction from '../actions/navigation';
import * as util from '../helpers/util';

class InfluxdbDashboardEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedList: [],
    };
  }
  toggle(e, id) {
    e.preventDefault();
    const list = this.state.selectedList.slice(0);
    const index = _.indexOf(list, id);
    if (!~index) {
      list.push(id);
    } else {
      list.splice(index, 1);
    }
    this.setState({
      selectedList: list,
      error: '',
    });
  }
  resetError() {
    if (this.state.error) {
      this.setState({
        error: '',
      });
    }
  }
  submit(e) {
    e.preventDefault();
    const { selectedList } = this.state;
    const { dispatch } = this.props;
    const refs = this.refs;
    const name = refs.name.value;
    const desc = refs.desc.value;
    if (!name || !desc) {
      return this.setState({
        error: `Name and description can\'t be empty`,
      });
    }
    if (!selectedList.length) {
      return this.setState({
        error: 'At least one configure must be selected',
      });
    }
    this.setState({
      status: 'processing',
    });
    dispatch(influxdbAction.addDashboard({
      name,
      desc,
      configures: selectedList,
    })).then(() => {
      dispatch(navigationAction.back());
    }).catch(err => {
      this.setState({
        status: '',
        error: util.getError(err),
      });
    });
  }
  renderConfigures() {
    const { configures } = this.props;
    const { selectedList } = this.state;
    return _.map(configures, (item, index) => {
      const id = item.id;
      const cls = {
        fa: true,
      };
      if (~_.indexOf(selectedList, id)) {
        cls['fa-check-square'] = true;
      } else {
        cls['fa-square-o'] = true;
      }
      return (
        <tr key={id}>
          <td>{index + 1}</td>
          <td>{item.name}</td>
          <td>{item.desc}</td>
          <td>{item.owner}</td>
          <td>
            <a
              href="#"
              onClick={e => this.toggle(e, id)}
            >
              <i className={classnames(cls)} aria-hidden="true"></i>
            </a>
          </td>
        </tr>
      );
    });
  }
  render() {
    const { status, error } = this.state;
    return (
      <div
        className="influxdbDashboardEditor"
      > 
        <div className="pure-g">
          <div className="pure-u-5-12"><div className="mright10">
            <input
              type="text"
              placeholder="the name of dashboard"
              ref="name"
              onChange={() => this.resetError()}
            />
          </div></div>
          <div className="pure-u-5-12"><div className="mright10">
            <input
              type="text"
              placeholder="the description of dashboard"
              ref="desc"
              onChange={() => this.resetError()}
            />
          </div></div>
          <div className="pure-u-1-6">
            <a
              href="#"
              className="pure-button pure-button-primary"
              onClick={e => this.submit(e)}
            >Submit
              { status === 'processing' && <span>...</span> }
            </a>
          </div>
        </div>
        <table className="pure-table mtop10">
          <thead><tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Owner</th>
            <th>Add</th>
          </tr></thead>
          <tbody>
            {this.renderConfigures()}
          </tbody>
        </table>
        { error && 
          <div className="warning mtop10">
            <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
            <span>{error}</span>
          </div>
        }
      </div>
    );
  }
}

export default InfluxdbDashboardEditor;
