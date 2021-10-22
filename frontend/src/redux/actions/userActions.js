import axios from 'axios';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
} from '../../constants/userConstants';
import useEndpont from '../../hooks/useEndpoints';

export const signupUser = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_SIGNUP_REQUEST });

    // - - AP endpoint
    const signupAPI = useEndpont('signup');

    // const newUserData = {
    //   name,
    //   email,
    //   password,
    // };

    const { data } = await axios.post(signupAPI, { name, email, password });

    dispatch({ type: USER_SIGNUP_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem('user', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload: error.response.data,
    });
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
  } catch (error) {}
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('user');

  dispatch({ type: USER_LOGOUT });
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const {
      login: { user },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };

    const profileAPI = useEndpont(id);

    const { data } = await axios.get(profileAPI, config);

    console.log(data);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {}
};
