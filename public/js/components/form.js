import React, { Component } from 'react';
import classnames from 'classnames';
import * as _ from 'lodash';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
      error: '',
    };
    this.inputs = {};
  }
  getData() {
    const inputs = this.inputs;
    const data = {};
    const errors = [];
    _.forEach(this.state.fields, (field) => {
      const required = field.required;
      const key = field.id;
      const ref = inputs[key];
      const value = ref.value || '';
      if (field.type === 'checkbox' || field.type === 'radio') {
        data[key] = ref.checked;
      } else if (value) {
        data[key] = value;
      }
      if (required && !data[key]) {
        errors.push(`${field.label} cat not be null`);
      }
    });
    if (errors.length) {
      this.setState({
        error: errors.join(','),
      });
      return null;
    }
    return data;
  }
  getSubmitText() {
    const {
      status,
    } = this.state;
    if (status === 'submitting') {
      return 'Submitting...';
    }
    return 'Submit';
  }
  handleChange() {
    const state = this.state;
    if (state.error) {
      this.setState({
        error: '',
      });
    }
  }
  renderError() {
    const {
      error,
    } = this.state;
    if (!error) {
      return null;
    }
    return (
      <div
        className="flash flash-error"
      >
        {error}
      </div>
    );
  }
  render() {
    const {
      fields,
      status,
    } = this.state;

    const submitOptions = {
      value: this.getSubmitText(),
      cls: {
        btn: true,
        'btn-primary': true,
        'btn-block': true,
        disabled: status === 'submitting',
      },
    };
    const fieldsList = _.map(fields, (field, index) => {
      const id = field.id;
      return (
        <div
          className="pure-control-group"
          key={id}
        >
          <label htmlFor={id}>{field.label}</label>
          <input
            id={id}
            autoCapitalize="off"
            autoCorrect="off"
            autoFocus={field.autoFocus || false}
            defaultValue={field.value}
            defaultChecked={field.value}
            type={field.type || 'text'}
            tabIndex={index + 1}
            ref={(c) => {
              this.inputs[id] = c;
            }}
            onChange={() => this.handleChange()}
          />
        </div>
      );
    });

    return (
      <form
        className="pure-form pure-form-aligned"
        onSubmit={e => this.handleSubmit(e)}
      >
        <fieldset>
          {fieldsList}
          <div className="pure-control-group">
            <input
              type="submit"
              className={classnames(submitOptions.cls)}
              value={submitOptions.value}
              tabIndex={fieldsList.length + 1}
            />
          </div>
        </fieldset>
      </form>
    );
  }
}

export default Form;