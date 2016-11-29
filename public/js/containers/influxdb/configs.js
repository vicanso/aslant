import React, { PropTypes } from 'react';
import moment from 'moment';
import * as _ from 'lodash';
import classnames from 'classnames';

import InfluxTable from '../../components/influx-table';
import * as influxdbAction from '../../actions/influxdb';
import {
  VIEW_EDIT_INFLUX,
  VIEW_INFLUX_VISUALIZATION,
} from '../../constants/urls';
import {
  CHART_TYPES,
} from '../../constants/common';

function renderChartType(type) {
  const cls = {
    'pt-icon-standard': true,
  };
  const found = _.find(CHART_TYPES, item => item.type === type);
  if (!found) {
    return null;
  }
  cls[found.icon] = true;
  return (
    <span
      title={found.title}
      className={classnames(cls)}
    />
  );
}

class Configs extends InfluxTable {
  constructor(props) {
    super(props);
    this.state = {};
  }
  remove(item) {
    /* eslint no-underscore-dangle:0 */
    const fn = influxdbAction.removeConfig(item._id);
    super.remove(fn);
  }
  render() {
    const {
      configs,
      handleLink,
    } = this.props;
    const getTime = (time, key, defaultValue) => {
      if (!time) {
        return '--';
      }
      return time[key] || defaultValue;
    };
    const arr = _.map(configs, (item) => {
      /* eslint no-underscore-dangle:0 */
      const id = item._id;
      const editUrl = VIEW_EDIT_INFLUX.replace(':id', id);
      const viewUrl = VIEW_INFLUX_VISUALIZATION.replace(':id', id);
      const type = item.view && item.view.type;
      return (
        <tr
          key={id}
        >
          <td>{item.name}</td>
          <td>{moment(item.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</td>
          <td>{ renderChartType(type) }</td>
          <td>{item.view && item.view.width}</td>
          <td>
            { getTime(item.time, 'start', 'begin') }
            -
            { getTime(item.time, 'end', 'now()') }
          </td>
          <td>
            { _.get(item, 'groups.interval', '--') }
          </td>
          <td
            className="op"
          >
            <a
              href={editUrl}
              onClick={handleLink(editUrl)}
            >
              <span className="pt-icon-standard pt-icon-edit" />
            </a>
            <a
              href={viewUrl}
              onClick={handleLink(viewUrl)}
            >
              <span className="pt-icon-standard pt-icon-chart" />
            </a>
            <a
              href="javascript:;"
              onClick={e => this.confirmToRemove(e, item)}
            >
              <span className="pt-icon-standard pt-icon-remove" />
            </a>
          </td>
        </tr>
      );
    });
    return (
      <div className="influx-configs-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>UpdatedAt</th>
              <th>Type</th>
              <th>Width</th>
              <th>Time</th>
              <th>Interval</th>
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

Configs.propTypes = {
  dispatch: PropTypes.func.isRequired,
  configs: PropTypes.array.isRequired,
  handleLink: PropTypes.func.isRequired,
  showError: PropTypes.func,
};

export default Configs;
