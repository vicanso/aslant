import React, { PropTypes } from 'react';
import moment from 'moment';
import * as _ from 'lodash';
import {
  Switch,
} from '@blueprintjs/core';

import InfluxTable from '../../components/influx-table';
import * as serverAction from '../../actions/server';
import {
  VIEW_EDIT_SERVER,
  VIEW_SERVER_STATUS,
  VIEW_ADD_SERVER,
} from '../../constants/urls';

class Servers extends InfluxTable {
  constructor(props) {
    super(props);
    this.state = {};
  }
  remove(item) {
    /* eslint no-underscore-dangle:0 */
    const fn = serverAction.remove(item._id);
    super.remove(fn);
  }
  renderServers() {
    const {
      servers,
      handleLink,
    } = this.props;
    if (!servers || !servers.length) {
      return (
        <p
          className="tac"
        >
          There is not any server, please add one atleast.
          <a
            href={VIEW_ADD_SERVER}
            onClick={handleLink(VIEW_ADD_SERVER)}
          >Add</a>
        </p>
      );
    }
    const arr = _.map(servers, (server) => {
      /* eslint no-underscore-dangle:0 */
      const id = server._id;
      const editHref = VIEW_EDIT_SERVER.replace(':id', id);
      const statusHref = VIEW_SERVER_STATUS.replace(':id', id);
      const updatedAt = moment(server.updatedAt).format('YYYY-MM-DD HH:mm:ss');
      return (
        <tr key={id}>
          <td>{server.name}</td>
          <td>{server.host}</td>
          <td>{server.port}</td>
          <td
            className="switch-wrapper"
          >
            <Switch
              readOnly
              checked={server.ssl}
            />
          </td>
          <td>{server.username || '--'}</td>
          <td>{server.password || '--'}</td>
          <td>{updatedAt}</td>
          <td className="op">
            <a
              href={statusHref}
              onClick={handleLink(statusHref)}
            >
              <span className="pt-icon-standard pt-icon-database" />
            </a>
            <a
              href={editHref}
              onClick={handleLink(editHref)}
            >
              <span className="pt-icon-standard pt-icon-edit" />
            </a>
            <a
              href="javascript:;"
              onClick={e => this.confirmToRemove(e, server)}
            >
              <span className="pt-icon-standard pt-icon-remove" />
            </a>
          </td>
        </tr>
      );
    });
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Nick name</th>
            <th>Host</th>
            <th>Port</th>
            <th>SSL</th>
            <th>Username</th>
            <th>Password</th>
            <th>Updated At</th>
            <th>OP</th>
          </tr>
        </thead>
        <tbody>
          { arr }
        </tbody>
      </table>
    );
  }
  render() {
    return (
      <div className="influxdb-servers-wrapper">
        { this.renderServers() }
        { this.renderAlert() }
      </div>
    );
  }
}

Servers.propTypes = {
  dispatch: PropTypes.func.isRequired,
  servers: PropTypes.array.isRequired,
  handleLink: PropTypes.func.isRequired,
  showError: PropTypes.func,
};

export default Servers;
