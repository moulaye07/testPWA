import { SET_CITIES } from '../actions/actions';


const citiesReducer = (state = [], action = {}) => {
  switch (action.type) {

  case SET_CITIES:
    return action.cities;
  default: return state
  }
}

export default citiesReducer;