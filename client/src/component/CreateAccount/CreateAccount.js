/* eslint-disable indent */
/* eslint-disable no-console */
import React from 'react';
import './CreateAccount.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userSignupRequest, fetchUsers } from '../../store/actions/signUpActions'


const emailRegx = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);


const formIsValid = ({ formErrors, ...rest }) => {
  let valid = true;
  Object.values(formErrors).forEach(val => val.length > 0 && (valid = false));
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class CreateAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitReady: false,
      username: '',
      password: '',
      email: '',
      formErrors: {
        username: '',
        password: '',
        email: '',
        formError: ''
      }
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleButtonChange = this.handleButtonChange.bind(this);

  }


  onChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    switch (name) {
      case 'username':
        formErrors.username =
          value.length < 3 ? 'minimum 3 characters required' : '';
        break;
      case 'password':
        formErrors.password =
          value.length < 6 ? 'minimum 6 characters required' : '';
        break;
      case 'email':
        formErrors.email = emailRegx.test(value)
          ? ''
          : 'invalid email address';
        break;
      default:
        break;
    }

    // this.setState({ formErrors, [name]: value }, () => console.log(this.state));

    this.setState({ [e.target.name]: e.target.value })
    this.state.email && this.props.fetchUsers(this.state.email)
  }


  onSubmit(e) {
    e.preventDefault();

    if (formIsValid(this.state)) {
      console.log(`Submitting
      Username: ${this.state.username}
      Password: ${this.state.password}
      Email: ${this.state.email}`);
    } else {
      console.error('invalid form');
    }


    if (formIsValid(this.state)) {
      let formData = {
        'username': this.state.username,
        'password': this.state.password,
        'email': this.state.email,
    };
      this.props.userSignupRequest(formData)

    }
    this.props.history.push('/Login')
  }

  handleButtonChange(e) {
    // console.log('change buttons');
    e.preventDefault();
    if (formIsValid(this.state)) {
      this.setState({ submitReady: true });
    } else {
      // console.log('form is not valid');
    }
  }


  render() {
    const { formErrors } = this.state;

    return (
      <div className="CreateAccount">
        <h1 className="createHead">Create Account</h1>

        <form
          onChange={this.handleButtonChange}
          onSubmit={this.onSubmit}
        >

          <div className="userName form-Group input" >
            <label className="form-label"
              style={{ flex: 1 }}
              htmlFor="username"
            >
              Username :{' '}
            </label>
            <input
              type="text"
              name="username"
              onChange={this.onChange}
              className={
                formErrors.username.length > 0
                  ? 'error form-control'
                  : 'form-control'
              }
              style={{ flex: 2 }} />

            {/* {formErrors.username.length > 0 && (
              <span>{formErrors.username}</span>
            )} */}
          </div>
          {formErrors.username.length > 0 && (
            <div className="errorForm">
              <span>{formErrors.username}</span>
            </div>
          )}
          <div className="password input form-Group">
            <label className="form-label"
              style={{ flex: 1 }}
              htmlFor="password"
            >
              Password:{' '}
            </label>
            <input type="password" name="password" style={{ flex: 2 }} onChange={this.onChange}
              className={
                formErrors.password.length > 0 ? 'form-control error'
                  : 'form-control psswd'
              }
            />
          </div>
          {formErrors.password.length > 0 && (
            <div className="errorForm">
              <span>
                {formErrors.password}
              </span>
            </div>
          )}


          <div className="email input form-Group">
            <label className="form-label" style={{ flex: 1 }}
              htmlFor="email">
              Email:{' '}
            </label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              style={{ flex: 2 }}
              className={
                formErrors.email.length > 0
                  ? 'error form-control'
                  : 'form-control eml'
              }
            />
          </div>
          {formErrors.email.length > 0 && (
            <div className="errorForm">
              <span>
                {formErrors.email}
              </span>
            </div>
          )}

          


          {/* <div> */}
          <label className="form-check-label chk">
            <input className="form-check-input" required type="checkbox" />
            I agree to MYtinerary's Terms &amp; Conditions
          </label>
          {/* </div> */}



          <div style={{ marginBottom: '80px', marginTop: '20px' }}>
            {' '}
            {this.state.submitReady ? (
              <button
                style={{
                  width: '70%',
                  paddingTop: 10,
                  paddingBottom: 10,
                  fontWeight: 'bold'
                }}
                className="btn btn-primary chkd"
              >
                OK
              </button>
            ) : (
              <button
                style={{
                  width: '70%',
                  paddingTop: 10,
                  paddingBottom: 10,
                  fontWeight: 'bold'
                }}
                className="btn btn-outline-primary chkd"
              >
                OK
              </button>
            )}
          </div>

        </form>
      </div>
    );
  }
}

CreateAccount.propTypes = {
  userSignupRequest: PropTypes.func.isRequired
}


const mapStateToProps = (state) => {
  return {
    users: state.users,
    messages: state.users.messages
  }
}

export default connect(
  mapStateToProps,
  { fetchUsers, userSignupRequest }
)(CreateAccount);