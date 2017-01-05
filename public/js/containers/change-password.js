import React, { PropTypes } from 'react';
import * as userAction from '../actions/user';
import * as navigationAction from '../actions/navigation';
import FormView from '../components/form';
import {
  VIEW_LOGIN,
} from '../constants/urls';

class ChangePassword extends FormView {
  constructor(props) {
    super(props);
    this.state.fields = [
      {
        label: 'Current Password',
        id: 'password',
        type: 'password',
        autoFocus: true,
        required: true,
      },
      {
        label: 'Password',
        id: 'newPassword',
        type: 'password',
        required: true,
      },
      {
        label: 'Confirm Password',
        id: 'confirmPassword',
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
      return 'Update password...';
    }
    return 'Update password';
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
    const { newPassword, password, confirmPassword } = data;
    let error = '';
    if (!newPassword || !password) {
      error = 'Current password and new password can\'t be empty';
    } else if (newPassword.length < 6) {
      error = 'Password catn\'t be less than 6 character!';
    }
    if (newPassword !== confirmPassword) {
      error = 'The new password is not the same';
    }
    if (error) {
      this.showError(error);
      return;
    }
    this.setState({
      status: 'submitting',
    });
    dispatch(userAction.updatePassword(password, newPassword))
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
        <h3 className="tac">Change Password</h3>
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

ChangePassword.propTypes = {
  dispatch: PropTypes.func.isRequired,
  showError: PropTypes.func,
};

export default ChangePassword;
