import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { loginUserHandler } from '../actions/users';

import './css/user-login-form.css';

export class UserLogin extends React.Component {
  onSubmit(values) {
    this.props.dispatch(loginUserHandler(this.props.history, values.username, values.password));
  }

  render() {
    return (
      <div className="user-login-form">
        <h2>Login to an Account</h2>
        <form onSubmit={this.props.handleSubmit(values =>
          this.onSubmit(values)
        )}>
          <label htmlFor="username">Username</label>
          <Field 
            aria-label="username"
            name="username"
            id="loginusername" 
            type="text" 
            component="input"
            />
          <label htmlFor="password">Password</label>
          <Field 
            aria-label="password"
            name="password" 
            id="loginpassword" 
            type="password" 
            component="input" 
          />
          <button name="submit-login" type="submit">LOG IN</button>
          {this.props.loginFail}
        </form>
        <button name="demo-login" type="submit" title="login as demo user" onClick={() => this.props.dispatch(loginUserHandler(this.props.history, 'testuser', 'password'))}>DEMO</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loginFail: state.user.error
})

export default connect(mapStateToProps)(reduxForm({
  form: 'userLogin'
})(UserLogin));