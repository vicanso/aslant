import React, { PropTypes } from 'react';
import moment from 'moment';
import * as _ from 'lodash';
import classnames from 'classnames';

import InfluxTable from '../../components/influx-table';
import * as dashboardAction from '../../actions/dashboard';
import {
  VIEW_INFLUX_DASHBOARD,
  VIEW_INFLUX_EDIT_DASHBOARD,
  VIEW_ADD_DASHBOARD,
} from '../../constants/urls';

class Dashboards extends InfluxTable {
  constructor(props) {
    super(props);
    this.state = {};
  }
  remove(item) {
    /* eslint no-underscore-dangle:0 */
    const fn = dashboardAction.remove(item._id);
    super.remove(fn);
  }
  render() {
    const {
      dashboards,
      handleLink,
      user,
    } = this.props;
    if (!dashboards) {
      return (
        <p className="pt-callout pt-icon-automatic-updates margin15">Loading...</p>
      );
    }
    if (!dashboards.length) {
      return (
        <p className="pt-callout pt-intent-primary pt-icon-info-sign margin15">
          There is no influx dashboard, please add one first.
          <a
            className="mleft10"
            href={VIEW_ADD_DASHBOARD}
            onClick={handleLink(VIEW_ADD_DASHBOARD)}
          >Add</a>
        </p>
      );
    }
    const arr = _.map(dashboards, (dashboard) => {
      /* eslint no-underscore-dangle:0 */
      const id = dashboard._id;
      const isOwner = dashboard.account === user.account;
      const viewUrl = VIEW_INFLUX_DASHBOARD.replace(':id', id);
      const editUrl = isOwner ? VIEW_INFLUX_EDIT_DASHBOARD.replace(':id', id) : 'javascript:;';
      const updatedAt = moment(dashboard.updatedAt).format('YYYY-MM-DD HH:mm:ss');
      const editCls = {
        'pt-icon-standard': true,
        'pt-icon-edit': true,
        disabled: !isOwner,
      };
      const removeCls = {
        'pt-icon-standard': true,
        'pt-icon-remove': true,
        disabled: !isOwner,
      };
      return (
        <tr key={id}>
          <td>{dashboard.name}</td>
          <td>{updatedAt}</td>
          <td>{dashboard.group || 'personal'}</td>
          <td>{dashboard.account}</td>
          <td
            className="op"
          >
            <a
              href={viewUrl}
              onClick={handleLink(viewUrl)}
            >
              <span className="pt-icon-standard pt-icon-dashboard" />
            </a>
            <a
              href={editUrl}
              onClick={(e) => {
                if (!isOwner) {
                  return;
                }
                handleLink(editUrl)(e);
              }}
            >
              <span className={classnames(editCls)} />
            </a>
            <a
              href="javascript:;"
              onClick={(e) => {
                if (!isOwner) {
                  return;
                }
                this.confirmToRemove(e, dashboard);
              }}
            >
              <span className={classnames(removeCls)} />
            </a>
          </td>
        </tr>
      );
    });
    return (
      <div className="influxdb-dashboards-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Updated At</th>
              <th>Group</th>
              <th>Creator</th>
              <th>OP</th>
            </tr>
          </thead>
          <tbody>
            { arr }
          </tbody>
        </table>
        { this.renderAlert() }
      </div>
    );
  }
}


Dashboards.propTypes = {
  user: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  dashboards: PropTypes.array,
  handleLink: PropTypes.func.isRequired,
  showError: PropTypes.func,
};

export default Dashboards;
