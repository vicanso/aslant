'use strict';
/* eslint import/no-unresolved:0 */
import React, { PropTypes, Component } from 'react';
import * as _ from 'lodash';
import Server from '../components/server';
import * as navigationAction from '../actions/navigation';

class InfluxdbServerList extends Component {
  getServerList() {
    const { influxdbServer, dispatch, user } = this.props;
    const arr = _.map(influxdbServer.list, (item, i) => {
      /* eslint no-underscore-dangle:0 */
      const id = item._id;
      return (
        <Server
          key={id}
          data={item}
          index={i + 1}
          dispatch={dispatch}
          user={user}
        />
      );
    });
    return arr;
  }
  addServer(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(navigationAction.addServer());
  }
  render() {
    return (
      <div className="influxdbServerList">
        <table className="pure-table">
          <thead><tr>
            <th>#</th>
            <th>Nick Name</th>
            <th>Host</th>
            <th>Port</th>
            <th>SSL</th>
            <th>Group</th>
            <th>User Name(auth)</th>
            <th>User Name(password)</th>
            <th
              style={{
                width: '100px',
              }}
            >Operation</th>
          </tr></thead>
          <tbody>
            {this.getServerList()}
          </tbody>
        </table>
        <a
          href="#" onClick={e => this.addServer(e)}
          className="pure-button pure-button-primary"
          style={{
            display: 'block',
            marginTop: '15px',
          }}
        >
          <i className="fa fa-plus mright5" aria-hidden="true"></i>
          Add Server
        </a>
      </div>
    );
  }
}

InfluxdbServerList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  influxdbServer: PropTypes.object.isRequired,
};

export default InfluxdbServerList;
