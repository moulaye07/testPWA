// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCities } from '../../store/actions/citiesActions'
// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom'
// import {fetchItineraries} from '../../store/actions/itineraryActions'
import './Cities.css';
// import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import { isLoggedIn } from '../../store/actions/loginActions';
import { getProfile } from '../../store/actions/profileAction'



class Cities extends Component {
  constructor(props) {
    super(props)
    this.state = {
      citiesFilter: '',
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchCities()
  }

  handleChange(e) {
    this.setState({
      citiesFilter: e.target.value
    })
  }



  render() {

    const { cities } = this.props;
    const filteredCity = cities.filter(city => {
      return city
    })


    const citiesDisp = filteredCity.map((city) => {
      return (
        <div className="citiesDisp" key={city._id}>
          <div key={city._id}>
            <div className="card" style={{
              backgroundImage: '../img/MYtineraryLogo.png',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}></div>
            <div className="cityName">
              <h1 className="cityName">city.name</h1>
            </div>
          </div>

        </div>
      )
    })

    return (
      <div className="citiesBody">
        <div className="cities">
          {citiesDisp}
        </div>
      </div>
    )
  }
}




const mapStateToProps = (state) => {
  return {
    cities: state.cities
  }
}

export default connect(mapStateToProps, { fetchCities, isLoggedIn, getProfile })(Cities);