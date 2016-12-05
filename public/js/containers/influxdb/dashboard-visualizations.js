import React, { PropTypes, Component } from 'react';
import * as _ from 'lodash';
import classnames from 'classnames';

import InfluxVisualizationView from './visualization';
import * as influxdbService from '../../services/influxdb';
import {
  CHART_WIDTHS,
} from '../../constants/common';

class DashboardVisualizations extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
    } = this.state;
    if (!configs) {
      return null;
    }

    const arr = _.map(configs, (config) => {
      /* eslint no-underscore-dangle:0 */
      const id = config._id;
      const widthConfig = _.find(CHART_WIDTHS, item => item.width === config.view.width);
      const cls = {
        'visualization-wrapper': true,
      };
      cls[widthConfig.className] = true;
      return (
        <div
          key={id}
          className={classnames(cls)}
        >
          <h3>{config.name}</h3>
          <InfluxVisualizationView
            config={config}
            showError={showError}
          />
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
        { this.renderVisualizations() }
      </div>
    );
  }
}

DashboardVisualizations.propTypes = {
  dashboard: PropTypes.object,
  showError: PropTypes.func.isRequired,
};

export default DashboardVisualizations;
