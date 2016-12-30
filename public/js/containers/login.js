import React, { PropTypes } from 'react';
import * as _ from 'lodash';

import * as userAction from '../actions/user';
import * as navigationAction from '../actions/navigation';
import {
  VIEW_REGISTER,
} from '../constants/urls';
import FormView from '../components/form';
import GestureView from '../components/gesture';
import * as storageService from '../services/storage';

const userStorageKey = 'user';

class Login extends FormView {
  constructor(props) {
    super(props);
    const user = storageService.get(userStorageKey);
    const loginType = _.get(user, 'loginType', 'password');
    const passwordLabel = (
      <span>
        Password
        <a
          href="javascript:;"
          className="mleft10"
          onClick={() => {
            const fields = this.state.fields.slice(0);
            fields[1].hidden = true;
            fields[2].hidden = false;
            this.setState({
              fields,
              type: 'gesture',
            });
          }}
        >
          <span className="pt-icon-hand" />
        </a>
      </span>
    );
    this.state = {
      fields: [
        {
          label: 'Username',
          id: 'account',
          autoFocus: true,
          required: true,
          value: _.get(user, 'account'),
        },
        {
          label: passwordLabel,
          id: 'password',
          type: 'password',
          required: true,
          hidden: loginType === 'gesture',
        },
        {
          type: 'custom',
          hidden: loginType !== 'gesture',
          render: () => this.renderGesture(),
        },
      ],
      type: loginType,
    };
  }
  getSubmitText() {
    const {
      status,
    } = this.state;
    if (status === 'submitting') {
      return 'Signing In...';
    }
    return 'Sign In';
  }
  handleSubmit(e) {
    if (e) {
      e.preventDefault();
    }
    const {
      status,
      type,
    } = this.state;
    if (status === 'submitting') {
      return;
    }
    const { dispatch } = this.props;
    const data = this.getData();
    if (!data) {
      return;
    }
    const {
      account,
      password,
    } = data;
    let error = '';
    if (type === 'password' && password.length < 6) {
      error = 'Password catn\'t be less than 6 character!';
    }
    if (account.length < 4) {
      error = 'Account catn\'t be less than 4 character!';
    }
    if (error) {
      this.showError(error);
      return;
    }
    this.setState({
      status: 'submitting',
    });
    const loginData = {
      account,
      type,
    };
    if (type === 'password') {
      loginData.password = password;
    } else {
      loginData.password = this.gesture.join('');
    }
    dispatch(userAction.login(loginData))
      .then(() => {
        storageService.set(userStorageKey, {
          account,
          loginType: type,
        });
        dispatch(navigationAction.back());
      })
      .catch((err) => {
        this.setState({
          status: '',
        });
        this.showError(err.response.body.message);
      });
  }
  renderGesture() {
    return (
      <div
        key="gesture"
      >
        <label
          htmlFor="gesture"
        >
          Gesture password
          <a
            href="javascript:;"
            className="mleft10"
            onClick={() => {
              const fields = this.state.fields.slice(0);
              fields[1].hidden = false;
              fields[2].hidden = true;
              this.setState({
                fields,
                type: 'password',
              });
            }}
          >
            <span className="pt-icon-annotation" />
          </a>
        </label>
        <GestureView
          id="gesture"
          onFininsh={(gesture) => {
            this.gesture = gesture;
            this.handleSubmit();
          }}
        />
      </div>
    );
  }
  render() {
    const { dispatch } = this.props;
    return (
      <div className="login-register-container">
        <h3 className="tac">Sign in to Aslant</h3>
        {
          super.render()
        }
        <a
          href={VIEW_REGISTER}
          onClick={(e) => {
            e.preventDefault();
            dispatch(navigationAction.to(VIEW_REGISTER));
          }}
          className="create-account"
        >Create an account.</a>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  showError: PropTypes.func,
};

export default Login;
