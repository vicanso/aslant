import React, { PropTypes } from 'react';
import * as _ from 'lodash';

import FormView from '../../components/form';
import * as serverAction from '../../actions/server';
import * as navigationAction from '../../actions/navigation';
import {
  VIEW_SERVERS,
} from '../../constants/urls';

class Server extends FormView {
  constructor(props) {
    super(props);
    const fields = [
      {
        label: 'Nick name',
        id: 'name',
        autoFocus: true,
        required: true,
      },
      {
        label: 'Host',
        id: 'host',
        required: true,
      },
      {
        label: 'Port',
        id: 'port',
        value: 8086,
        type: 'number',
        required: true,
      },
      {
        label: 'Use SSL',
        type: 'switch',
        id: 'ssl',
      },
      {
        label: 'Http basic auth username(optional)',
        id: 'username',
      },
      {
        label: 'Http basic auth password',
        id: 'password',
        type: 'password',
      },
    ];
    if (props.server) {
      _.forEach(props.server, (v, k) => {
        const found = _.find(fields, item => item.id === k);
        if (found) {
          found.value = v;
        }
      });
    }
    this.state.fields = fields;
  }
  getSubmitText() {
    const {
      server,
    } = this.props;
    const {
      status,
    } = this.state;
    if (server) {
      if (status === 'submitting') {
        return 'Updating';
      }
      return 'Update';
    }
    if (status === 'submitting') {
      return 'Submitting...';
    }
    return 'Submit';
  }
  handleSubmit(e) {
    e.preventDefault();
    const {
      status,
    } = this.state;
    if (status === 'submitting') {
      return;
    }
    const {
      dispatch,
      server,
    } = this.props;
    const data = this.getData();
    if (!data) {
      return;
    }
    let fn;
    if (server) {
      /* eslint no-underscore-dangle:0 */
      fn = serverAction.update(server._id, data, server.token);
    } else {
      fn = serverAction.add(data);
    }
    dispatch(fn).then(() => {
      dispatch(navigationAction.to(VIEW_SERVERS));
    }).catch((err) => {
      this.setState({
        status: '',
      });
      this.showError(err.response.body.message);
    });
  }
  render() {
    return (
      <div className="login-register-container">
        <h3 className="tac">Add Influxdb Server</h3>
        {
          super.render()
        }
      </div>
    );
  }
}

Server.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default Server;
