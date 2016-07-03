'use strict';
/* eslint import/no-unresolved:0 */
import React, { PropTypes, Component } from 'react';
import * as _ from 'lodash';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import * as influxdbAction from '../actions/influxdb';

class TagSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: '',
    };
  }
  renderSelector(opts) {
    const { options, key, placeholder } = opts;
    return <Select
      className="influxdbSelector"
      options={options}
      value={this.state[key]}
      placeholder={placeholder}
      onChange={item => {
        const value = (item && item.value) || '';
        const data = {};
        data[key] = value;
        this.setState(data);
      }}
    />
  }
  render() {
    const state = this.state;
    const { tagInfos, placeholder } = this.props;
    const tagOptions = [];
    const seriesOptions = [];
    const convert = item => {
      return {
        label: item,
        value: item,
      };
    };
    _.forEach(tagInfos, item => {
      tagOptions.push(convert(item.tag));
      if (item.tag === state.tag) {
        _.forEach(item.value, v => {
          seriesOptions.push(convert(v));
        });
      }
    });
    return (
      <div className="pure-g">
        <div className="pure-u-1-2">
          {
            this.renderSelector({
              options: tagOptions,
              key: 'tag',
              placeholder: 'Select a tag key',
            })
          }
        </div>
        <div className="pure-u-1-2">
          {
            this.renderSelector({
              options: seriesOptions,
              key: 'series',
              placeholder: 'Select a tag value',
            })
          }
        </div>
      </div>
    );
  }
}

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
    const convert = item => {
      return {
        label: item.name,
        value: item._id,
      };
    };
    return this.renderSelecotr({
      pickKey: 'props.influxdbServer.list',
      key: 'server',
      convert,
      onChange: item => dispatch(influxdbAction.listDatabase(item.value)),
    });
  }
  renderDatabaseSelector() {
    const { server } = this.state;
    const { dispatch } = this.props;
    return this.renderSelecotr({
      pickKey: `props.influxdbServer.databases[${server}]`,
      key: 'db',
      onChange: item => {
        dispatch(influxdbAction.listRP(server, item.value));
        dispatch(influxdbAction.listMeasurement(server, item.value));
      },
    });
  }
  renderRPSelector() {
    const { server, db } = this.state;
    return this.renderSelecotr({
      pickKey: `props.influxdbServer.rps[${server + db}]`,
      key: 'rp'
    });
  }
  renderMeasurementSelector() {
    const { server, db } = this.state;
    const { dispatch } = this.props;
    return this.renderSelecotr({
      pickKey: `props.influxdbServer.measurements[${server + db}]`,
      key: 'measurement',
      placeholder: 'Select a measurement',
      onChange: item => dispatch(influxdbAction.listTagInfos(server, db, item.value)),
    });
  }
  renderTagKeySelector() {
    const { server, db, measurement } = this.state;
    const { dispatch } = this.props;
    const key = `props.influxdbServer.tagInfos[${server + db + measurement}]`;
    return <TagSelector
      dispatch={dispatch}
      tagInfos={_.get(this, key)}
      onSelect={item => console.dir(item)}
      />
  }
  renderSelecotr(opts) {
    const { pickKey, key } = opts;
    const defaultConvert = item => {
      return {
        label: item,
        value: item,
      };
    };
    const convert = opts.convert || defaultConvert;
    const onChange = opts.onChange || _.noop;

    const data = _.get(this, pickKey, []);
    const options = _.map(data, convert);
    return <Select
      className="influxdbSelector"
      options={options}
      value={this.state[key]}
      placeholder={opts.placeholder}
      onChange={item => {
        const data = {};
        if (!item) {
          data[key] = '';
          this.setState(data);
          return;
        }
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
          placeholder="influx ql"
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
    return <div className="basicSelector"
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
  renderFilterSelector() {
    return (
      <div className="filterSelector">
        <label>Filter By</label>
        {this.renderMeasurementSelector()}
        {this.renderTagKeySelector()}
      </div>
    );
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
      <div className="pure-g">
        <div className="pure-u-1-3">
          {this.renderFilterSelector()}
        </div>
      </div>
    </div>
  }
}

export default InfluxdbVisualizationEditor;
