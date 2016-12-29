import React, { Component, PropTypes } from 'react';
import {
  Switch,
} from '@blueprintjs/core';
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
    this.showError = props.showError || _.noop;
  }
  getData() {
    const inputs = this.inputs;
    const data = {};
    const errors = [];
    _.forEach(this.state.fields, (field) => {
      const required = field.required;
      const key = field.id;
      const ref = inputs[key];
      if (field.type === 'switch') {
        data[key] = ref;
        return;
      }
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
      this.showError(errors.join(','));
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
  render() {
    const {
      fields,
      status,
    } = this.state;

    const submitOptions = {
      value: this.getSubmitText(),
      cls: {
        'pt-button': true,
        'pt-intent-primary': true,
        'pt-fill': true,
        disabled: status === 'submitting',
      },
    };
    const fieldsList = _.map(fields, (field, index) => {
      const id = field.id;
      if (field.type === 'switch') {
        this.inputs[id] = field.value;
        return (
          <Switch
            style={{
              marginTop: '15px',
            }}
            defaultChecked={this.inputs[id]}
            label={field.label}
            key={id}
            onChange={() => {
              this.inputs[id] = !this.inputs[id];
            }}
          />
        );
      }
      return (
        <div
          key={id}
        >
          <label
            className="pt-label"
            htmlFor={id}
          >
            {field.label}
            <input
              className="pt-input"
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
            />
          </label>
        </div>
      );
    });

    return (
      <form
        onSubmit={e => this.handleSubmit(e)}
      >
        <fieldset>
          { fieldsList }
          { this.renderOtherFields && this.renderOtherFields() }
          <div>
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

Form.propTypes = {
  showError: PropTypes.func,
};

export default Form;
