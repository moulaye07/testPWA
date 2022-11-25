/* eslint-disable no-unused-vars */
import React from 'react';
import './Login.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  checkAccount
} from '../../store/actions/loginActions'
import { NavLink } from 'react-router-dom';

import { isLoggedIn } from '../../store/actions/loginActions';
import { getProfile } from '../../store/actions/profileAction';
import { Redirect } from 'react-router-dom';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      accessToken: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault();
    const email = this.state.email;
    const password = this.state.password;
    this.props.checkAccount(email, password);
    this.props.isLoggedIn();
  }

  render() {

    const isLoggedinProperly = this.props.login.isLoggedIn;
    if (isLoggedinProperly) {
      return (<Redirect to='/' />)
    }

    return (
      <>
        <div className="Login">
          <h1 className="createHeadLog">Login</h1>
          <form onSubmit={this.onSubmit}>
            <div className="formInp">
              <label>
                <p>Email:</p><input type="text"
                  name="email"
                  value={this.state.value}
                  onChange={this.onChange}>
                </input>
              </label>
            </div>
            <div className="formInpLog">
              <label>
                <p>Password:</p><input type="password"
                  name="password"
                  value={this.state.value}
                  onChange={this.onChange}>
                </input>
              </label>
            </div>
            <input className="submtLog" type="submit" value="OK" />
          </form>

          <h1 className="textLog">Don't have a MYtinerary account yet? You should create one! It's totally free and only takes a minute.</h1>
          <div className="createAcc">
            <NavLink to='CreateAccount'>
              <button
                className="btn btn-primary google "
              >
                <div>
                  Create Account
                </div>
              </button>
            </NavLink>
          </div>
        </div>
      </>
    );
  }
}

Login.propTypes = {
  checkAccount: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  login: state.login,
})

export default connect(
  mapStateToProps,
  { checkAccount, isLoggedIn, getProfile }
)(Login);