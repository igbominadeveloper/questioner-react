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
      dispatch(loginSuccess(data));
    } catch (error) {
      const { data } = error.response;
      dispatch(loginError(data));
    }
  };
};

export const signupUser = userData => {
  return async dispatch => {
    try {
      dispatch(signUpIntialize());
      const { data } = await signUpRequest(userData);
      dispatch(signUpSuccess(data));
    } catch (error) {
      const { data } = error.response;
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
        errors: [],
      };

    case SIGNUP_ERROR:
      return {
        ...state,
        isLoading: false,
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
        errors: [],
      };

    case LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        errors: action.error,
      };

    default:
      return state;
  }
};
