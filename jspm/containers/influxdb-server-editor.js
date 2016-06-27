'use strict';
/* eslint import/no-unresolved:0 */
import React, { PropTypes } from 'react';
import * as _ from 'lodash';
import Joi from 'joi';
import Dialog from '../components/dialog';
import * as influxdbAction from '../actions/influxdb';
import * as navigationAction from '../actions/navigation';

class InfluxdbServerEditor extends Dialog {
  constructor(props) {
    super(props);
    this.state = {
      classes: {
        influxdbServerEditor: true,
      },
      title: 'Add New Server',
      status: ''
    };
  }
  getData() {
    const refs = this.refs;
    const user = refs.user.value;
    const password = refs.password.value;
    const data = {
      name: refs.name.value,
      host: refs.host.value,
      port: refs.port.value,
      ssl: refs.ssl.checked,
    };
    if (user) {
      data.user = user;
    }
    if (password) {
      data.password = password;
    }
    return data;
  }
  handleChange() {
    const state = this.state;
    if (state.error) {
      this.setState({
        error: '',
      });
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    const { status } = this.state;
    if (status === 'submitting') {
      return;
    }
    const schema = Joi.object().keys({
      name: Joi.string().trim().required(),
      host: Joi.string().trim().required(),
      port: Joi.number().integer().required(),
      ssl: Joi.boolean().required(),
      user: Joi.string().trim(),
      password: Joi.string().trim(),
    });

    const result = Joi.validate(this.getData(), schema);
    if (result.error) {
      return this.setState({
        error: result.error.message,
      });
    }
    return dispatch(influxdbAction.addServer(result.value)).then(data => {
      dispatch(navigationAction.back());
    });
  }
  componentDidMount() {
    const { servers, dispatch } = this.props;
    const refs = this.refs;
    const defaultValue = {
      host: 'localhost',
      port: '8086',
    };
    _.forEach(refs, (ref, k) => {
      if (!ref.value && defaultValue[k]) {
        /* eslint no-param-reassign:0 */
        ref.value = defaultValue[k];
      }
    });
  }
  getError() {
    const { servers } = this.props;
    const { error } = this.state;
    if (!error) {
      return null;
    }
    return (
      <div className="pure-u-1">
        <div
          className="warning"
          style={{
            margin: '10px 5px 0',
          }}
        >
          <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
          <span>{errorMessage}</span>
        </div>
      </div>
    );
  }
  getContent() {
    const { status } = this.state;
    const { dispatch } = this.props;
    return (
      <form className="pure-form pure-form-aligned pure-g"><fieldset>
        <div className="pure-u-1-2">
          <div className="formItem">
            <label>Nick Name</label>
            <input
              autoFocus="true"
              type="text"
              placeholder="Ex: My Awesome Server"
              ref="name"
              required="true"
              onChange={() => this.handleChange()}
            />
          </div>
        </div>
        <div className="pure-u-1-2">
          <div className="formItem">
            <label>Host</label>
            <input
              type="text"
              placeholder="Ex: localhost"
              ref="host"
              required="true"
              onChange={() => this.handleChange()}
            />
          </div>
        </div>
        <div className="pure-u-1-2">
          <div className="formItem">
            <label>Port</label>
            <input
              type="text"
              placeholder="Ex: 8086"
              ref="port"
              required="true"
              onChange={() => this.handleChange()}
            />
          </div>
        </div>
        <div className="pure-u-1-2">
          <div
            className="formItem"
            style={{
              paddingTop: '27px',
            }}
          >
            <input
              id="useSSL"
              type="checkbox"
              ref="ssl"
              onChange={() => this.handleChange()}
            />
            <label
              htmlFor="useSSL"
              style={{
                display: 'inline',
                marginLeft: '10px',
              }}
            >Use SSL</label>
          </div>
        </div>
        <div className="pure-u-1">
          <div className="formItem">
            <label>HTTP basic auth username(optional)</label>
            <input
              type="text"
              placeholder="Ex: vicanso"
              ref="user"
              onChange={() => this.handleChange()}
            />
          </div>
        </div>
        <div className="pure-u-1">
          <div className="formItem">
            <label>HTTP basic auth password(optional)</label>
            <input
              type="text"
              placeholder="Ex: mypass"
              ref="password"
              onChange={() => this.handleChange()}
            />
          </div>
        </div>
        <div className="pure-u-1">
          <a
            href="#"
            className="pure-button pure-button-primary submit"
            onClick={e => this.handleSubmit(e)}
          >Add
          {status === 'submitting' && <span>...</span>}
          </a>
        </div>
        {this.getError()}
      </fieldset></form>
    );
  }
}

InfluxdbServerEditor.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default InfluxdbServerEditor;
