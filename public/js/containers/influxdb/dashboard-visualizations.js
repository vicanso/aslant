import React, { PropTypes, Component } from 'react';
import * as _ from 'lodash';
import classnames from 'classnames';
import {
  Position,
} from '@blueprintjs/core';

import DropdownSelector from '../../components/dropdown-selector';
import InfluxVisualizationView from './visualization';
import * as influxdbService from '../../services/influxdb';
import {
  CHART_WIDTHS,
  AUTO_REFRESH_INTERVALS,
  TIME_INTERVALS,
} from '../../constants/common';

class DashboardVisualizations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interval: 0,
      forceUpdatedAtList: [],
      fullScreenList: [],
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
  renderVisualizations() {
    const {
      showError,
    } = this.props;
    const {
      configs,
      interval,
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
            className="visualization-wrapper"
          >
            <h3>
              {config.name}
              <div
                className="pull-right"
                style={{
                  marginRight: '5px',
                }}
              >
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
            </h3>
            <InfluxVisualizationView
              forceUpdatedAt={forceUpdatedAtList[index]}
              fullScreen={fullScreenList[index]}
              interval={interval}
              config={config}
              time={time}
              showError={showError}
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
        <p className="tac">Loading...</p>
      );
    }
    return (
      <div className="influx-dashboard-visualizations-wrapper">
        <div className="clearfix">
          <div
            className="pull-right"
            style={{
              margin: '10px 0',
              height: '20px',
            }}
          >
            <div className="interval-selector">
              <DropdownSelector
                key={'auto-refresh-interval'}
                items={AUTO_REFRESH_INTERVALS}
                position={Position.BOTTOM}
                placeholder={'Choose refresh interval'}
                onSelect={(e, item) => {
                  this.setState({
                    interval: item.value,
                  });
                }}
              />
            </div>
            <div className="time-selector">
              <DropdownSelector
                key={'time-interval'}
                items={TIME_INTERVALS}
                position={Position.BOTTOM}
                placeholder={'Choose time interval'}
                onSelect={(e, item) => {
                  this.setState({
                    time: {
                      start: item.value,
                    },
                  });
                }}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            margin: '8px',
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
};

export default DashboardVisualizations;
