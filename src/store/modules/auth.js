import swal from 'sweetalert';

import { signUpRequest, loginRequest } from '../../api/auth';
import { setItem, getItem, clearLocalStorage } from '../../utils/helpers';

//constants
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export const SIGNUP_INITIALIZED = 'SIGNUP_INITIALIZED';
export const LOGIN_INITIALIZED = 'LOGIN_INITIALIZED';
export const LOGOUT_INITIALIZED = 'LOGOUT_INITIALIZED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const initialState = {
  isLoading: false,
  errors: [],
  token: null,
  loggedInUser: null,
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

export const logoutInitialize = () => {
  return {
    type: LOGOUT_INITIALIZED,
  };
};

export const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const loginUser = (userData, from) => {
  return async dispatch => {
    try {
      dispatch(loginInitialize());
      const { data } = await loginRequest(userData);
      setItem('token', data.data.token);
      setItem('user', JSON.stringify(data.data.user));
      swal(`Hi ${data.data.user.firstname}`, 'Welcome back', 'success')
        .then(() => location.replace(from.pathname))
        .then(() => dispatch(loginSuccess(data.data)));
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
      setItem('token', data.data.token);
      setItem('user', JSON.stringify(data.data.user));
      swal(
        `Hi ${data.data.user.firstname}`,
        'Welcome to Questioner',
        'success',
      ).then(response => {
        location.replace(from.pathname);
      });
      dispatch(signUpSuccess(data.data));
    } catch (error) {
      const { data } = error.response;
      swal('error', data.error, 'error');
      dispatch(signUpError(data));
    }
  };
};

export const autoLogin = dispatch => {
  dispatch(loginInitialize());
  const user = JSON.parse(getItem('user'));
  const token = getItem('token');
  dispatch(loginSuccess({ user, token }));
};

export const logout = dispatch => {
  dispatch(logoutInitialize());
  clearLocalStorage();
  dispatch(logoutSuccess());
  location.href = '/';
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_INITIALIZED:
    case LOGIN_INITIALIZED:
    case LOGOUT_INITIALIZED:
      return {
        ...state,
        isLoading: true,
      };

    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loggedInUser: action.payload.user,
        token: action.payload.token,
        errors: [],
      };

    case SIGNUP_ERROR:
    case LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        errors: action.error,
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggedInUser: null,
        token: null,
        isLoading: false,
      };

    default:
      return state;
  }
};
