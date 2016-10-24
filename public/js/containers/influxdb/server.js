import React, { PropTypes } from 'react';

import FormView from '../../components/form';
import * as influxdbAction from '../../actions/influxdb';
import * as navigationAction from '../../actions/navigation';

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
        type: 'checkbox',
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
      fn = influxdbAction.update(data, server.token);
    } else {
      fn = influxdbAction.add(data);
    }
    dispatch(fn).then(() => {
      dispatch(navigationAction.back());
    }).catch((err) => {
      this.setState({
        status: '',
        error: err.response.body.message,
      });
    });
  }
  render() {
    return (
      <div className="login-register-container">
        <h3 className="tac">Add Influxdb Server</h3>
        {
          this.renderError()
        }
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
