'use strict';
/* eslint import/no-unresolved:0 */
import React, { PropTypes, Component } from 'react';
import * as _ from 'lodash';
import classnames from 'classnames';
import Dialog from '../components/dialog';
import * as navigationAction from '../actions/navigation';
import * as influxdbAction from '../actions/influxdb';

class ServerItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: ''
    };
  }
  onModify(e) {
    const { dispatch, data } = this.props;
    e.preventDefault();
    dispatch(navigationAction.editServer(data._id));
  }
  onRemove(e) {
    e.preventDefault();
    if (this.state.step) {
      return;
    }
    this.setState({
      step: 'confirm',
    });
  }
  onConfirm(e) {
    e.preventDefault();
    this.setState({
      step: 'prcessingRemove',
    });
    const { dispatch, data } = this.props;
    dispatch(influxdbAction.removeServer(data._id, data.token)).catch(err => {
      this.setState({
        step: '',
      });
    });
  }
  onCancel(e) {
    e.preventDefault();
    this.setState({
      step: '',
    });
  }
  render() {
    const { data, index, user } = this.props;
    const { step } = this.state;
    const trClass = {};
    const owner = user.account;
    if (index % 2 === 0) {
      trClass['pure-table-odd'] = true;
    }
    const sslClass = {
      fa: true,
    };
    const removeClass = {
      fa: true,
    }
    if (data.ssl) {
      sslClass['fa-check-square'] = true;
    } else {
      sslClass['fa-square-o'] = true;
    }
    if (step === 'prcessingRemove') {
      removeClass['fa-spinner'] = true;
    } else {
      removeClass['fa-times'] = true;
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
        { owner === data.owner &&
          <td>
            <a href="#" className="op" title="modify" onClick={e => this.onModify(e)}>
              <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
            </a>
            { step !== 'confirm' &&
              <a href="#" className="op" title="remove" onClick={e => this.onRemove(e)}>
                <i className={classnames(removeClass)} aria-hidden="true"></i>
              </a>
            }
            { step === 'confirm' &&
              <a href="#" className="op" title="confrim" onClick={e => this.onConfirm(e)}>
                <i className="fa fa-check" aria-hidden="true"></i>
              </a>
            }
            {
              step === 'confirm' &&
              <a href="#" className="op" title="cancel" onClick={e => this.onCancel(e)}>
                <i className="fa fa-times" aria-hidden="true"></i>
              </a>
            }
          </td>
        }
        {
          owner !== data.owner &&
          <td>{data.owner}</td>
        }
      </tr>
    );
  }
}

ServerItem.propTypes = {
  dispatch: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
};


class InfluxdbServerList extends Component {
  getServerList() {
    const { influxdbServer, dispatch, user } = this.props;
    const arr = _.map(influxdbServer.list, (item, i) => {
      return <ServerItem
        key={item._id}
        data={item}
        index={i + 1}
        dispatch={dispatch}
        user={user}
      />
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
            <th style={{width: '100px'}}>Operation</th>
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
};

export default InfluxdbServerList;
