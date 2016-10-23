import React, { PropTypes } from 'react';

import FormView from '../components/form';

class AddServer extends FormView {
  constructor(props) {
    super(props);
    this.state.fields = [
      {
        label: 'Name',
        id: 'name',
        autoFocus: true,
      },
      {
        label: 'Host',
        id: 'host',
      },
      {
        label: 'Port',
        id: 'port',
        value: 8086,
        type: 'number',
      },
    ];
  }
  handleSubmit(e) {
    e.preventDefault();
    const {
      status,
    } = this.state;
    if (status === 'submitting') {
      return;
    }
    const { dispatch } = this.props;
    const { name, host, port } = this.getData();
    console.dir(name);
    console.dir(host);
    console.dir(port);
  }
  render() {
    const { dispatch } = this.props;
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

AddServer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default AddServer;
