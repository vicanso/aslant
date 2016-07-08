'use strict';
/* eslint import/no-unresolved:0 */
import React, { PropTypes, Component } from 'react';
import * as _ from 'lodash';
import classnames from 'classnames';
import DatePicker from 'react-datepicker';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import Select from 'react-select';
import * as uuid from 'uuid';
import * as util from '../helpers/util';
import * as influxdbAction from '../actions/influxdb';
import SeriesTable from './series-table';
import DateTimePicker from '../components/date-time-picker';
import ParallelSelector from '../components/parallel-selector';

class InfluxdbVisualizationEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conditionSelectorCount: 1,
      extractSelectorCount: 1,
      groupSelectorCount: 1,
      showBasicSelector: false,
      server: '',
      db: '',
      rp: '',
      measurement: '',
      conditions: [],
      extracts: [],
      groups: [],
      doingQuery: false,
      date: {
        start: null,
        end: null,
      },
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
    const tagInfos = _.get(this, key);
    const keys = _.map(tagInfos, item => item.tag);
    const condition = conditions[index];
    const found = _.find(tagInfos, item => {
      return item.tag === (condition && condition.key);
    });
    const values = found && found.value;
    return this.renderParallelSelector({
      index,
      keys,
      values,
      id: _.get(conditions, `[${index}].id`),
      defaultKey: _.get(conditions, `[${index}].key`),
      defaultValue: _.get(conditions, `[${index}].value`),
      listKey: 'conditions',
      countKey: 'conditionSelectorCount',
    });
  }
  renderFieldKeySelector(index) {
    const values = 'clear count sum mean median min max spread stddev first last'.split(' ');
    const { server, db, measurement, extracts } = this.state;
    const key = `props.influxdbServer.fields[${server + db + measurement}]`;
    return this.renderParallelSelector({
      index,
      keys: _.get(this, key),
      values,
      id: _.get(extracts, `[${index}].id`),
      defaultKey: _.get(extracts, `[${index}].key`),
      defaultValue: _.get(extracts, `[${index}].value`),
      listKey: 'extracts',
      countKey: 'extractSelectorCount',
    });
  }
  renderGroupbySelector(index) {
    const values = '10s 30s 1m 5m 10m 15m 30m 1h 6h 12h 1d 7d 30d'.split(' ');
    const { server, db, measurement, groups } = this.state;
    const { dispatch } = this.props;
    const key = `props.influxdbServer.tagInfos[${server + db + measurement}]`;
    const tagInfos = _.get(this, key);
    const keys = _.map(tagInfos, item => item.tag);
    return this.renderParallelSelector({
      index,
      keys,
      values,
      id: _.get(groups, `[${index}].id`),
      defaultKey: _.get(groups, `[${index}].key`),
      defaultValue: _.get(groups, `[${index}].value`),
      listKey: 'groups',
      countKey: 'groupSelectorCount',
    });
  }
  renderParallelSelector(opts) {
    const { index, keys, id, values, defaultKey, defaultValue, listKey, countKey } = opts;
    return <ParallelSelector
      key={id || uuid.v4()}
      keys={keys}
      values={values}
      defaultKey={defaultKey}
      defaultValue={defaultValue}
      onSelect={item => {

        const arr = this.state[listKey].slice(0);
        arr[index] = Object.assign({
          id: uuid.v4(),
        }, item);
        const data = {};
        data[listKey] = arr;
        this.setState(data);
      }}
      toggleType={index === 0 ? "add" : "remove"}
      onToggle={type => {
        const list = this.state[listKey];
        const count = this.state[countKey];
        const data = {};
        data[countKey] = count + 1;
        if (type === 'remove') {
          data[countKey] = count - 1;
          let clone = list.slice(0);
          clone.splice(index, 1);
          data[listKey] = clone;
        }
        this.setState(data);
      }}
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
    return util.getInfluxQL(state);
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
    const { extractSelectorCount, groupSelectorCount } = this.state;
    const arr = [];
    for (let i = 0; i < extractSelectorCount; i++) {
      arr.push(this.renderFieldKeySelector(i));
    }
    const groupArr = [];
    for(let i = 0; i < groupSelectorCount; i++) {
      groupArr.push(this.renderGroupbySelector(i));
    }
    return <div className="extractSelector">
      <label>Extract By</label>
      {arr}
      <div className="groupByContainer clearfix">
        <a
          href="#"
          className="pullRight"
        >
          <i className="fa fa-cubes" aria-hidden="true"></i>
          Group By
        </a>
        <div className="groupBySelector">
          {groupArr}
        </div>
      </div>
    </div>
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
