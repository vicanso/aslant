import React, { PropTypes } from 'react';
import * as userAction from '../actions/user';
import * as navigationAction from '../actions/navigation';
import FormView from '../components/form';
import {
  VIEW_LOGIN,
} from '../constants/urls';

class Register extends FormView {
  constructor(props) {
    super(props);
    this.state.fields = [
      {
        label: 'Username',
        id: 'account',
        autoFocus: true,
        required: true,
      },
      {
        label: 'Email Address',
        id: 'email',
        required: true,
      },
      {
        label: 'Password',
        id: 'password',
        type: 'password',
        required: true,
      },
    ];
  }
  getSubmitText() {
    const {
      status,
    } = this.state;
    if (status === 'submitting') {
      return 'Creating an account...';
    }
    return 'Create an account';
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
    const data = this.getData();
    if (!data) {
      return;
    }
    const { account, password, email } = data;
    let error = '';
    if (!account || !password || !email) {
      error = 'Account Password and Email can\'t be empty';
    } else {
      if (password.length < 6) {
        error = 'Password catn\'t be less than 6 character!';
      }
      if (account.length < 4) {
        error = 'Account catn\'t be less than 4 character!';
      }
    }
    if (error) {
      this.showError(error);
      return;
    }
    this.setState({
      status: 'submitting',
    });
    dispatch(userAction.register(account, password, email))
      .then(() => {
        dispatch(navigationAction.home());
      })
      .catch((err) => {
        this.setState({
          status: '',
        });
        this.showError(err);
      });
  }
  render() {
    const { dispatch } = this.props;
    return (
      <div className="login-register-container">
        <h3 className="tac">Join Aslant</h3>
        {
          super.render()
        }
        <a
          href={VIEW_LOGIN}
          onClick={(e) => {
            e.preventDefault();
            dispatch(navigationAction.to(VIEW_LOGIN));
          }}
          className="create-account"
        >Login</a>
      </div>
    );
  }
}

Register.propTypes = {
  dispatch: PropTypes.func.isRequired,
  showError: PropTypes.func,
};

export default Register;
