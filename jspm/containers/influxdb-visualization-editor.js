'use strict';
/* eslint import/no-unresolved:0 */
import React, { PropTypes, Component } from 'react';
import * as _ from 'lodash';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import * as influxdbAction from '../actions/influxdb';

class InfluxdbVisualizationEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      server: '',
      db: '',
    };
  }
  renderServerSelector() {
    const { dispatch } = this.props;
    const list = _.get(this, 'props.influxdbServer.list');
    const options = _.map(list, item => {
      return {
        label: item.name,
        value: item._id,
      };
    });
    return <Select
      className="influxdbServerSelector"
      options={options}
      value={this.state.server}
      onChange={item => {
        this.setState({
          server: item.value,
        });
        dispatch(influxdbAction.listDatabase(item.value));
      }}
    />
  }
  renderDatabaseSelector() {
    const { dispatch } = this.props;
    const { server } = this.state;
    const databases = _.get(this, `props.influxdbServer.databases[${server}]`, []);
    const options = _.map(databases, item => {
      return {
        label: item,
        value: item,
      };
    });
    return <Select
      className="influxdbServerSelector"
      options={options}
      value={this.state.db}
      onChange={item => {
        this.setState({
          db: item.value,
        });
      }}
    />
  }
  renderQueryBar() {
    return <div
      style={{
        margin: '10px 0',
      }}
    >
      <a
        style={{
          width: '80px',
        }}
        href="#"
        className="pure-button pullLeft tac"
      >
        <i className="fa fa-server" aria-hidden="true"></i>
      </a>
      <input
        className="influxQl"
        type="text"
      />
    </div>
  }
  render() {
    return <div className="influxdbVisualizationEditor">
      {this.renderQueryBar()}

      {this.renderServerSelector()}
      {this.renderDatabaseSelector()}
    </div>
  }
}

export default InfluxdbVisualizationEditor;
