'use strict';
/* eslint import/no-unresolved:0 */
import React, { PropTypes, Component } from 'react';
import * as _ from 'lodash';
import classnames from 'classnames';
import * as navigationAction from '../actions/navigation';

class ServerItem extends Component {
  onModify(e, id) {
    const { dispatch } = this.props;
    e.preventDefault();
    dispatch(navigationAction.editServer(id));
  }
  render() {
    const { data, index } = this.props;
    const trClass = {};
    if (index % 2 === 0) {
      trClass['pure-table-odd'] = true;
    }
    const sslClass = {
      fa: true,
    };
    if (data.ssl) {
      sslClass['fa-check-square'] = true;
    } else {
      sslClass['fa-square-o'] = true;
    }
    return (
      <tr className={classnames(trClass)}>
        <td>{index}</td>
        <td>{data.name}</td>
        <td>{data.host}</td>
        <td>{data.port}</td>
        <td><i className={classnames(sslClass)} aria-hidden="true"></i></td>
        <td>{data.group || ''}</td>
        <td>{data.user || ''}</td>
        <td>{data.password || ''}</td>
        <td>
          <a href="#" className="op" onClick={e => this.onModify(e, data._id)}>
            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
          </a>
          <a href="#" className="op">
            <i className="fa fa-times" aria-hidden="true"></i>
          </a>
        </td>
      </tr>
    );
  }
}

ServerItem.propTypes = {
  dispatch: PropTypes.func.isRequired, 
  data: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

class InfluxdbServerList extends Component {
  getServerList() {
    const { influxdbServer, dispatch } = this.props;
    const arr = _.map(influxdbServer.list, (item, i) => {
      return <ServerItem
        key={item._id}
        data={item}
        index={i + 1}
        dispatch={dispatch}
      />
    });
    return arr;
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
            <th>Operation</th>
          </tr></thead>
          <tbody>
            {this.getServerList()}
          </tbody>
        </table>
      </div>
    );
  }
}

InfluxdbServerList.propTypes = {
  dispatch: PropTypes.func.isRequired, 
};

export default InfluxdbServerList;
