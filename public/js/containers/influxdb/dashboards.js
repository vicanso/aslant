import React, { PropTypes } from 'react';
import moment from 'moment';
import * as _ from 'lodash';

import InfluxTable from '../../components/influx-table';
import * as dashboardAction from '../../actions/dashboard';
import {
  VIEW_INFLUX_DASHBOARD,
  VIEW_INFLUX_EDIT_DASHBOARD,
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
    } = this.props;
    const arr = _.map(dashboards, (dashboard) => {
      /* eslint no-underscore-dangle:0 */
      const id = dashboard._id;
      const viewUrl = VIEW_INFLUX_DASHBOARD.replace(':id', id);
      const editUrl = VIEW_INFLUX_EDIT_DASHBOARD.replace(':id', id);
      const updatedAt = moment(dashboard.updatedAt).format('YYYY-MM-DD HH:mm:ss');
      return (
        <tr key={id}>
          <td>{dashboard.name}</td>
          <td>{updatedAt}</td>
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
              onClick={handleLink(editUrl)}
            >
              <span className="pt-icon-standard pt-icon-edit" />
            </a>
            <a
              href="javascript:;"
              onClick={e => this.confirmToRemove(e, dashboard)}
            >
              <span className="pt-icon-standard pt-icon-remove" />
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
  dispatch: PropTypes.func.isRequired,
  dashboards: PropTypes.array.isRequired,
  handleLink: PropTypes.func.isRequired,
  showError: PropTypes.func,
};

export default Dashboards;
