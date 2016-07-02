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
      showBasicSelector: false,
      server: '',
      db: '',
      rp: '',
    };
  }
  renderServerSelector() {
    const { dispatch } = this.props;
    const pickKey = 'props.influxdbServer.list';
    const convert = item => {
      return {
        label: item.name,
        value: item._id,
      };
    };
    return this.renderSelecotr(pickKey, convert, 'server', item => dispatch(influxdbAction.listDatabase(item.value)));
  }
  renderDatabaseSelector() {
    const { server } = this.state;
    const { dispatch } = this.props;
    const pickKey = `props.influxdbServer.databases[${server}]`;
    const convert = item => {
      return {
        label: item,
        value: item,
      };
    };
    return this.renderSelecotr(pickKey, convert, 'db', item => dispatch(influxdbAction.listRP(server, item.value)));
  }
  renderRPSelector() {
    const { server, db } = this.state;
    const pickKey = `props.influxdbServer.rps[${server + db}]`;
    const convert = item => {
      return {
        label: item,
        value: item,
      };
    };
    return this.renderSelecotr(pickKey, convert, 'rp');
  }
  renderSelecotr(pickKey, convert, key, onChange = _.noop) {
    const data = _.get(this, pickKey, []);
    const options = _.map(data, convert);
    return <Select
      className="influxdbSelector"
      options={options}
      value={this.state[key]}
      onChange={item => {
        const data = {};
        data[key] = item.value;
        this.setState(data);
        onChange(item);
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
        onClick={e => this.onToggleBasicSelector(e)}
        href="#"
        className="pure-button pullLeft tac showServerSelector"
      >
        <i className="fa fa-server" aria-hidden="true"></i>
      </a>
      <div 
        className="influxQl"
      >
        <input
          style={{
            width: '100%',
            padding: '7px',
          }}
          type="text"
        />
      </div>
    </div>
  }
  renderBasicSelector() {
    const { showBasicSelector } = this.state;
    if (!showBasicSelector) {
      return null;
    }
    return <div className="selectorContainer"
      style={{
        marginTop: '-6px',
      }}
    >
      <label className="mtop10">Servers</label>
      {this.renderServerSelector()}
      <label className="mtop10">Databases</label>
      {this.renderDatabaseSelector()}
      <label className="mtop10">Retention Policies</label>
      {this.renderRPSelector()}
    </div>
  }
  onToggleBasicSelector(e) {
    e.preventDefault();
    this.setState({
      showBasicSelector: !this.state.showBasicSelector,
    });
  }
  render() {
    return <div className="influxdbVisualizationEditor">
      {this.renderQueryBar()}
      {this.renderBasicSelector()}
    </div>
  }
}

export default InfluxdbVisualizationEditor;
