import React, { PropTypes, Component } from 'react';
import * as _ from 'lodash';
import {
  Toaster,
  Position,
} from '@blueprintjs/core';
import moment from 'moment';

import DropdownSelector from '../../components/dropdown-selector';
import InfluxVisualizationView from './visualization';
import * as influxdbService from '../../services/influxdb';
import * as influxdbAction from '../../actions/influxdb';
import * as navigationAction from '../../actions/navigation';
import CoDropdownSelector from '../../components/co-dropdown-selector';
import DateTimeRangePicker from '../../components/date-time-range-picker';
import {
  VIEW_INFLUX_CONFIGS,
  VIEW_ADD_SERVER,
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

class Influx extends Component {
  constructor(props) {
    super(props);
    this.state = {
      server: '',
      dbs: [],
      database: '',
      rps: [],
      rp: '',
      fill: '',
      measurements: [],
      measurement: '',
      tags: [],
      fields: [],
      tagValueDict: {},
      tagConditions: [],
      fieldConditions: [],
      aggregations: [],
      groups: {},
      limit: 1000,
      offset: 0,
      order: '',
      time: {
        start: '',
        end: '',
      },
      view: {
        type: 'line',
        width: '12',
        height: '',
      },
      data: null,
      showDateTimePicker: false,
      customConditions: '',
      customFunctions: '',
    };
    this.showError = props.showError;
    this.inputs = {};
  }

  componentWillUpdate(nextProps, nextState) {
    const influxQL = influxdbService.getInfluxQL(nextState);
    if (this.ql) {
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
    this.setState({
      data: null,
      status: 'fetching',
    });
    influxdbService.query(server, database, ql)
      .then((data) => {
        this.setState({
          data,
          status: '',
        });
      })
      .catch((err) => {
        this.setState({
          status: '',
        });
        this.showError(err);
      });
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
          tagConditions: [],
          fieldConditions: [],
          aggregations: [],
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
          tagConditions: [],
          fieldConditions: [],
          aggregations: [],
          groups: {},
        };
        break;
      case 'measurement':
        state = {
          measurement: value,
          tags: [],
          fields: [],
          tagValueDict: {},
          tagConditions: [],
          fieldConditions: [],
          aggregations: [],
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
      fill: 'all',
    }).then((data) => {
      const result = _.pick(data, 'name token desc'.split(' '));
      _.forEach(this.state, (v, k) => {
        if (data[k] && data[k] !== v) {
          result[k] = data[k];
        }
      });
      if (data.series) {
        _.extend(result, influxdbService.formatSeries(data.series));
      }
      this.setState(result);
    }).catch(this.showError);
  }
  saveInfluxConfig() {
    const {
      dispatch,
      id,
    } = this.props;
    const keys = 'server database rp measurement fill limit offset tagConditions fieldConditions aggregations customConditions groups time view'.split(' ');
    const data = _.pick(this.state, keys);
    if (!data.customConditions) {
      delete data.customConditions;
    }
    if (_.isEmpty(data.groups)) {
      delete data.groups;
    }
    const name = this.influxName.value || '';
    data.name = name;
    data.desc = this.influxDesc.value || '';
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
  renderFieldFunctionList(isSmallWindow) {
    const {
      fields,
      aggregations,
    } = this.state;
    const cloneCals = aggregations.slice(0);
    if (!cloneCals.length || (_.last(cloneCals).aggregation && _.last(cloneCals).field)) {
      cloneCals.push({});
    }
    const selectorCount = cloneCals.length;
    const removeCondition = (index) => {
      const arr = aggregations.slice(0);
      arr.splice(index, 1);
      this.setState({
        aggregations: arr,
      });
    };
    let positions = null;
    if (isSmallWindow) {
      positions = [
        Position.RIGHT,
        Position.LEFT,
      ];
    }
    const calList = 'none count distinct integral mean median mode spread stddev sum bottom first last max min percentile sample top '.split(' ');
    return _.map(cloneCals, (calCondition, index) => {
      const {
        field,
        aggregation,
      } = calCondition;
      const itemsList = [
        fields,
        calList,
      ];
      const onSelect = (item, i) => {
        const arr = aggregations.slice(0);
        if (!arr[index]) {
          arr[index] = {};
        }
        if (i === 0) {
          arr[index].field = item;
        } else {
          arr[index].aggregation = item;
        }
        this.setState({
          aggregations: arr,
        });
      };
      let clearItem = null;
      if (index !== (selectorCount - 1)) {
        clearItem = getClearItem(() => {
          removeCondition(index);
        });
      }
      const key = `field-${index}-${field || ''}-${aggregation || ''}`;
      return (
        <div
          className="co-dropdown-selector-wrapper"
          key={key}
        >
          {
            clearItem
          }
          <CoDropdownSelector
            itemsList={itemsList}
            selected={[field, aggregation]}
            positions={positions}
            placeholders={['Choose Field', 'Choose Function']}
            onSelect={(item, i) => onSelect(item, i)}
          />
        </div>
      );
    });
  }
  renderCustomFunctionEditor() {
    const {
      customFunctions,
    } = this.state;
    return (
      <div>
        <h5>Custom Functions</h5>
        <textarea
          placeholder={'bottom("water_level",3) | count("water_level")'}
          style={{
            width: '100%',
            height: '60px',
            padding: '7px',
            fontSize: '14px',
          }}
          defaultValue={customFunctions}
          ref={(c) => {
            if (!c) {
              return;
            }
            this.customFunctionInput = c;
          }}
          onChange={() => {
            this.setState({
              customFunctions: this.customFunctionInput.value,
            });
          }}
        />
      </div>
    );
  }
  renderChartSetting(isSmallWindow) {
    const {
      view,
    } = this.state;
    const selectedChartType = _.find(CHART_TYPES, item => item.type === view.type);
    const selectedChartWidth = _.find(CHART_WIDTHS, item => item.width === view.width);
    const cloneView = _.extend({}, view);
    return (
      <div
        style={{
          display: 'flex',
        }}
      >
        <div className="mright5">
          <DropdownSelector
            key={'chart-type'}
            title="Choose chart type"
            placeholder={'Choose chart type'}
            items={CHART_TYPES}
            selected={selectedChartType}
            position={Position.RIGHT_BOTTOM}
            onSelect={(e, item) => {
              cloneView.type = item.type;
              this.setState({
                view: cloneView,
              });
            }}
          />
        </div>
        <div className="mleft5">
          <DropdownSelector
            key={'chart-width'}
            title="Choose chart width"
            placeholder={'Choose chart width'}
            items={CHART_WIDTHS}
            selected={selectedChartWidth}
            position={isSmallWindow ? Position.LEFT_BOTTOM : Position.RIGHT_BOTTOM}
            onSelect={(e, item) => {
              cloneView.width = item.width;
              this.setState({
                view: cloneView,
              });
            }}
          />
        </div>
        <div className="mleft5">
          <input
            type="number"
            title="View height"
            className="pt-input pt-fill"
            placeholder="View height"
            defaultValue={view.height}
            ref={(c) => {
              this.inputs.viewHeight = c;
            }}
            onChange={() => {
              const v = parseInt(this.inputs.viewHeight.value, 10);
              if (v) {
                cloneView.height = v;
                this.setState({
                  view: cloneView,
                });
              }
            }}
          />
        </div>
      </div>
    );
  }
  renderGroupSelectorList(defaultPosition) {
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
          position={defaultPosition}
          onClear={() => {
            delete groups.interval;
            this.setState({
              groups,
            });
          }}
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
          position={defaultPosition}
          selected={groups.tags}
          readOnly
          onClear={() => {
            delete groups.tags;
            this.setState({
              groups,
            });
          }}
          onSelect={(e, item) => {
            const groupTags = (groups.tags || []).slice(0);
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
  renderConditionSelectorList(options) {
    const {
      isSmallWindow,
      type,
      placeholders,
      getValues,
    } = options;
    const conditions = this.state[type].slice(0);
    if (!conditions.length || (_.last(conditions).key && _.last(conditions).value)) {
      conditions.push({});
    }
    const selectorCount = conditions.length;
    const removeCondition = (index) => {
      const arr = conditions.slice(0);
      arr.splice(index, 1);
      const result = {};
      result[type] = arr;
      this.setState(result);
    };
    let positions = null;
    if (isSmallWindow) {
      positions = [
        Position.RIGHT,
        Position.LEFT,
      ];
    }

    const operators = '= != > >= < <= =~ !~'.split(' ');

    return _.map(conditions, (condition, index) => {
      const {
        key,
        value,
        operator,
      } = condition;
      const itemsList = getValues(condition);
      const onSelect = (item, i, op) => {
        const arr = conditions.slice(0);
        if (i === 0) {
          arr[index] = {
            key: item,
          };
        } else if (i === 1) {
          arr[index].value = item;
        }
        arr[index].operator = op;
        const result = {};
        result[type] = arr;
        this.setState(result);
      };
      let clearItem = null;
      if (index !== (selectorCount - 1)) {
        clearItem = getClearItem(() => {
          removeCondition(index);
        });
      }
      const id = `condition-${index}-${key || ''}-${(value || '')}`;
      return (
        <div
          className="co-dropdown-selector-wrapper"
          key={id}
        >
          {
            clearItem
          }
          <CoDropdownSelector
            itemsList={itemsList}
            selected={[key, value]}
            positions={positions}
            relation={operators}
            selectedRelation={operator}
            placeholders={placeholders}
            onSelect={onSelect}
          />
        </div>
      );
    });
  }
  renderFieldSelectorList(isSmallWindow) {
    const {
      fields,
    } = this.state;
    return this.renderConditionSelectorList({
      isSmallWindow,
      type: 'fieldConditions',
      placeholders: ['Choose Field', 'Input field value'],
      getValues: () => [fields],
    });
  }
  renderTagSelectorList(isSmallWindow) {
    const {
      tags,
      tagValueDict,
    } = this.state;

    return this.renderConditionSelectorList({
      isSmallWindow,
      type: 'tagConditions',
      placeholders: ['Choose Tag', 'Choose Value'],
      getValues: (condition) => {
        const values = tagValueDict[condition.key] || [];
        return [
          tags,
          values,
        ];
      },
    });
  }
  renderCustomFilterEditor() {
    const {
      customConditions,
    } = this.state;
    return (
      <div>
        <h5>Custom Filter</h5>
        <textarea
          placeholder={'field=\'String\' and field = Number'}
          style={{
            width: '100%',
            height: '60px',
            padding: '7px',
            fontSize: '14px',
          }}
          defaultValue={customConditions}
          ref={(c) => {
            if (!c) {
              return;
            }
            this.customFilterInput = c;
          }}
          onChange={() => {
            this.setState({
              customConditions: this.customFilterInput.value,
            });
          }}
        />
      </div>
    );
  }
  renderDatetimePicker() {
    const {
      showDateTimePicker,
      time,
    } = this.state;
    if (!showDateTimePicker) {
      return null;
    }
    const getDate = (type) => {
      const value = _.get(time, type) || new Date();
      // not a date string
      if (_.isString(value) && value.length !== 24) {
        return new Date();
      }
      return moment(value).toDate();
    };
    return (
      <DateTimeRangePicker
        onSelect={(dateRange) => {
          this.setState({
            showDateTimePicker: false,
            time: {
              start: dateRange[0].toISOString(),
              end: dateRange[1].toISOString(),
            },
          });
        }}
        onClose={() => {
          this.setState({
            showDateTimePicker: false,
          });
        }}
        dateRange={[getDate('start'), getDate('end')]}
      />
    );
  }
  renderTimeSelector(isSmallWindow) {
    const times = TIME_INTERVALS;
    const {
      time,
    } = this.state;
    const cloneTime = _.extend({}, time);
    const onSelect = (item, index) => {
      if (item.value === 'custom') {
        this.setState({
          showDateTimePicker: true,
        });
        return;
      }
      if (index === 0) {
        cloneTime.start = item.value;
      } else {
        cloneTime.end = item.value;
      }
      this.setState({
        time: cloneTime,
      });
    };
    let positions = [
      Position.RIGHT_BOTTOM,
      Position.RIGHT_BOTTOM,
    ];
    if (isSmallWindow) {
      positions = [
        Position.RIGHT_BOTTOM,
        Position.LEFT_BOTTOM,
      ];
    }
    return (
      <div
        className="co-dropdown-selector-wrapper"
      >
        <CoDropdownSelector
          relation={['to']}
          itemsList={[times, times]}
          placeholders={['Start', 'End']}
          positions={positions}
          onSelect={onSelect}
          selected={[time.start, time.end]}
          onClear={(index) => {
            if (index === 0) {
              cloneTime.start = '';
            } else {
              cloneTime.end = '';
            }
            this.setState({
              time: cloneTime,
            });
          }}
        />
      </div>
    );
  }
  renderStatsView() {
    const {
      data,
      status,
    } = this.state;
    if (status === 'fetching') {
      return (
        <p className="tac mtop10">fetching...</p>
      );
    }
    if (!data) {
      return null;
    }
    return (
      <InfluxVisualizationView
        data={this.state}
        showError={this.props.showError}
        setting={this.props.setting}
      />
    );
  }
  renderOtherOptions(defaultPosition) {
    const {
      fill,
      offset,
      limit,
      order,
    } = this.state;
    return (
      <div className="other-options-wrapper">
        <div
          className="column-1-2"
          key="limit-option"
        ><div>
          <input
            placeholder="limit"
            type="number"
            className="pt-input pt-fill"
            defaultValue={limit}
            ref={(c) => {
              this.inputs.limitOption = c;
            }}
            onChange={() => {
              const v = parseInt(this.inputs.limitOption.value, 10);
              if (!v) {
                return;
              }
              this.setState({
                limit: v,
              });
            }}
          />
        </div></div>
        <div
          className="column-1-2"
          key="offset-option"
        ><div>
          <input
            placeholder="offset"
            type="number"
            className="pt-input pt-fill"
            defaultValue={offset}
            ref={(c) => {
              this.inputs.offsetOption = c;
            }}
            onChange={() => {
              const v = parseInt(this.inputs.offsetOption.value, 10);
              if (!v) {
                return;
              }
              this.setState({
                offset: v,
              });
            }}
          />
        </div></div>
        <div
          className="column-1-2"
          key="fill-option"
        ><div>
          <DropdownSelector
            placeholder={'Fill'}
            selected={fill}
            items={['linear', 'none', 'null', 'previous']}
            position={defaultPosition}
            onSelect={(e, item) => this.setState({
              fill: item,
            })}
            onChange={(e, value) => this.setState({
              fill: value,
            })}
            onClear={() => this.setState({
              fill: '',
            })}
          />
        </div></div>
        <div
          className="column-1-2"
          key="order-option"
        ><div>
          <DropdownSelector
            placeholder={'Order'}
            selected={order}
            items={['asc', 'desc']}
            position={defaultPosition}
            onClear={() => {
              this.setState({
                order: '',
              });
            }}
            onSelect={(e, item) => this.setState({
              order: item,
            })}
          />
        </div></div>
      </div>
    );
  }
  render() {
    const {
      servers,
      id,
      handleLink,
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
      desc,
    } = this.state;
    if (!servers) {
      return (
        <p className="pt-callout pt-icon-automatic-updates margin15">Loading...</p>
      );
    }
    if (!servers.length) {
      return (
        <div className="add-influx-wrapper">
          <p className="pt-callout pt-intent-primary pt-icon-info-sign margin15">
            There is no influx server, please add one first.
            <a
              className="mleft10"
              href={VIEW_ADD_SERVER}
              onClick={handleLink(VIEW_ADD_SERVER)}
            >Add</a>
          </p>
        </div>
      );
    }
    const sortedServers = _.sortBy(servers, item => item.name);
    if (!server && id) {
      this.restore(id);
      return (
        <div>
          <Toaster
            ref={(c) => {
              this.toaster = c;
            }}
          />
          <p className="pt-callout pt-icon-automatic-updates margin15">Loading...</p>
        </div>
      );
    }
    let selectedServer = server;
    if (_.isString(selectedServer)) {
      selectedServer = _.find(sortedServers, item => item._id === server);
    }
    let influxQL = '';
    if (id) {
      influxQL = influxdbService.getInfluxQL(this.state);
    }

    let defaultPosition;
    /* eslint no-undef:0 */
    const isSmallWindow = window.screen.width < 800;
    if (isSmallWindow) {
      defaultPosition = Position.BOTTOM;
    }
    return (
      <div className="add-influx-wrapper">
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
            items={sortedServers}
            selected={selectedServer}
            position={defaultPosition}
            onSelect={(e, item) => this.onSelectServer(item)}
          />
          <DropdownSelector
            placeholder={'Choose Database'}
            items={dbs}
            selected={database}
            position={defaultPosition}
            onSelect={(e, item) => this.onSelectDatabases(item)}
          />
          <DropdownSelector
            placeholder={'Choose RP'}
            items={rps}
            selected={rp}
            position={defaultPosition}
            onSelect={(e, item) => this.setState({
              rp: item,
            })}
          />
          <DropdownSelector
            placeholder={'Choose Measurement'}
            items={measurements}
            selected={measurement}
            position={defaultPosition || Position.RIGHT}
            onSelect={(e, item) => this.onSelectMeasurement(item)}
          />
          <h5>Filter By Tag</h5>
          { this.renderTagSelectorList(isSmallWindow) }
          <h5>Filter By Field </h5>
          { this.renderFieldSelectorList() }
          <h5>Functions</h5>
          { this.renderFieldFunctionList(isSmallWindow) }
          { this.renderCustomFunctionEditor() }
          { this.renderCustomFilterEditor() }
          <h5>Group By</h5>
          { this.renderGroupSelectorList(defaultPosition) }
          <h5>Time</h5>
          <div
            style={{
              position: 'relative',
              zIndex: '1',
            }}
          >
            { this.renderDatetimePicker() }
            { this.renderTimeSelector(isSmallWindow) }
          </div>
          <h5>Other Options</h5>
          { this.renderOtherOptions(defaultPosition) }
          <h5>Chart Setting</h5>
          { this.renderChartSetting(isSmallWindow) }
        </div>
        <div className="influx-content-wrapper">
          <div
            style={{
              margin: '15px',
            }}
          >
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
            <input
              style={{
                margin: '15px 0',
              }}
              ref={(c) => {
                this.influxDesc = c;
              }}
              defaultValue={desc}
              className="pt-fill pt-input"
              type="text"
              placeholder="Input influx description"
            />
            <div
              className="save"
            >
              <button
                className="pt-button pt-intent-primary pt-fill"
                onClick={() => this.saveInfluxConfig()}
              >Save</button>
            </div>
          </div>
          { this.renderStatsView() }
        </div>
      </div>
    );
  }
}

Influx.propTypes = {
  dispatch: PropTypes.func.isRequired,
  servers: PropTypes.array,
  showError: PropTypes.func.isRequired,
  id: PropTypes.string,
  handleLink: PropTypes.func.isRequired,
  setting: PropTypes.object,
};

export default Influx;
