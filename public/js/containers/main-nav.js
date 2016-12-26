import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import * as _ from 'lodash';

import {
  VIEW_INFLUX_DASHBOARD,
  VIEW_ADD_DASHBOARD,
  VIEW_INFLUX_VISUALIZATION,
  VIEW_ADD_INFLUX,
  VIEW_ABOUT,
} from '../constants/urls';

class MainNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: '',
      subActive: '',
      minimize: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    const {
      navigation,
    } = nextProps;
    const location = navigation.location;

    this.setState({
      location,
      active: location === VIEW_ABOUT ? 'about' : this.state.active,
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
          <ul>
            <li
              style={{
                paddingLeft: '15px',
              }}
            >
              Loading...
            </li>
          </ul>
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
      const sortItems = _.sortBy(items, item => item.name);
      const arr = _.map(sortItems, (item) => {
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
    let itemHref = 'javascript:;';
    let itemOnClick = () => {
      this.setState({
        active: type,
      });
    };
    if (hasChild === false && viewUrl) {
      itemHref = viewUrl;
      const fn = handleLink(viewUrl);
      itemOnClick = (e) => {
        fn(e);
        this.setState({
          active: type,
        });
      };
    }
    return (
      <li
        className={classnames(cls)}
        key={type}
      >
        <a
          href={itemHref}
          onClick={itemOnClick}
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
  renderNav() {
    const renderAbout = () => this.renderList(null, {
      type: 'about',
      name: 'About',
      icon: 'pt-icon-applications',
      viewUrl: VIEW_ABOUT,
      hasChild: false,
    });
    return (
      <ul
        className="navigation"
      >
        { this.renderDashboards() }
        { this.renderConfigs() }
        {
          renderAbout()
        }
      </ul>
    );
  }
  render() {
    const {
      onToggle,
      hidden,
    } = this.props;
    const cls = {
      'main-nav': true,
    };
    const iconCls = {
      'pt-icon-standard': true,
    };
    if (hidden) {
      cls.minimize = true;
      iconCls['pt-icon-maximize'] = true;
    } else {
      iconCls['pt-icon-minimize'] = true;
    }
    return (
      <div className={classnames(cls)}>
        <a
          href="javascript:;"
          className="toggle-nav tac"
          onClick={() => {
            onToggle(!hidden);
          }}
        >
          <span className={classnames(iconCls)} />
        </a>
        {
          !hidden && this.renderNav()
        }
      </div>
    );
  }
}


MainNav.propTypes = {
  dashboards: PropTypes.array,
  handleLink: PropTypes.func.isRequired,
  configs: PropTypes.array,
  onToggle: PropTypes.func.isRequired,
  hidden: PropTypes.bool.isRequired,
};

export default MainNav;
