import React from 'react';
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';

import { signUpRequest, loginRequest } from '../../api/auth';
import { setToken } from '../../utils/helpers';

//constants
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export const SIGNUP_INITIALIZED = 'SIGNUP_INITIALIZED';
export const LOGIN_INITIALIZED = 'LOGIN_REQUESTED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const initialState = {
  isLoading: false,
  isAuthenticated: false,
  errors: [],
  successResponse: [],
};

export const signUpIntialize = () => {
  return {
    type: SIGNUP_INITIALIZED,
  };
};

export const signUpSuccess = payload => {
  return {
    type: SIGNUP_SUCCESS,
    payload,
  };
};

export const signUpError = error => {
  return {
    type: SIGNUP_ERROR,
    error,
  };
};

export const loginInitialize = () => {
  return {
    type: LOGIN_INITIALIZED,
  };
};

export const loginSuccess = payload => {
  return {
    type: LOGIN_SUCCESS,
    payload,
  };
};

export const loginError = error => {
  return {
    type: LOGIN_ERROR,
    error,
  };
};

export const loginUser = userData => {
  return async dispatch => {
    try {
      dispatch(loginInitialize());
      const { data } = await loginRequest(userData);
      setToken(data.data.token);
      swal(`Hi ${data.data.user.firstname}`, 'Welcome back', 'success');
      dispatch(loginSuccess(data));
    } catch (error) {
      const { data } = error.response;
      swal('error', data.error, 'error');
      dispatch(loginError(data));
    }
  };
};

export const signupUser = (userData, from) => {
  return async dispatch => {
    try {
      dispatch(signUpIntialize());
      const { data } = await signUpRequest(userData);
      setToken(data.data.token);
      swal(
        `Hi ${data.data.user.firstname}`,
        'Welcome to Questioner',
        'success',
      );
      dispatch(signUpSuccess(data));
    } catch (error) {
      const { data } = error.response;
      swal('error', data.error, 'error');
      dispatch(signUpError(data));
    }
  };
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_INITIALIZED:
      return {
        ...state,
        isLoading: true,
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        successResponse: action.payload,
        isLoading: false,
        isAuthenticated: true,
        errors: [],
      };

    case SIGNUP_ERROR:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        errors: action.error,
      };

    case LOGIN_INITIALIZED:
      return {
        ...state,
        isLoading: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        successResponse: action.payload,
        isLoading: false,
        isAuthenticated: true,
        errors: [],
      };

    case LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        errors: action.error,
      };

    default:
      return state;
  }
};
