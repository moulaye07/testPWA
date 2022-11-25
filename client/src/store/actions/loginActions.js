import { AUTH_SIGN_UP, LOG_OUT, IS_LOGGED_IN } from './actions';
import axios from 'axios';

export const checkAccount = (email, password) => dispatch => {
  axios
    .post('http://localhost:5000/login', { email, password })
    .then(res => {
      localStorage.setItem('user', res.data.token);
      localStorage.setItem('email', res.data.user.email);
      dispatch({
        type: AUTH_SIGN_UP,
        payload: res.data
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export function logout() {
  return dispatch => {
    localStorage.removeItem('user');
    localStorage.removeItem('email');
    dispatch({
      type: LOG_OUT
    })
  }
}


export function isLoggedIn() {
  return dispatch => {
    let user = localStorage.getItem('user');
    if (user) {
      let isLoggedIn = true
      dispatch({
        type: IS_LOGGED_IN,
        isLoggedIn
      })
    } else {
      let isLoggedIn = false
      dispatch({
        type: IS_LOGGED_IN,
        isLoggedIn
      })
    }
  }
}
