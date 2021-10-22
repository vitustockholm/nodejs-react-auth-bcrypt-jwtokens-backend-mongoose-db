import { combineReducers } from 'redux';
import {
  userSignupReducer,
  userLoginReducer,
  userDetailsReducer,
} from './userReducers';

const reducer = combineReducers({
  signup: userSignupReducer,
  login: userLoginReducer,
  userDetails: userDetailsReducer,
});

const userDetailsFromStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;
//
export const initialState = {
  login: {
    user: userDetailsFromStorage,
  },
};
export default reducer;
