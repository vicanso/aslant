'use strict';
/* eslint import/no-unresolved:0 */
import React, { PropTypes, Component } from 'react';
import * as _ from 'lodash';
import QL from 'influx-ql';
import classnames from 'classnames';
import DatePicker from 'react-datepicker';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import Select from 'react-select';
import * as util from '../helpers/util';
import * as influxdbAction from '../actions/influxdb';
import SeriesTable from './series-table';
import DateTimePicker from '../components/date-time-picker';
import TagSelector from '../components/tag-selector';
import FieldSelector from '../components/field-selector';

class InfluxdbVisualizationEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conditionSelectorCount: 1,
      extractSelectorCount: 1,
      showBasicSelector: false,
      server: '',
      db: '',
      rp: '',
      measurement: '',
      conditions: [],
      extracts: [],
      doingQuery: false,
      date: {
        start: null,
        end: null,
      }
    };
  }
  setDate(date, type) {
    const data = this.state.date;
    data[type] = date;
    this.setState({
      date: data,
    });
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
      onChange: item => {
        dispatch(influxdbAction.listTagInfos(server, db, item.value));
        dispatch(influxdbAction.listField(server, db, item.value));
      },
    });
  }
  renderTagKeySelector(index) {
    const { server, db, measurement, conditions } = this.state;
    const { dispatch } = this.props;
    const key = `props.influxdbServer.tagInfos[${server + db + measurement}]`;
    return <TagSelector
      dispatch={dispatch}
      tagInfos={_.get(this, key)}
      defaultCondition={conditions[index]}
      onSelect={(item, i) => {
        const conditions = this.state.conditions.slice(0);
        conditions[i] = item;
        this.setState({
          conditions,
        });
      }}
      index={index}
      toggleConditionSelector={this.toggleConditionSelector.bind(this)}
      />
  }
  renderFieldKeySelector(index) {
    const { server, db, measurement, extracts } = this.state;
    const key = `props.influxdbServer.fields[${server + db + measurement}]`;
    return <FieldSelector
      fields={_.get(this, key)}
      index={index}
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
  getInfluxQL() {
    const state = this.state;
    if (!state.measurement) {
      return '';
    }
    const ql = new QL();
    ql.measurement = state.measurement;
    const conditions = {};
    _.forEach(state.conditions, item => {
      const tag = item.tag;
      if (conditions[tag]) {
        if (!_.isArray(conditions[tag])) {
          conditions[tag] = [conditions[tag]];
        }
        conditions[tag].push(item.value);
      } else {
        conditions[tag] = item.value;
      }
    });
    _.forEach(['start', 'end'], key => {
      const date = state.date[key];
      if (date) {
        ql[key] = moment(date, 'YYYY-MM-DD HH:mm:ss').toISOString();
      }
    });
    ql.condition(conditions);
    return ql.toSelect();
  }
  renderQueryBar() {
    const { doingQuery } = this.state;
    const queryClass = {
      fa: true,
      mright5: true,
    };
    if (doingQuery) {
      queryClass['fa-spinner'] = true;
    } else {
      queryClass['fa-search'] = true;
    }
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
      <a
        onClick={e => this.onClickQuery(e)}
        href="#"
        className="pure-button pullRight mrgiht10"
      >
        <i className={classnames(queryClass)} aria-hidden="true"></i>
        Query
      </a>
      <div 
        className="influxQl"
      >
        <input
          style={{
            width: '100%',
            padding: '7px',
          }}
          value={this.getInfluxQL()}
          placeholder="it will create influx ql auto"
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
    const { conditionSelectorCount } = this.state;
    const arr = [];
    for (let i = 0; i < conditionSelectorCount; i++) {
      arr.push(this.renderTagKeySelector(i));
    }
    return <div className="filterSelector">
      <label>Filter By</label>
      {this.renderMeasurementSelector()}
      {arr}
    </div>
  }
  renderDatePickerSelector() {
    return <div className="datePickerSelector">
      <label>Date and Time Picker</label>
      <DateTimePicker
        placeholder='select a date for start condition'
        onSelect={value => this.setDate(value, 'start')}
      />
      <DateTimePicker
        placeholder='select a date for end condition'
        onSelect={value => this.setDate(value, 'end')}
      />
    </div>
  }
  renderExtractSelecotr() {
    const { extractSelectorCount } = this.state;
    const arr = [];
    for (let i = 0; i < extractSelectorCount; i++) {
      arr.push(this.renderFieldKeySelector(i));
    }
    return <div className="extractSelector">
      <label>Extract By</label>
      {arr}
    </div>
  }
  toggleConditionSelector(type, index) {
    const { conditions, conditionSelectorCount } = this.state;
    const data = {
      conditionSelectorCount: conditionSelectorCount + 1,
    };
    if (type === 'remove') {
      data.conditionSelectorCount = conditionSelectorCount - 1;
      data.conditions = conditions.slice(0).splice(index, 1);
    }
    this.setState(data);
  }
  onToggleBasicSelector(e) {
    e.preventDefault();
    this.setState({
      showBasicSelector: !this.state.showBasicSelector,
    });
  }
  onClickQuery(e) {
    e.preventDefault();
    const state = this.state;
    const ql = this.getInfluxQL();
    if (!ql || state.doingQuery) {
      return;
    }
    const data = _.pick(state, ['measurement', 'conditions']);
    data.ql = ql;
    this.setState({
      doingQuery: true,
    });
    const complete = () => {
      this.setState({
        doingQuery: false,
      });
    };
    influxdbAction.getPoints(state.server, state.db, ql).then(series => {
      this.setState({
        series,
      });
      complete();
    }).catch(err => {
      console.error(err);
      complete();
    });
  }
  renderSeriesTable() {
    const { series } = this.state;
    if (!series || !series.length) {
      return <p>无统计数据</p>
    }
    const arr = series.map(item => {
      return <SeriesTable
        list={util.convertSeriesData(item)}
      />
    });
    return arr;
  }
  render() {
    return <div className="influxdbVisualizationEditor">
      {this.renderQueryBar()}
      {this.renderBasicSelector()}
      <div className="pure-g">
        <div className="pure-u-1-3">
          {this.renderFilterSelector()}
        </div>
        <div className="pure-u-1-3">
          {this.renderExtractSelecotr()}
        </div>
        <div className="pure-u-1-3">
          {this.renderDatePickerSelector()}
        </div>
      </div>
      <div className="mtop10">
        {this.renderSeriesTable()}
      </div>
    </div>
  }
}

export default InfluxdbVisualizationEditor;
