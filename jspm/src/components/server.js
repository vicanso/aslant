'use strict';
/* eslint import/no-unresolved:0 */
import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import * as navigationAction from 'aslant/actions/navigation';
import * as serverAction from 'aslant/actions/server';

class Server extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: '',
    };
  }
  onModify(e) {
    const { dispatch, data } = this.props;
    e.preventDefault();
    /* eslint no-underscore-dangle:0 */
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
    /* eslint no-underscore-dangle:0 */
    dispatch(serverAction.remove(data._id)).catch(err => {
      this.setState({
        step: '',
      });
      // TODO
      console.error(err);
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
    const owner = user.basic.account;
    if (index % 2 === 0) {
      trClass['pure-table-odd'] = true;
    }
    const sslClass = {
      fa: true,
    };
    const removeClass = {
      fa: true,
    };
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
        {
          owner === data.owner && <td>
            <a href="#" className="op" title="modify" onClick={e => this.onModify(e)}>
              <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
            </a>
            {
              step !== 'confirm' && <a
                href="#"
                className="op"
                title="remove"
                onClick={e => this.onRemove(e)}
              >
                <i className={classnames(removeClass)} aria-hidden="true"></i>
              </a>
            }
            {
              step === 'confirm' && <a
                href="#" className="op"
                title="confrim"
                onClick={e => this.onConfirm(e)}
              >
                <i className="fa fa-check" aria-hidden="true"></i>
              </a>
            }
            {
              step === 'confirm' && <a
                href="#"
                className="op"
                title="cancel"
                onClick={e => this.onCancel(e)}
              >
                <i className="fa fa-times" aria-hidden="true"></i>
              </a>
            }
          </td>
        }
        {
          owner !== data.owner && <td>{data.owner}</td>
        }
      </tr>
    );
  }
}

Server.propTypes = {
  dispatch: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
};

export default Server;
