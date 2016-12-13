import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import * as _ from 'lodash';

import {
  VIEW_INFLUX_DASHBOARD,
  VIEW_ADD_DASHBOARD,
  VIEW_INFLUX_VISUALIZATION,
  VIEW_ADD_INFLUX,
} from '../constants/urls';

class MainNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: '',
      subActive: '',
    };
  }
  componentWillReceiveProps(nextProps) {
    const {
      navigation,
    } = nextProps;
    const location = navigation.location;
    const hiddenUrls = [
      // add config
      '/influxdb/configs/add',
      // update config
      '/influxdb/configs/',
    ];
    const found = _.find(hiddenUrls, url => location.indexOf(url) !== -1);
    this.setState({
      hidden: !!found,
    });
  }
  renderList(items, options) {
    const {
      handleLink,
    } = this.props;
    const {
      active,
      subActive,
    } = this.state;
    const {
      type,
      addUrl,
      viewUrl,
      name,
      icon,
      hasChild,
    } = options;
    const cls = {
      active: active === type,
    };
    const iconCls = {
      'pt-icon-standard': true,
      mright5: true,
    };
    iconCls[icon] = true;
    const renderActiveIcon = (id) => {
      if (active !== type || subActive !== id) {
        return null;
      }
      return (
        <span className="pt-icon-chevron-right pt-icon-standard selected" />
      );
    };
    const renderSubItems = () => {
      if (!items && hasChild !== false) {
        return (
          <ul><li>Loading...</li></ul>
        );
      }
      if (hasChild === false) {
        return null;
      }
      if (!items.length) {
        return (
          <ul>
            <li>
              <a
                href={addUrl}
                onClick={handleLink(addUrl)}
              >
                <span className="pt-icon-standard pt-icon-plus" />
                Add
              </a>
            </li>
          </ul>
        );
      }
      const arr = _.map(items, (item) => {
        /* eslint no-underscore-dangle:0 */
        const id = item._id;
        const url = viewUrl.replace(':id', id);
        const fn = handleLink(url);
        return (
          <li key={id}>
            {
              renderActiveIcon(id)
            }
            <a
              href={url}
              onClick={(e) => {
                this.setState({
                  subActive: id,
                  active: type,
                });
                fn(e);
              }}
            >
              {item.name}
            </a>
          </li>
        );
      });
      return (
        <ul>
          { arr }
        </ul>
      );
    };

    return (
      <li
        className={classnames(cls)}
        key={type}
      >
        <a
          href="javascript:;"
          onClick={() => {
            this.setState({
              active: type,
            });
          }}
        >
          <span className={classnames(iconCls)} />
          { name }
        </a>
        {
          renderSubItems()
        }
      </li>
    );
  }
  renderDashboards() {
    const {
      dashboards,
    } = this.props;
    return this.renderList(dashboards, {
      type: 'dashboard',
      addUrl: VIEW_ADD_DASHBOARD,
      viewUrl: VIEW_INFLUX_DASHBOARD,
      name: 'Dashboards',
      icon: 'pt-icon-dashboard',
    });
  }
  renderConfigs() {
    const {
      configs,
    } = this.props;
    return this.renderList(configs, {
      type: 'config',
      addUrl: VIEW_ADD_INFLUX,
      viewUrl: VIEW_INFLUX_VISUALIZATION,
      name: 'Influx Configs',
      icon: 'pt-icon-horizontal-bar-chart',
    });
  }
  render() {
    const {
      hidden,
    } = this.state;
    if (hidden) {
      return null;
    }
    const renderAbout = () => this.renderList(null, {
      type: 'about',
      name: 'About',
      icon: 'pt-icon-applications',
      hasChild: false,
    });
    return (
      <div className="main-nav">
        <ul
          className="navigation"
        >
          { this.renderDashboards() }
          { this.renderConfigs() }
          {
            renderAbout()
          }
        </ul>
      </div>
    );
  }
}


MainNav.propTypes = {
  dashboards: PropTypes.array,
  handleLink: PropTypes.func.isRequired,
  configs: PropTypes.array,
};

export default MainNav;
