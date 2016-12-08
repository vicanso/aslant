import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import * as _ from 'lodash';

import {
  VIEW_INFLUX_DASHBOARD,
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
    this.setState({
      hidden: navigation.location.indexOf('/influxdb/configs/add') !== -1,
    });
  }
  renderDashboards() {
    const {
      dashboards,
      handleLink,
    } = this.props;
    const {
      active,
      subActive,
    } = this.state;
    const cls = {
      active: active === 'dashboard',
    };
    const arr = _.map(dashboards, (item) => {
      /* eslint no-underscore-dangle:0 */
      const id = item._id;
      const viewUrl = VIEW_INFLUX_DASHBOARD.replace(':id', id);
      const fn = handleLink(viewUrl);
      return (
        <li key={id}>
          {
            subActive === id && <span className="pt-icon-chevron-right pt-icon-standard selected" />
          }
          <a
            href={viewUrl}
            onClick={(e) => {
              this.setState({
                subActive: id,
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
      <li
        className={classnames(cls)}
      >
        <a
          href="javascript:;"
          onClick={() => {
            this.setState({
              active: 'dashboard',
              subActive: _.get(dashboards, '[0]._id'),
            });
          }}
        >
          <span className="pt-icon-dashboard pt-icon-standard mright5" />
          Dashboards
        </a>
        <ul>
          { arr }
        </ul>
      </li>
    );
  }
  render() {
    const {
      hidden,
    } = this.state;
    if (hidden) {
      return null;
    }
    return (
      <div className="main-nav">
        <ul
          className="navigation"
        >
          { this.renderDashboards() }
        </ul>
      </div>
    );
  }
}


MainNav.propTypes = {
  dashboards: PropTypes.array.isRequired,
  handleLink: PropTypes.func.isRequired,
};

export default MainNav;
