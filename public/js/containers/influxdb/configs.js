import React, { PropTypes } from 'react';
import moment from 'moment';
import * as _ from 'lodash';

import InfluxTable from '../../components/influx-table';
import * as influxdbAction from '../../actions/influxdb';
import {
  VIEW_EDIT_INFLUX,
} from '../../constants/urls';

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
    const arr = _.map(configs, (item) => {
      /* eslint no-underscore-dangle:0 */
      const id = item._id;
      const url = VIEW_EDIT_INFLUX.replace(':id', id);
      return (
        <tr
          key={id}
        >
          <td>{item.name}</td>
          <td>{moment(item.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</td>
          <td
            className="op"
          >
            <a
              href={url}
              onClick={handleLink(url)}
            >
              <span className="pt-icon-standard pt-icon-edit" />
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
              <th>OP</th>
            </tr>
          </thead>
          <tbody>
            { arr }
          </tbody>
        </table>
        { this.renderAlert() }
        { this.renderToaster() }
      </div>
    );
  }
}

Configs.propTypes = {
  dispatch: PropTypes.func.isRequired,
  configs: PropTypes.array.isRequired,
  handleLink: PropTypes.func.isRequired,
};

export default Configs;
