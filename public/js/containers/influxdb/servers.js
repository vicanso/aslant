import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import * as _ from 'lodash';

import * as influxdbAction from '../../actions/influxdb';
import {
  VIEW_EDIT_SERVER,
  VIEW_SERVER_STATUS,
  VIEW_ADD_SERVER,
} from '../../constants/urls';

class Servers extends Component {
  confirmToRemove(e, item) {
    const {
      confirm,
    } = this.props;
    e.preventDefault();

    confirm({
      content: `<p>Confirm to remove the server's config?(${item.name})</p>`,
    }, (type) => {
      if (type === 'confirm') {
        this.remove(item);
      }
    });
  }
  remove(item) {
    const {
      dispatch,
    } = this.props;
    /* eslint no-underscore-dangle:0 */
    dispatch(influxdbAction.remove(item._id)).then(() => {

    }).catch((err) => {
      console.error(err);
    });
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
          <td>{server.ssl}</td>
          <td>{server.username || '--'}</td>
          <td>{server.password || '--'}</td>
          <td>{updatedAt}</td>
          <td className="op">
            <a
              href={statusHref}
              onClick={handleLink(statusHref)}
            >
              <i className="fa fa-server" aria-hidden="true" />
            </a>
            <a
              href={editHref}
              onClick={handleLink(editHref)}
            >
              <i className="fa fa-pencil-square-o" aria-hidden="true" />
            </a>
            <a
              href="javascript:;"
              onClick={e => this.confirmToRemove(e, server)}
            >
              <i className="fa fa-times" aria-hidden="true" />
            </a>
          </td>
        </tr>
      );
    });
    return (
      <table className="pure-table">
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
      </div>
    );
  }
}

Servers.propTypes = {
  dispatch: PropTypes.func.isRequired,
  servers: PropTypes.array.isRequired,
  handleLink: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
};

export default Servers;
