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
      originalQL: '',
      conditionSelectorCount: 1,
      extractSelectorCount: 1,
      groupSelectorCount: 1,
      showBasicSelector: false,
      showGroupSelector: false,
      server: '',
      db: '',
      rp: '',
      measurement: '',
      conditions: [],
      extracts: [],
      groups: [],
      groupByTime: '',
      doingQuery: false,
      date: {
        start: null,
        end: null,
      },
      error: '',
    };
  }
  clearError() {
    this.setState({
      error: '',
    });
  }
  setError(err) {
    this.setState({
      error: util.getError(err),
    });
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
      onChange: item => {
        dispatch(influxdbAction.listDatabase(item.value))
          .catch(this.setError.bind(this));
        this.clearError();
      },
    });
  }
  renderDatabaseSelector() {
    const { server } = this.state;
    const { dispatch } = this.props;
    return this.renderSelecotr({
      pickKey: `props.influxdbServer.databases[${server}]`,
      key: 'db',
      onChange: item => {
        dispatch(influxdbAction.listRP(server, item.value))
          .catch(this.setError.bind(this));
        dispatch(influxdbAction.listMeasurement(server, item.value))
          .catch(this.setError.bind(this));
        this.clearError();
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
        dispatch(influxdbAction.listTagInfos(server, db, item.value))
          .catch(this.setError.bind(this));
        dispatch(influxdbAction.listField(server, db, item.value))
          .catch(this.setError.bind(this));
        this.clearError();
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
    const { server, db, measurement, groups } = this.state;
    const { dispatch } = this.props;
    const key = `props.influxdbServer.tagInfos[${server + db + measurement}]`;
    const tagInfos = _.get(this, key);
    const values = _.map(tagInfos, item => item.tag);
    return this.renderParallelSelector({
      hidden: ['key'],
      index,
      values,
      id: _.get(groups, `[${index}].id`),
      defaultKey: _.get(groups, `[${index}].key`),
      defaultValue: _.get(groups, `[${index}].value`),
      listKey: 'groups',
      countKey: 'groupSelectorCount',
    });
  }
  renderGroupbyTimeSelector() {
    if (!_.get(this, 'state.extracts.length')) {
      return null;
    }
    const options = _.map('10s 30s 1m 5m 10m 15m 30m 1h 6h 12h 1d 7d 30d'.split(' '), v => {
      return {
        label: v,
        value: v,
      };
    });
    return (
      <Select
        value={this.state.groupByTime}
        className="mbottom10"
        options={options}
        onChange={item => {
          const value = (item && item.value) || '';
          this.setState({
            groupByTime: value,
          });
          this.clearError();
        }}
      />
    );
  }
  renderParallelSelector(opts) {
    const { index, keys, id, values, defaultKey, defaultValue, listKey, countKey, hidden } = opts;
    return <ParallelSelector
      hidden={hidden}
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
        this.clearError();
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
        this.clearError();
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
        onClick={e => this.onClickToggle(e, 'basicSelector')}
        href="#"
        className="pure-button pullLeft tac showServerSelector"
      >
        <i className="fa fa-server" aria-hidden="true"></i>
      </a>
      <div className="pullRight timeSelectorContainer"
      >
        {this.renderTimeSelector()}
      </div>
      <div 
        className="influxQl"
      >
        <input
          style={{
            width: '100%',
            padding: '9px',
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
  renderTimeSelector() {
    const options = [
      {
        label: 'Past 5 minutes',
        value: '-5m',
      },
      {
        label: 'Past 15 minutes',
        value: '-15m',
      },
      {
        label: 'Past 30 minutes',
        value: '-30m',
      },
      {
        label: 'Past 1 hour',
        value: '-1h',
      },
      {
        label: 'Past 2 hours',
        value: '-2h',
      },
      {
        label: 'Past 6 hour',
        value: '-6h',
      },
      {
        label: 'Past 12 hour',
        value: '-12h',
      },
      {
        label: 'Past 1 day',
        value: '-1d',
      },
      {
        label: 'Past 2 days',
        value: '-2d',
      },
      {
        label: 'Past 7 days',
        value: '-7d',
      },
      {
        label: 'Past 30 days',
        value: '-30d',
      },
      {
        label: 'Custom',
        value: 'Custom',
      },
    ];
    return (
      <Select
        value={this.state.date.start}
        options={options}
        onChange={item => {
          this.setState({
            date: {
              start: (item && item.value) || '',
            }
          });
        }}
      />
    );
  }
  renderDatePickerSelector() {
    const arr = _.map(['start', 'end'], key => {
      return (
        <div className="pure-u-1-2">
          <DateTimePicker
            onSelect={value => {
              this.setDate(value, key);
              this.clearError();
            }}
          />
        </div>
      );
    });
    return (
      <div className="datePickerSelector pure-g">
        {arr}
      </div>
    );
  }
  renderExtractSelecotr() {
    const { extractSelectorCount, groupSelectorCount, showGroupSelector } = this.state;
    const arr = [];
    for (let i = 0; i < extractSelectorCount; i++) {
      arr.push(this.renderFieldKeySelector(i));
    }
    const groupArr = [];
    if (showGroupSelector) {
      for(let i = 0; i < groupSelectorCount; i++) {
        groupArr.push(this.renderGroupbySelector(i));
      }
      groupArr.push(this.renderGroupbyTimeSelector());
    }
    return <div className="extractSelector">
      <label>Extract By</label>
      {arr}
      <div className="groupByContainer clearfix">
        <a
          href="#"
          className="pullRight"
          onClick={e => this.onClickToggle(e, 'groupBySelector')}
        >
          <i className="fa fa-cubes" aria-hidden="true"></i>
          Group By
        </a>
        {
          showGroupSelector && <div className="groupBySelector">
            {groupArr}
          </div>
        }
      </div>
    </div>
  }
  onClickToggle(e, type) {
    e.preventDefault();
    const data = {};
    const state = this.state;
    const keyDict = {
      basicSelector: 'showBasicSelector',
      groupBySelector: 'showGroupSelector',
    };
    const key = keyDict[type];
    if (!key) {
      return;
    }
    data[key] = !state[key];
    this.setState(data);
  }
  doQuery() {
    const state = this.state;
    const ql = this.getInfluxQL();
    if (!ql || state.doingQuery || ql === state.originalQL) {
      return;
    }
    const data = _.pick(state, ['measurement', 'conditions']);
    data.ql = ql;
    this.setState({
      doingQuery: true,
      originalQL: ql,
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
      complete();
      this.setState({
        series: null,
      });
      this.setError(err);
    });
  }
  renderSeriesTable() {
    const { series } = this.state;
    if (!series) {
      return null;
    }
    if (!series.length) {
      return <p className="tac">There is not stats data, please change influx ql.</p>
    }
    const arr = series.map(item => {
      return <SeriesTable
        tags={item.tags}
        list={util.convertSeriesData(item)}
      />
    });
    return arr;
  }
  renderErrorTips() {
    const { error } = this.state;
    if (!error) {
      return null;
    }
    return (
      <div className="warning">
        <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
        <span>{error}</span>
      </div>
    )
  }
  render() {
    this.doQuery();
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
      <div className="seriesTableContainer">
        {this.renderSeriesTable()}
      </div>
      {
        this.renderErrorTips()
      }
    </div>
  }
}

export default InfluxdbVisualizationEditor;
