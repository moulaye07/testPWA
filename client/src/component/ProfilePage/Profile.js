import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Profile.css'

import AccountCircle from '@material-ui/icons/AccountCircle';
import { getProfile } from '../../store/actions/profileAction';

class Profile extends Component {

  // componentDidMount() {
  //   console.log(this.props.profile);
  // }

  render() {
    return (
      <div>
        <h1
          style={{ fontSize: '20px', color: '#484848', fontFamily: 'Roboto' }}
        >
          Profile
        </h1>

        <div className="profileContents">
          

          <div className=" cardItem card border-info ">
            <div className="card-body text-info profileCard">
              <h5
                className="card-title "
                style={{
                  fontFmaily: 'Roboto',
                  color: '#484848',
                  fontWeight: 300
                }}
              >
                Name:{' '}
              </h5>
            </div>
          </div>
          <div />
          <div className=" cardItem card border-info ">
            <div className="card-body text-info profileCard">
              <h5
                className="card-title "
                style={{
                  fontFmaily: 'Roboto',
                  color: '#484848',
                  fontWeight: 300
                }}
              >
                Email:{' '}
              </h5>
              
            </div>
          </div>
          <div />
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getProfile: PropTypes.func.isRequired
};

export default connect(
  { getProfile }
)(Profile);
