'use strict';
/* eslint import/no-unresolved:0 */
import React, { PropTypes, Component } from 'react';
import * as _ from 'lodash';
import classnames from 'classnames';
import Select from 'react-select';
import * as uuid from 'uuid';
import * as util from 'aslant/helpers/util';
import * as influxdbAction from 'aslant/actions/influxdb';
import InfluxdbVisualizationView from 'aslant/components/influxdb-visualization-view';
import RadioSelector from 'aslant/components/radio-selector';
import DateTimePicker from 'aslant/components/date-time-picker';
import ParallelSelector from 'aslant/components/parallel-selector';
import EchartSetting from 'aslant/components/echart-setting';
import VisualizationSaveDialog from 'aslant/containers/visualization-save-dialog';
import { STATS_VIEW_TYPES, OFFSET_TIME_LIST } from 'aslant/constants/common';

class InfluxdbVisualizationEditor extends Component {
  constructor(props) {
    super(props);
    this.state = _.extend({
      originalQL: '',
      conditionSelectorCount: 1,
      extractSelectorCount: 1,
      groupSelectorCount: 1,
      showSubmitDialog: false,
      showBasicSelector: false,
      showGroupSelector: false,
      showDateTimeSelector: false,
      hideEmptyPoint: false,
      server: '',
      database: '',
      rp: '',
      measurement: '',
      conditions: [],
      extracts: [],
      groups: [],
      fields: [],
      groupByTime: '',
      offsetTime: '-15m',
      orderByTime: 'asc',
      statsView: STATS_VIEW_TYPES[0],
      date: {
        start: null,
        end: null,
      },
      dateTimePickerValue: {
        start: null,
        end: null,
      },
      error: '',
      echart: {},
      access: '',
    }, props.data);
    this.restore();
  }
  onClickToggle(e, type) {
    /* eslint no-param-reassign:0 */
    e.disableToggle = true;
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
  setDateTimeValue(date, type) {
    const data = this.state.dateTimePickerValue;
    data[type] = date;
    this.setState({
      dateTimePickerValue: data,
    });
  }
  setDate(e) {
    e.preventDefault();
    const data = _.pick(this.state.dateTimePickerValue, ['start', 'end']);
    this.setState({
      offsetTime: 'Custom',
      showDateTimeSelector: false,
      date: data,
    });
  }
  getInfluxQL() {
    const state = this.state;
    if (!state.measurement || state.error) {
      return '';
    }
    const count = Math.abs(util.toSeconds(state.offsetTime)) / util.toSeconds(state.groupByTime);
    if (count > 300) {
      this.setState({
        series: null,
        error: `There are too many points(${count}), please change influx ql group by time`,
      });
      return '';
    }
    return util.getInfluxQL(state);
  }
  getConfigure() {
    /* eslint max-len:0 */
    const keys = 'server database rp measurement groupByTime offsetTime conditions extracts groups fields date hideEmptyPoint orderByTime statsView echart access'.split(' ');
    return _.pick(this.state, keys);
  }
  setError(err) {
    this.setState({
      error: util.getError(err),
    });
  }
  restore() {
    const { data, dispatch } = this.props;
    if (!data) {
      return;
    }
    const conf = data;
    const { server, database, measurement } = conf;
    if (!server) {
      return;
    }
    dispatch(influxdbAction.listDatabase(server));
    if (!database) {
      return;
    }
    dispatch(influxdbAction.listRP(server, database));
    dispatch(influxdbAction.listMeasurement(server, database));
    if (!measurement) {
      return;
    }
    dispatch(influxdbAction.listTagInfos(server, database, measurement));
    dispatch(influxdbAction.listField(server, database, measurement));
  }
  clearError() {
    this.setState({
      error: '',
    });
  }
  hideSelector() {
    const state = this.state;
    const data = {};
    _.forEach(['showBasicSelector', 'showGroupSelector', 'showDateTimeSelector'], key => {
      if (state[key]) {
        data[key] = false;
      }
    });
    if (!_.isEmpty(data)) {
      this.setState(data);
    }
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
    );
  }
  renderSubmitDialog() {
    const { dispatch } = this.props;
    const data = this.getConfigure();
    return (
      <VisualizationSaveDialog
        onClose={() => this.setState({
          showSubmitDialog: false,
        })}
        orginalData={this.props.data}
        dispatch={dispatch}
        data={data}
      />
    );
  }
  renderExtraSelector() {
    const { hideEmptyPoint, orderByTime } = this.state;
    const conf = this.props.data;
    const emptyPointCls = {
      fa: true,
    };
    if (!hideEmptyPoint) {
      emptyPointCls['fa-square-o'] = true;
    } else {
      emptyPointCls['fa-check-square-o'] = true;
    }
    return (
      <div className="extraSelector">
        <label>Extra Setting</label>
        <RadioSelector
          className="item"
          desc={'stats view:'}
          options={STATS_VIEW_TYPES}
          selected={this.state.statsView}
          onSelect={option => {
            if (this.state.statsView !== option) {
              this.setState({
                statsView: option,
              });
            }
          }}
        />
        <RadioSelector
          className="item"
          desc={'order by time:'}
          options={['asc', 'desc']}
          selected={orderByTime}
          onSelect={option => {
            if (this.state.orderByTime !== option) {
              this.setState({
                orderByTime: option,
              });
            }
          }}
        />
        <div
          className="hideEmptyPoint item"
        >table view:
          <a
            href="#"
            className="mleft5"
            onClick={e => {
              e.preventDefault();
              this.setState({
                hideEmptyPoint: !this.state.hideEmptyPoint,
              });
            }}
          >
            <i className={classnames(emptyPointCls)} aria-hidden="true"></i>
            Hide Empty Point
          </a>
        </div>
        <div className="acess item">
          <span className="pullLeft">access:</span>
          <div
            style={{
              marginLeft: '60px',
            }}
          >
            <input
              style={{
                width: '100%',
              }}
              defaultValue={_.get(conf, 'access')}
              type="text"
              ref="access"
              onChange={() => {
                const access = this.refs.access.value || '';
                this.setState({
                  access,
                });
              }}
              placeholder="The Access of Configure"
            />
          </div>
        </div>
        {this.renderShowFieldSelector()}
        <a
          className="pure-button pure-button-primary submit"
          href="#"
          onClick={e => {
            e.preventDefault();
            this.setState({
              showSubmitDialog: true,
            });
          }}
        >
          {conf ? 'Update' : 'Save'}
        </a>
      </div>
    );
  }
  renderShowFieldSelector() {
    const { server, database, measurement } = this.state;
    const tagInfos = _.get(this, `props.influxdbServer.tagInfos[${server + database + measurement}]`);
    const fields = _.get(this, `props.influxdbServer.fields[${server + database + measurement}]`);
    if (!fields) {
      return null;
    }
    const arr = fields.concat(_.map(tagInfos, item => item.tag));
    const showFields = this.state.fields;
    const list = _.map(arr, v => {
      const cls = {
        fa: true,
      };
      if (_.indexOf(showFields, v) === -1) {
        cls['fa-square-o'] = true;
      } else {
        cls['fa-check-square-o'] = true;
      }
      return (
        <li
          key={v}
        >
          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              const cloneFields = this.state.fields.slice(0);
              const index = _.indexOf(cloneFields, v);
              if (index !== -1) {
                cloneFields.splice(index, 1);
              } else {
                cloneFields.push(v);
              }
              this.setState({
                fields: cloneFields,
              });
            }}
          >
            <i className={classnames(cls)} aria-hidden="true"></i>
            {v}
          </a>
        </li>
      );
    });
    return (
      <ul
        className="fieldShowSelector"
      >
        <li>Fields:</li>
        {list}
      </ul>
    );
  }
  renderGroupSeelctor() {
    const { groupSelectorCount, showGroupSelector } = this.state;
    if (!showGroupSelector) {
      return null;
    }
    const groupArr = [];
    for (let i = 0; i < groupSelectorCount; i++) {
      groupArr.push(this.renderGroupbySelector(i));
    }
    groupArr.push(this.renderGroupbyTimeSelector());
    return (
      <div
        className="groupBySelector"
        onClick={e => {
          e.disableToggle = true;
          e.preventDefault();
        }}
      >
        {groupArr}
      </div>
    );
  }
  renderExtractSelecotr() {
    const { extractSelectorCount } = this.state;
    const arr = [];
    for (let i = 0; i < extractSelectorCount; i++) {
      arr.push(this.renderFieldKeySelector(i));
    }
    return (
      <div className="extractSelector">
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
          {this.renderGroupSeelctor()}
        </div>
      </div>
    );
  }
  renderDatePickerSelector() {
    const arr = _.map(['start', 'end'], key => (
      <div className="pure-u-1-2">
        <DateTimePicker
          onSelect={value => {
            this.setDateTimeValue(value, key);
            this.clearError();
          }}
        />
      </div>
    ));
    return (
      <div
        className="datePickerSelector pure-g"
        onClick={e => {
          e.disableToggle = true;
          e.preventDefault();
        }}
      >
        {arr}
        <a
          href="#"
          className="pure-button pure-u-1 apply"
          onClick={e => this.setDate(e)}
        >
          Apply
        </a>
      </div>
    );
  }
  renderTimeSelector() {
    const arr = ['now', 'now'];
    const { start, end } = this.state.date;
    if (start) {
      arr[0] = start;
    }
    if (end) {
      arr[1] = end;
    }
    const defaultValue = this.state.offsetTime;
    return (
      <Select
        value={defaultValue}
        options={OFFSET_TIME_LIST}
        onChange={item => {
          const value = (item && item.value) || '';
          const data = {};
          if (value && value === 'Custom') {
            data.showDateTimeSelector = true;
          } else {
            data.offsetTime = value;
          }
          this.setState(data);
        }}
      />
    );
  }
  renderFilterSelector() {
    const { conditionSelectorCount } = this.state;
    const arr = [];
    for (let i = 0; i < conditionSelectorCount; i++) {
      arr.push(this.renderTagKeySelector(i));
    }
    return (
      <div className="filterSelector">
        <label>Filter By</label>
        {this.renderMeasurementSelector()}
        {arr}
      </div>
    );
  }
  renderBasicSelector() {
    const { showBasicSelector } = this.state;
    if (!showBasicSelector) {
      return null;
    }
    return (
      <div
        className="basicSelector"
        onClick={e => {
          e.disableToggle = true;
          e.preventDefault();
        }}
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
    );
  }
  renderEchartSetting() {
    return (
      <div className="echartSetting">
        <label>Echart Settng</label>
        <div className="xAxisSetting">
          <span className="pullLeft">yAxis:</span>
          <div className="pure-g">
            <div className="pure-u-1-2">
              <input type="number" placeholder="min" />
            </div>
            <div className="pure-u-1-2">
              <input type="number" placeholder="max" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  renderQueryBar() {
    const { showDateTimeSelector } = this.state;
    return (
      <div
        className="queryBarContainer"
      >
        <a
          onClick={e => this.onClickToggle(e, 'basicSelector')}
          href="#"
          className="pure-button pullLeft tac showServerSelector"
        >
          <i className="fa fa-server" aria-hidden="true"></i>
        </a>
        <div className="pullRight timeSelectorContainer">
          {this.renderTimeSelector()}
        </div>
        <div
          className="influxQl"
        >
          <input
            readOnly
            style={{
              width: '100%',
              padding: '9px',
            }}
            value={this.getInfluxQL()}
            placeholder="it will create influx ql auto"
            type="text"
          />
        </div>
        {showDateTimeSelector && this.renderDatePickerSelector()}
      </div>
    );
  }
  renderSelecotr(opts) {
    const { pickKey, key } = opts;
    const defaultConvert = item => ({
      label: item,
      value: item,
    });
    const convert = opts.convert || defaultConvert;
    const onChange = opts.onChange || _.noop;

    const data = _.get(this, pickKey, []);
    const options = _.map(data, convert);
    return (
      <Select
        className="influxdbSelector"
        options={options}
        value={this.state[key]}
        placeholder={opts.placeholder}
        onChange={item => {
          const tmp = {};
          if (!item) {
            tmp[key] = '';
            this.setState(tmp);
            return;
          }
          tmp[key] = item.value;
          this.setState(tmp);
          onChange(item);
        }}
      />
    );
  }
  renderTagKeySelector(index) {
    const { server, database, measurement, conditions } = this.state;
    const key = `props.influxdbServer.tagInfos[${server + database + measurement}]`;
    const tagInfos = _.get(this, key);
    const keys = _.map(tagInfos, item => item.tag);
    const condition = conditions[index];
    const found = _.find(tagInfos, item => item.tag === (condition && condition.key));
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
    const { server, database, measurement, extracts } = this.state;
    const key = `props.influxdbServer.fields[${server + database + measurement}]`;
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
    const { server, database, measurement, groups } = this.state;
    const key = `props.influxdbServer.tagInfos[${server + database + measurement}]`;
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
    const options = _.map('10s 30s 1m 5m 10m 15m 30m 1h 2h 6h 12h 1d 2d 7d 30d'.split(' '), v => ({
      label: v,
      value: v,
    }));
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
    return (
      <ParallelSelector
        hidden={hidden}
        key={id || uuid.v4()}
        keys={keys || []}
        values={values || []}
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
        toggleType={index === 0 ? 'add' : 'remove'}
        onToggle={type => {
          const list = this.state[listKey];
          const count = this.state[countKey];
          const data = {};
          data[countKey] = count + 1;
          if (type === 'remove') {
            data[countKey] = count - 1;
            const clone = list.slice(0);
            clone.splice(index, 1);
            data[listKey] = clone;
          }
          this.setState(data);
          this.clearError();
        }}
      />
    );
  }
  renderMeasurementSelector() {
    const { server, database } = this.state;
    const { dispatch } = this.props;
    return this.renderSelecotr({
      pickKey: `props.influxdbServer.measurements[${server + database}]`,
      key: 'measurement',
      placeholder: 'Select a measurement',
      onChange: item => {
        dispatch(influxdbAction.listTagInfos(server, database, item.value))
          .catch(this.setError.bind(this));
        dispatch(influxdbAction.listField(server, database, item.value))
          .catch(this.setError.bind(this));
        this.clearError();
      },
    });
  }
  renderRPSelector() {
    const { server, database } = this.state;
    return this.renderSelecotr({
      pickKey: `props.influxdbServer.rps[${server + database}]`,
      key: 'rp',
    });
  }
  renderDatabaseSelector() {
    const { server } = this.state;
    const { dispatch } = this.props;
    return this.renderSelecotr({
      pickKey: `props.influxdbServer.databases[${server}]`,
      key: 'database',
      onChange: item => {
        dispatch(influxdbAction.listRP(server, item.value))
          .catch(this.setError.bind(this));
        dispatch(influxdbAction.listMeasurement(server, item.value))
          .catch(this.setError.bind(this));
        this.clearError();
      },
    });
  }
  renderServerSelector() {
    const { dispatch } = this.props;
    const convert = item => ({
      label: item.name,
      /* eslint no-underscore-dangle:0 */
      value: item._id,
    });
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
  renderStatsView() {
    const { dispatch } = this.props;
    const state = this.state;
    if (!this.getInfluxQL()) {
      return null;
    }
    return (
      <InfluxdbVisualizationView
        disableViewSelector
        dispatch={dispatch}
        configure={this.getConfigure()}
        type={state.statsView}
      />
    );
  }
  render() {
    const { showSubmitDialog, echart } = this.state;
    return (
      <div
        className="influxdbVisualizationEditor"
        onClick={e => {
          if (!e.disableToggle) {
            this.hideSelector();
          }
          delete e.disableToggle;
        }}
      >
        {this.renderQueryBar()}
        {this.renderBasicSelector()}
        <div className="pure-g">
          <div className="pure-u-1-4">
            {this.renderFilterSelector()}
          </div>
          <div className="pure-u-1-4">
            {this.renderExtractSelecotr()}
          </div>
          <div className="pure-u-1-4">
            <EchartSetting
              setting={echart}
              onChange={data => this.setState({
                echart: data,
              })}
            />
          </div>
          <div className="pure-u-1-4">
            {this.renderExtraSelector()}
          </div>
        </div>
        {this.renderStatsView()}
        {this.renderErrorTips()}
        {showSubmitDialog && this.renderSubmitDialog()}
      </div>
    );
  }
}

InfluxdbVisualizationEditor.propTypes = {
  dispatch: PropTypes.func.isRequired,
  data: PropTypes.object,
};

export default InfluxdbVisualizationEditor;
