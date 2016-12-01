import React, { PropTypes, Component } from 'react';
import * as _ from 'lodash';
import moment from 'moment';
import InfluxQL from 'influx-ql';
import { Line, Bar } from 'dcharts';
import {
  Toaster,
  Position,
} from '@blueprintjs/core';

import DropdownSelector from '../../components/dropdown-selector';
import * as influxdbService from '../../services/influxdb';
import * as influxdbAction from '../../actions/influxdb';
import * as navigationAction from '../../actions/navigation';
import CoDropdownSelector from '../../components/co-dropdown-selector';
import Table from '../../components/table';
import {
  VIEW_INFLUX_CONFIGS,
} from '../../constants/urls';
import {
  CHART_TYPES,
  TIME_INTERVALS,
  GROUP_INTERVALS,
  CHART_WIDTHS,
} from '../../constants/common';

function getClearItem(fn) {
  return (
    <div
      className="remove-condition"
    >
      <a
        href="javascript:;"
        onClick={() => fn()}
      >
        <span className="pt-icon-standard pt-icon-cross" />
      </a>
    </div>
  );
}


function getInfluxQL(state) {
  const {
    database,
    measurement,
    conditions,
    cals,
    rp,
    time,
    groups,
  } = state;
  if (!database || !measurement) {
    return '';
  }
  const ql = new InfluxQL(database);
  ql.measurement = measurement;
  ql.RP = _.get(rp, 'name', '');
  _.forEach(conditions, (item) => {
    const {
      tag,
      value,
    } = item;
    if (_.isUndefined(tag) || _.isUndefined(value)) {
      return;
    }
    ql.condition(tag, value);
  });
  _.forEach(cals, (item) => {
    const {
      cal,
      field,
    } = item;
    if (field) {
      if (!cal || cal === 'none') {
        ql.addField(field);
      } else {
        ql.addCalculate(cal, field);
      }
    }
  });
  _.forEach(time, (v, k) => {
    const timeValue = v;
    if (!timeValue) {
      return;
    }
    if (timeValue === 'today') {
      ql.start = moment().set({
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
      }).toISOString();
    } else if (timeValue === 'yesterday') {
      ql.end = moment()
        .set({
          hour: 23,
          minute: 59,
          second: 59,
          millisecond: 999,
        }).toISOString();
      ql.start = moment()
        .add('day', -1)
        .set({
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0,
        }).toISOString();
    } else if (k === 'start') {
      ql.start = timeValue;
    } else {
      ql.end = timeValue;
    }
  });
  if (groups.interval) {
    ql.addGroup(`time(${groups.interval})`);
  }
  if (groups.tags && groups.tags.length) {
    ql.addGroup(...groups.tags);
  }
  return ql.toSelect();
}

class Influx extends Component {
  constructor(props) {
    super(props);
    this.state = {
      server: '',
      dbs: [],
      database: '',
      rps: [],
      rp: '',
      measurements: [],
      measurement: '',
      tags: [],
      fields: [],
      tagValueDict: {},
      conditions: [],
      cals: [],
      groups: {},
      time: {
        start: '',
        end: '',
      },
      view: {
        type: 'line',
        width: '100%',
      },
    };
    this.showError = props.showError;
  }

  componentWillUpdate(nextProps, nextState) {
    const influxQL = getInfluxQL(nextState);
    if (influxQL && this.ql) {
      this.ql.value = influxQL;
    }
  }
  onSelectDatabases(database) {
    const server = this.state.server;
    this.reset('database', database);
    /* eslint no-underscore-dangle:0 */
    const args = [server, database];
    influxdbService.showMeasurements(...args).then(measurements => this.setState({
      measurements: measurements.sort(),
    })).catch(this.showError);
    influxdbService.showRps(...args).then(rps => this.setState({
      rps: rps.sort(),
    })).catch(this.showError);
  }
  onSelectMeasurement(measurement) {
    const {
      server,
      database,
    } = this.state;
    this.reset('measurement', measurement);
    /* eslint no-underscore-dangle:0 */
    const args = [server, database, measurement];
    influxdbService.showSeries(...args).then((series) => {
      const data = influxdbService.formatSeries(series);
      this.setState(data);
    }).catch(this.showError);
    influxdbService.showFieldKeys(...args).then((data) => {
      const fields = _.map(_.get(data, '[0].values'), item => item.key);
      this.setState({
        fields,
      });
    }).catch(this.showError);
  }
  onSelectServer(server) {
    const id = server._id;
    this.reset('server', id);
    influxdbService.showDatabases(id).then(dbs => this.setState({
      dbs: dbs.sort(),
    })).catch(this.showError);
  }
  query() {
    const {
      server,
      database,
    } = this.state;
    const ql = this.ql.value;
    if (!server || !database || !ql) {
      console.error('server, database and ql can not be null');
      return;
    }
    influxdbService.query(server, database, ql)
      .then((data) => {
        this.renderChart(data);
      })
      .catch(this.showError);
  }
  reset(type, value) {
    let state = null;
    switch (type) {
      case 'server':
        state = {
          server: value,
          dbs: [],
          database: '',
          rps: [],
          rp: '',
          measurements: [],
          measurement: '',
          tags: [],
          fields: [],
          tagValueDict: {},
          conditions: [],
          cals: [],
          groups: {},
        };
        break;
      case 'database':
        state = {
          database: value,
          rps: [],
          rp: '',
          measurements: [],
          measurement: '',
          tags: [],
          fields: [],
          tagValueDict: {},
          conditions: [],
          cals: [],
          groups: {},
        };
        break;
      case 'measurement':
        state = {
          measurement: value,
          tags: [],
          fields: [],
          tagValueDict: {},
          conditions: [],
          cals: [],
          groups: {},
        };
        break;
      default:
        state = {};
        break;
    }
    this.setState(state);
  }
  restore(id) {
    influxdbService.getConfig(id, {
      fill: true,
    }).then((data) => {
      const result = _.pick(data, 'name token'.split(' '));
      _.forEach(this.state, (v, k) => {
        if (data[k] && data[k] !== v) {
          result[k] = data[k];
        }
      });
      if (data.series) {
        _.extend(result, influxdbService.formatSeries(data.series));
      }
      result.name = data.name;
      this.setState(result);
    }).catch(this.showError);
  }
  saveInfluxConfig() {
    const {
      dispatch,
      id,
    } = this.props;
    const keys = 'server database rp measurement conditions cals groups time view'.split(' ');
    const data = _.pick(this.state, keys);

    const name = this.influxName.value;
    data.name = name;
    data.ql = this.ql.value;
    const emptyKeys = _.filter('name server database measurement'.split(' '), key => !data[key]);
    if (emptyKeys.length) {
      this.showError(`${emptyKeys.join(',')} can not be null`);
      return;
    }
    let fn;
    if (id) {
      fn = influxdbAction.updateConfig(id, this.state.token, data);
    } else {
      fn = influxdbAction.addConfig(data);
    }
    dispatch(fn)
      .then(() => dispatch(navigationAction.to(VIEW_INFLUX_CONFIGS)))
      .catch(this.showError);
  }
  renderChart(data) {
    const {
      chart,
    } = this;
    const {
      tags,
      cals,
      view,
    } = this.state;
    const chartView = (Fn) => {
      const chartData = influxdbService.toChartData(data, tags, cals);
      chart.innerHTML = '<svg></svg>';
      const item = new Fn(chart.children[0]);
      item.set({
        'xAxis.distance': 100,
        'xAxis.categories': chartData.categories,
      })
      .render(chartData.data);
    };
    switch (view.type) {
      case 'line': {
        chartView(Line);
        break;
      }
      case 'bar': {
        chartView(Bar);
        break;
      }
      default: {
        this.setState({
          tableData: influxdbService.toTableData(data, cals),
        });
      }
    }
  }
  renderFieldCalSelectorList() {
    const {
      fields,
      cals,
    } = this.state;
    const cloneCals = cals.slice(0);
    if (!cloneCals.length || (_.last(cloneCals).cal && _.last(cloneCals).field)) {
      cloneCals.push({});
    }
    const selectorCount = cloneCals.length;
    const removeCondition = (index) => {
      const arr = cals.slice(0);
      arr.splice(index, 1);
      this.setState({
        cals: arr,
      });
    };
    const calList = 'none count sum mean median min max spread stddev first last'.split(' ');
    return _.map(cloneCals, (calCondition, index) => {
      const {
        field,
        cal,
      } = calCondition;
      const itemsList = [
        fields,
        calList,
      ];
      const onSelect = (item, i) => {
        const arr = cals.slice(0);
        if (!arr[index]) {
          arr[index] = {};
        }
        if (i === 0) {
          arr[index].field = item;
        } else {
          arr[index].cal = item;
        }
        this.setState({
          cals: arr,
        });
      };
      let clearItem = null;
      if (index !== (selectorCount - 1)) {
        clearItem = getClearItem(() => {
          removeCondition(index);
        });
      }
      return (
        <div
          className="co-dropdown-selector-wrapper"
          key={index + field + cal}
        >
          {
            clearItem
          }
          <CoDropdownSelector
            itemsList={itemsList}
            selected={[field, cal]}
            placeholders={['Choose Field', 'Choose Function']}
            onSelect={(e, item, i) => onSelect(item, i)}
          />
        </div>
      );
    });
  }
  renderChartSetting() {
    const {
      view,
    } = this.state;
    const selectedChartType = _.find(CHART_TYPES, item => item.type === view.type);
    const selectedChartWidth = _.find(CHART_WIDTHS, item => item.width === view.width);
    return (
      <div className="pure-g">
        <div className="pure-u-1-2"><div className="mright5">
          <DropdownSelector
            key={'chart-type'}
            placeholder={'Choose chart type'}
            items={CHART_TYPES}
            selected={selectedChartType}
            position={Position.RIGHT_BOTTOM}
            onSelect={(e, item) => {
              view.type = item.type;
              this.setState({
                view,
              });
            }}
          />
        </div></div>
        <div className="pure-u-1-2"><div className="mleft5">
          <DropdownSelector
            key={'chart-width'}
            placeholder={'Choose chart width'}
            items={CHART_WIDTHS}
            selected={selectedChartWidth}
            position={Position.RIGHT_BOTTOM}
            onSelect={(e, item) => {
              view.width = item.width;
              this.setState({
                view,
              });
            }}
          />
        </div></div>
      </div>
    );
  }
  renderGroupSelectorList() {
    const {
      tags,
      groups,
    } = this.state;
    const intervalList = GROUP_INTERVALS;
    return (
      <div>
        <DropdownSelector
          key={'group-by-interval'}
          placeholder={'Choose group interval'}
          items={intervalList}
          selected={groups.interval}
          onSelect={(e, item) => {
            groups.interval = item;
            this.setState({
              groups,
            });
          }}
        />
        <DropdownSelector
          key={'group-by-tag'}
          placeholder={'Choose group tag'}
          items={tags}
          type={'multi'}
          selected={groups.tags}
          onSelect={(e, item) => {
            const groupTags = groups.tags || [];
            groups.tags = groupTags;
            const index = _.indexOf(groupTags, item);
            if (index === -1) {
              groupTags.push(item);
            } else {
              groupTags.splice(index, 1);
            }
            this.setState({
              groups,
            });
          }}
        />
      </div>
    );
  }
  renderTagSelectorList() {
    const {
      tags,
      tagValueDict,
      conditions,
    } = this.state;
    const cloneConditions = conditions.slice(0);
    if (!conditions.length || (_.last(conditions).tag && _.last(conditions).value)) {
      cloneConditions.push({});
    }
    const selectorCount = cloneConditions.length;
    const removeCondition = (index) => {
      const arr = conditions.slice(0);
      arr.splice(index, 1);
      this.setState({
        conditions: arr,
      });
    };
    return _.map(cloneConditions, (condition, index) => {
      const {
        tag,
        value,
      } = condition;
      const values = tagValueDict[condition.tag] || [];
      const itemsList = [
        tags,
        values,
      ];
      const onSelect = (item, i) => {
        const arr = conditions.slice(0);
        if (i === 0) {
          arr[index] = {
            tag: item,
          };
        } else {
          arr[index].value = item;
        }
        this.setState({
          conditions: arr,
        });
      };
      let clearItem = null;
      if (index !== (selectorCount - 1)) {
        clearItem = getClearItem(() => {
          removeCondition(index);
        });
      }
      return (
        <div
          className="co-dropdown-selector-wrapper"
          key={index + tag + value}
        >
          {
            clearItem
          }
          <CoDropdownSelector
            itemsList={itemsList}
            selected={[tag, value]}
            placeholders={['Choose Tag', 'Choose Value']}
            onSelect={(e, item, i) => onSelect(item, i)}
          />
        </div>
      );
    });
  }
  renderTimeSelector() {
    const times = TIME_INTERVALS;
    const {
      time,
    } = this.state;
    const onSelect = (e, item, index) => {
      if (index === 0) {
        time.start = item.value;
      } else {
        time.end = item.value;
      }
      this.setState({
        time,
      });
    };
    return (
      <div
        className="co-dropdown-selector-wrapper"
      >
        <CoDropdownSelector
          itemsList={[times, times]}
          placeholders={['Start', 'End']}
          positions={[Position.RIGHT_BOTTOM, Position.RIGHT_BOTTOM]}
          onSelect={onSelect}
          selected={[time.start, time.end]}
        />
      </div>
    );
  }
  renderStatsView() {
    const {
      view,
      tableData,
    } = this.state;
    if (this.chart) {
      this.chart.innerHTML = '';
    }
    if (view.type === 'table') {
      const arr = _.map(tableData, data => (
        <Table
          key={data.name}
          keys={data.keys}
          items={data.items}
        />
      ));
      return (
        <div
          className="table-wrapper"
        >
          { arr }
        </div>
      );
    }
    return (
      <div
        className="chart-wrapper"
        ref={(c) => {
          this.chart = c;
        }}
      />
    );
  }
  render() {
    const {
      servers,
      id,
    } = this.props;
    const {
      name,
      server,
      dbs,
      database,
      rps,
      rp,
      measurements,
      measurement,
    } = this.state;
    if (!server && id) {
      this.restore(id);
      return (
        <div>
          <Toaster
            ref={(c) => {
              this.toaster = c;
            }}
          />
          <p className="tac">正在加载中，请稍候...</p>
        </div>
      );
    }
    let selectedServer = server;
    if (_.isString(selectedServer)) {
      selectedServer = _.find(servers, item => item._id === server);
    }
    let influxQL = '';
    if (id) {
      influxQL = getInfluxQL(this.state);
    }

    return (
      <div className="add-influx-wrapper pure-g">
        <div className="pure-u-1-5">
          <div className="config-wrapper">
            <h4>Visualization Name</h4>
            <input
              className="visualization-name pt-input"
              type="text"
              placeholder="Pleace input visualization's name"
              defaultValue={name}
              ref={(c) => {
                this.influxName = c;
              }}
            />
            <h4>Influx Config</h4>
            <DropdownSelector
              placeholder={'Choose Server'}
              items={servers}
              selected={selectedServer}
              onSelect={(e, item) => this.onSelectServer(item)}
            />
            <DropdownSelector
              placeholder={'Choose Database'}
              items={dbs}
              selected={database}
              onSelect={(e, item) => this.onSelectDatabases(item)}
            />
            <DropdownSelector
              placeholder={'Choose RP'}
              items={rps}
              selected={rp}
              onSelect={(e, item) => this.setState({
                rp: item,
              })}
            />
            <DropdownSelector
              placeholder={'Choose Measurement'}
              items={measurements}
              selected={measurement}
              position={Position.RIGHT_TOP}
              onSelect={(e, item) => this.onSelectMeasurement(item)}
            />
            <h5>Filter By</h5>
            { this.renderTagSelectorList() }
            <h5>Extract By</h5>
            { this.renderFieldCalSelectorList() }
            <h5>Group By</h5>
            { this.renderGroupSelectorList() }
            <h5>Time</h5>
            { this.renderTimeSelector() }
            <h5>Chart Setting</h5>
            { this.renderChartSetting() }
          </div>
        </div>
        <div className="influx-content-wrapper pure-u-4-5">
          <div
            className="influx-ql-wrapper clearfix"
          >
            <span
              className="pull-left"
              style={{
                marginTop: '4px',
              }}
            >Influx QL</span>
            <button
              className="pt-button pt-intent-primary pull-right"
              onClick={() => this.query()}
            >
              Query
            </button>
            <div className="ql-input">
              <input
                className="pt-input"
                type="text"
                defaultValue={influxQL}
                ref={(c) => {
                  this.ql = c;
                }}
              />
            </div>
          </div>
          <div
            className="save"
            style={{
              margin: '15px',
            }}
          >
            <button
              className="pt-button pt-intent-primary pt-fill"
              onClick={() => this.saveInfluxConfig()}
            >Save</button>
          </div>
          { this.renderStatsView() }
        </div>
      </div>
    );
  }
}

Influx.propTypes = {
  dispatch: PropTypes.func.isRequired,
  servers: PropTypes.array.isRequired,
  showError: PropTypes.func.isRequired,
  id: PropTypes.string,
};

export default Influx;
