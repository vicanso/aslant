import React, { Component, PropTypes } from 'react';
import moment from 'moment';

import {
  VIEW_EDIT_SERVER,
} from '../../constants/urls';

class Servers extends Component {
  constructor(props) {
    super(props);
  }
  renderServers() {
    const {
      servers,
      handleLink,
    } = this.props;
    if (!servers || !servers.length) {
      return null;
    }
    const arr = _.map(servers, (server) => {
      const id = server._id;
      const href = VIEW_EDIT_SERVER.replace(':id', id);
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
          <td>
            <a
              href={href}
              onClick={handleLink(href)}
            >
              <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
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
      <div className="influxdb-servers">
        { this.renderServers() }
      </div>
    );
  }
}

Servers.propTypes = {
  dispatch: PropTypes.func.isRequired,
  servers: PropTypes.array.isRequired,
  handleLink: PropTypes.func.isRequired,
};

export default Servers;
