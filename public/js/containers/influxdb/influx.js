import React, { PropTypes, Component } from 'react';
import * as _ from 'lodash';
import InfluxQL from 'influx-ql';
import { Line } from 'dcharts';

import DropdownSelector from '../../components/dropdown-selector';
import * as influxdbService from '../../services/influxdb';
import CoDropdownSelector from '../../components/co-dropdown-selector';

function getClearItem(fn) {
  return (
    <div
      className="remove-condition"
    >
      <a
        href="javascript:;"
        onClick={() => fn()}
      >
        <i className="fa fa-times" aria-hidden="true" />
      </a>
    </div>
  );
}

class Influx extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dbs: [],
      db: '',
      rps: [],
      rp: '',
      measurements: [],
      measurement: '',
      tags: [],
      fields: [],
      tagValueDict: {},
      conditions: [],
      cals: [],
      time: {
        start: '',
        end: '',
      },
    };
  }
  componentWillUpdate(nextProps, nextState) {
    const {
      db,
      measurement,
      conditions,
      cals,
      rp,
      time,
    } = nextState;
    if (!db || !measurement) {
      return;
    }
    const ql = new InfluxQL(db);
    ql.measurement = measurement;
    ql.RP = rp.name;
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
      if (!v) {
        return;
      }
      if (k === 'start') {
        ql.start = v;
      } else {
        ql.end = v;
      }
    });
    this.ql.value = ql.toSelect();
  }
  onSelectDatabases(db) {
    const server = this.state.server;
    this.reset('db', db);
    /* eslint no-underscore-dangle:0 */
    const args = [server._id, db];
    influxdbService.showMeasurements(...args).then(measurements => this.setState({
      measurements: measurements.sort(),
    })).catch(console.error);
    influxdbService.showRps(...args).then(rps => this.setState({
      rps: rps.sort(),
    })).catch(console.error);
  }
  onSelectMeasurement(measurement) {
    const {
      server,
      db,
    } = this.state;
    this.reset('measurement', measurement);
    /* eslint no-underscore-dangle:0 */
    const args = [server._id, db, measurement];
    influxdbService.showSeries(...args).then((series) => {
      const tags = [];
      const tagValueDict = {};
      _.forEach(series, (str) => {
        _.forEach(str.split(',').slice(1), (item) => {
          const [tag, value] = item.split('=');
          if (_.indexOf(tags, tag) === -1) {
            tags.push(tag);
            tagValueDict[tag] = [];
          }
          if (_.indexOf(tagValueDict[tag], value) === -1) {
            tagValueDict[tag].push(value);
          }
        });
      });
      _.forEach(tagValueDict, (values, tag) => {
        tagValueDict[tag] = values.sort();
      });
      this.setState({
        tags,
        tagValueDict,
      });
    }).catch(console.error);
    influxdbService.showFieldKeys(...args).then((data) => {
      const fields = _.map(_.get(data, '[0].values'), item => item.key);
      this.setState({
        fields,
      });
    }).catch(console.error);
  }
  onSelectServer(server) {
    this.reset('server', server);
    influxdbService.showDatabases(server._id).then(dbs => this.setState({
      dbs: dbs.sort(),
    })).catch(console.error);
  }
  query() {
    const {
      server,
      db,
    } = this.state;
    const ql = this.ql.value;
    influxdbService.query(server._id, db, ql)
      .then(data => this.renderChart(data))
      .catch(console.error);
  }
  reset(type, value) {
    let state = null;
    switch (type) {
      case 'server':
        state = {
          server: value,
          dbs: [],
          db: '',
          rps: [],
          rp: '',
          measurements: [],
          measurement: '',
          tags: [],
          fields: [],
          tagValueDict: {},
          conditions: [],
          cals: [],
        };
        break;
      case 'db':
        state = {
          db: value,
          rps: [],
          rp: '',
          measurements: [],
          measurement: '',
          tags: [],
          fields: [],
          tagValueDict: {},
          conditions: [],
          cals: [],
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
        };
        break;
      default:
        state = {};
        break;
    }
    this.setState(state);
  }
  renderChart(data) {
    const chartData = influxdbService.toChartData(data);
    const line = new Line(this.chart);
    line.set({
      'xAxis.categories': chartData.categories,
    }).render(chartData.data);
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
    const times = [
      {
        name: 'Past 5 minutes',
        value: '-5m',
      },
      {
        name: 'Past 15 minutes',
        value: '-15m',
      },
      {
        name: 'Past 30 minutes',
        value: '-30m',
      },
      {
        name: 'Past hour',
        value: '-1h',
      },
      {
        name: 'Past 6 hours',
        value: '-6h',
      },
      {
        name: 'Past 12 hours',
        value: '-12h',
      },
      {
        name: 'Past 24 hours',
        value: '-24h',
      },
      {
        name: 'Past 2 days',
        value: '-2d',
      },
      {
        name: 'Past 7 days',
        value: '-7d',
      },
      {
        name: 'Past 30 days',
        value: '-30d',
      },
    ];
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
          onSelect={onSelect}
          selected={[time.start, time.end]}
        />
      </div>
    );
  }
  render() {
    const {
      servers,
    } = this.props;
    const {
      dbs,
      rps,
      measurements,
    } = this.state;
    return (
      <div className="add-influx-wrapper">
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
            className="pure-button pure-button-primary pull-right"
            onClick={() => this.query()}
          >
            Query
          </button>
          <div className="ql-input">
            <input
              type="text"
              ref={(c) => {
                this.ql = c;
              }}
            />
          </div>
        </div>
        <div
          className="chart-wrapper"
          ref={(c) => {
            this.chart = c;
          }}
        />
        <div className="config-wrapper">
          <h4>Influx Config</h4>
          <DropdownSelector
            placeholder={'Choose Server'}
            items={servers}
            onSelect={(e, item) => this.onSelectServer(item)}
          />
          <DropdownSelector
            placeholder={'Choose Database'}
            items={dbs}
            onSelect={(e, item) => this.onSelectDatabases(item)}
          />
          <DropdownSelector
            placeholder={'Choose RP'}
            items={rps}
            onSelect={(e, item) => this.setState({
              rp: item,
            })}
          />
          <DropdownSelector
            placeholder={'Choose Measurement'}
            items={measurements}
            onSelect={(e, item) => this.onSelectMeasurement(item)}
          />
          <h5>Filter By</h5>
          { this.renderTagSelectorList() }
          <h5>Extract By</h5>
          { this.renderFieldCalSelectorList() }
          <h5>Time</h5>
          { this.renderTimeSelector() }
        </div>
      </div>
    );
  }
}

Influx.propTypes = {
  dispatch: PropTypes.func.isRequired,
  servers: PropTypes.array.isRequired,
};

export default Influx;
