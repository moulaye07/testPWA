import citiesReducer from './citiesReducer';
import { combineReducers } from 'redux';
import usersReducer from './userReducers';
import loginReducer from './loginReducers';

const rootReducer = combineReducers({
  cities: citiesReducer,
  users: usersReducer,
  login: loginReducer,
})

export default rootReducer;