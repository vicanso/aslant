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
  componentWillReceiveProps(nextProps) {
    const {
      showError,
    } = this.props;
    const id = _.get(this.props, 'dashboard._id');
    const dashboard = nextProps.dashboard;
    /* eslint no-underscore-dangle:0 */
    if (!dashboard || id === dashboard._id) {
      return;
    }
    influxdbService.listConfigByIds(dashboard.configs).then((configs) => {
      this.setState({
        configs,
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
