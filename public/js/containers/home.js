import React, { PropTypes, Component } from 'react';
import moment from 'moment';
import * as _ from 'lodash';

import {
  VIEW_ADD_DASHBOARD,
  VIEW_ADD_INFLUX,
  VIEW_INFLUX_DASHBOARD,
  VIEW_INFLUX_VISUALIZATION,
} from '../constants/urls';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderItems(items, type, urls) {
    const {
      handleLink,
    } = this.props;
    const {
      addUrl,
      viewUrl,
    } = urls;

    if (!items) {
      return (
        <p className="pt-callout pt-icon-automatic-updates margin15">Loading...</p>
      );
    }
    if (!items.length) {
      const tips = `There is no influx ${type}, please add one first.`;
      return (
        <p className="pt-callout pt-intent-primary pt-icon-info-sign margin15">
          { tips }
          <a
            className="mleft10"
            href={addUrl}
            onClick={handleLink(addUrl)}
          >Add</a>
        </p>
      );
    }
    const arr = _.map(items, (item) => {
      /* eslint no-underscore-dangle:0 */
      const id = item._id;
      const url = viewUrl.replace(':id', id);
      const updatedAt = moment(item.updatedAt).format('YYYY-MM-DD HH:mm:ss');
      const createdAt = moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss');
      const title = `Created by ${item.account} at ${createdAt}, updated at ${updatedAt}`;
      let infoItem = null;
      if (type === 'dashboard') {
        infoItem = (
          <div className="info">
            <span className="pt-icon-person mright5" />
            {item.account}
          </div>
        );
      }
      return (
        <div
          className="cloumn-wrapper"
          key={id}
        >
          <a
            className="column"
            href={url}
            onClick={handleLink(url)}
            title={title}
          >
            <h4>
              <span className="pt-icon-eye-open pull-right mright10" />
              {item.name}
            </h4>
            <p>{item.desc}</p>
            { infoItem }
          </a>
        </div>
      );
    });
    return (
      <div className="columns clearfix">
        { arr }
      </div>
    );
  }
  renderDashboards() {
    const {
      dashboards,
    } = this.props;
    return this.renderItems(dashboards, 'dashboard', {
      addUrl: VIEW_ADD_DASHBOARD,
      viewUrl: VIEW_INFLUX_DASHBOARD,
    });
  }
  renderConfigs() {
    const {
      configs,
    } = this.props;
    return this.renderItems(configs, 'config', {
      addUrl: VIEW_ADD_INFLUX,
      viewUrl: VIEW_INFLUX_VISUALIZATION,
    });
  }
  render() {
    return (
      <div
        className="home-wrapper"
      >
        <h3>Dashboards</h3>
        { this.renderDashboards() }
        <h3>Configs</h3>
        { this.renderConfigs() }
      </div>
    );
  }
}

Home.propTypes = {
  dashboards: PropTypes.array,
  configs: PropTypes.array,
  handleLink: PropTypes.func.isRequired,
};

export default Home;
