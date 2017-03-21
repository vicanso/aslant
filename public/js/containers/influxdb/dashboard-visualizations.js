import React, { PropTypes, Component } from 'react';
import * as _ from 'lodash';
import classnames from 'classnames';
import {
  Position,
} from '@blueprintjs/core';
import moment from 'moment';

import DateTimeRangePicker from '../../components/date-time-range-picker';
import DropdownSelector from '../../components/dropdown-selector';
import InfluxVisualizationView from './visualization';
import * as influxdbService from '../../services/influxdb';
import {
  CHART_WIDTHS,
  AUTO_REFRESH_INTERVALS,
  TIME_INTERVALS,
} from '../../constants/common';

function getTimeDesc(time) {
  if (!time) {
    return null;
  }
  return (
    <span className="mright10 time-range">
      <span className="pt-icon-calendar mright5" />
      (
      {time.start || 'unlimited'}
      <span
        style={{
          margin: '0 3px',
        }}
      >
        -
      </span>
      {time.end || 'now'}
      )
    </span>
  );
}

class DashboardVisualizations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interval: 0,
      forceUpdatedAtList: [],
      fullScreenList: [],
      showDateTimePicker: false,
    };
  }
  componentDidMount() {
    const {
      dashboard,
    } = this.props;
    if (_.get(dashboard, 'configs.length')) {
      this.getData(dashboard);
    }
  }
  componentWillReceiveProps(nextProps) {
    const id = _.get(this.props, 'dashboard._id');
    const dashboard = nextProps.dashboard;
    /* eslint no-underscore-dangle:0 */
    if (!dashboard || id === dashboard._id) {
      return;
    }
    this.getData(dashboard);
  }
  getData(dashboard) {
    const {
      showError,
    } = this.props;
    influxdbService.listConfigByIds(dashboard.configs).then((configs) => {
      this.setState({
        configs: _.sortBy(configs, config => _.indexOf(dashboard.configs, config._id)),
      });
    }).catch(showError);
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
  renderVisualizations() {
    const {
      showError,
      setting,
    } = this.props;
    const {
      configs,
      refreshInterval,
      time,
      forceUpdatedAtList,
      fullScreenList,
    } = this.state;
    if (!configs) {
      return null;
    }
    const arr = _.map(configs, (config, index) => {
      /* eslint no-underscore-dangle:0 */
      const id = config._id;
      const widthConfig = _.find(CHART_WIDTHS, item => item.width === config.view.width);
      const cls = {};
      const isFullScreen = !!fullScreenList[index];
      const fullScreenIconCls = {
        'pt-icon-standard': true,
      };
      if (isFullScreen) {
        cls['full-screen'] = true;
        cls['overflow-y'] = true;
        fullScreenIconCls['pt-icon-minimize'] = true;
      } else {
        cls[widthConfig.className] = true;
        fullScreenIconCls['pt-icon-maximize'] = true;
      }
      return (
        <div
          key={id}
          className={classnames(cls)}
        >
          <div
            className="influx-visualization-view"
          >
            <h3
              title={config.name}
            >
              <div
                className="pull-right"
                style={{
                  marginRight: '5px',
                }}
              >
                { getTimeDesc(config.time) }
                <a
                  href="javascript:;"
                  onClick={() => {
                    const clone = forceUpdatedAtList.slice(0);
                    clone[index] = Date.now();
                    this.setState({
                      forceUpdatedAtList: clone,
                    });
                  }}
                >
                  <span className="pt-icon-standard pt-icon-refresh" />
                </a>
                <a
                  href="javascript:;"
                  onClick={() => {
                    const clone = fullScreenList.slice(0);
                    clone[index] = !isFullScreen;
                    this.setState({
                      fullScreenList: clone,
                    });
                  }}
                >
                  <span className={classnames(fullScreenIconCls)} />
                </a>
              </div>
              {config.name}
            </h3>
            <InfluxVisualizationView
              forceUpdatedAt={forceUpdatedAtList[index]}
              fullScreen={fullScreenList[index]}
              interval={refreshInterval && refreshInterval.value}
              config={config}
              time={time}
              showError={showError}
              setting={setting}
            />
          </div>
        </div>
      );
    });
    return arr;
  }
  render() {
    const {
      dashboard,
    } = this.props;
    if (!dashboard) {
      return (
        <p className="pt-callout pt-icon-automatic-updates margin15">Loading...</p>
      );
    }
    const {
      refreshInterval,
      time,
    } = this.state;
    return (
      <div className="influx-dashboard-visualizations-wrapper">
        <div
          className="clearfix"
          style={{
            position: 'relative',
          }}
        >
          <div
            className="pull-right"
            style={{
              marginTop: '10px',
            }}
          >
            <div
              className="interval-selector"
              style={{
                height: '30px',
              }}
            >
              <DropdownSelector
                key={'auto-refresh-interval'}
                items={AUTO_REFRESH_INTERVALS}
                position={Position.BOTTOM}
                selected={refreshInterval}
                placeholder={'Choose refresh interval'}
                onSelect={(e, item) => {
                  this.setState({
                    refreshInterval: item,
                  });
                }}
              />
            </div>
            <div
              className="time-selector"
              style={{
                height: '30px',
              }}
            >
              <DropdownSelector
                key={'time-interval'}
                items={TIME_INTERVALS}
                position={Position.BOTTOM}
                selected={time && time.start}
                placeholder={'Choose time interval'}
                onSelect={(e, item) => {
                  if (item.value === 'custom') {
                    this.setState({
                      showDateTimePicker: true,
                    });
                    return;
                  }
                  this.setState({
                    time: {
                      start: item.value,
                    },
                  });
                }}
              />
            </div>
          </div>
          { this.renderDatetimePicker() }
        </div>
        <div
          className="clearfix"
          style={{
            margin: '0 8px 8px',
          }}
        >
          { this.renderVisualizations() }
        </div>
      </div>
    );
  }
}

DashboardVisualizations.propTypes = {
  dashboard: PropTypes.object,
  showError: PropTypes.func.isRequired,
  setting: PropTypes.object,
};

export default DashboardVisualizations;
