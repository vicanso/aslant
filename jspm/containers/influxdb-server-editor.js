'use strict';
/* eslint import/no-unresolved:0 */
import React, { PropTypes } from 'react';
import * as _ from 'lodash';
import Joi from 'joi';
import Dialog from '../components/dialog';
import * as influxdbAction from '../actions/influxdb';
import * as navigationAction from '../actions/navigation';
import * as util from '../helpers/util';

class InfluxdbServerEditor extends Dialog {
  constructor(props) {
    super(props);
    this.state = {
      classes: {
        influxdbServerEditor: true,
      },
      title: props.server ? 'Update Server' : 'Add New Server',
      status: '',
    };
  }
  onClose(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(navigationAction.back());   
  }
  getData() {
    const refs = this.refs;
    const user = refs.user.value;
    const password = refs.password.value;
    const group = refs.group.value;
    const data = {
      name: refs.name.value,
      host: refs.host.value,
      port: refs.port.value,
      ssl: refs.ssl.checked,
    };
    _.forEach('user password group'.split(' '), k => {
      const v = refs[k].value;
      if (v) {
        data[k] = v;
      }
    });
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
    const { dispatch, server } = this.props;
    const { status } = this.state;
    if (status === 'processing') {
      return;
    }
    const schema = Joi.object().keys({
      name: Joi.string().trim().required(),
      host: Joi.string().trim().required(),
      port: Joi.number().integer().required(),
      ssl: Joi.boolean().required(),
      group: Joi.string().trim().required(),
      user: Joi.string().trim(),
      password: Joi.string().trim(),
    });

    const result = Joi.validate(this.getData(), schema);
    if (result.error) {
      return this.setState({
        error: result.error.message,
      });
    }
    this.setState({
      status: 'processing',
    });
    let fn;
    if (server) {
      fn = influxdbAction.editServer(server._id, server.token, result.value);
    } else {
      fn = influxdbAction.addServer(result.value);
    }
    return dispatch(fn).then(() => {
      dispatch(navigationAction.back());
    }).catch(err => { 
      this.setState({
        status: '',
        error: util.getError(err),
      });
    });
  }
  onKeyUp(e) {
    switch(e.keyCode) {
      case 13:
        return this.handleSubmit(e);
      case 27:
        return this.onClose(e);
    }
  }
  setDefaultValue() {
    const { server, dispatch } = this.props;
    const refs = this.refs;
    const defaultValue = {
      host: 'localhost',
      port: '8086',
      group: '*',
    };
    _.forEach(refs, (ref, k) => {
      const v = _.get(server, k, defaultValue[k]);
      if (!_.isUndefined(v)) {
        /* eslint no-param-reassign:0 */
        if (k === 'ssl') {
          ref.checked = v;
          return;
        }
        ref.value = v;
      }
    });
  }
  getError() {
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
          <span>{error}</span>
        </div>
      </div>
    );
  }
  getContent() {
    const { status } = this.state;
    const { dispatch, server, type } = this.props;
    if (type === 'update' && !server) {
      return null;
    }
    this.setDefaultValue();
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
              onKeyUp={e => this.onKeyUp(e)}
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
              onKeyUp={e => this.onKeyUp(e)}
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
              onKeyUp={e => this.onKeyUp(e)}
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
          <div
            className="formItem"
          >
            <label>Access Group(* for all)</label>
            <input
              type="text"
              placeholder="Ex: *"
              ref="group"
              onKeyUp={e => this.onKeyUp(e)}
              onChange={() => this.handleChange()}
            />
          </div>
        </div>
        <div className="pure-u-1">
          <div className="formItem">
            <label>HTTP basic auth username(optional)</label>
            <input
              type="text"
              placeholder="Ex: vicanso"
              ref="user"
              onKeyUp={e => this.onKeyUp(e)}
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
              onKeyUp={e => this.onKeyUp(e)}
              onChange={() => this.handleChange()}
            />
          </div>
        </div>
        <div className="pure-u-1">
          <a
            href="#"
            className="pure-button pure-button-primary submit"
            onClick={e => this.handleSubmit(e)}
          >
          {type === 'update' ? 'Update' : 'Add'}
          {status === 'processing' && <span>...</span>}
          </a>
        </div>
        {this.getError()}
      </fieldset></form>
    );
  }
}

InfluxdbServerEditor.propTypes = {
  dispatch: PropTypes.func.isRequired,
  server: PropTypes.object,
};

export default InfluxdbServerEditor;
