import { http } from '../../api/client';
import {
  SIGNUP_SUCCESS,
  SIGNUP_INITIALIZED,
  SIGNUP_ERROR,
  LOGIN_INITIALIZED,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  signUpIntialize,
  signUpSuccess,
  signUpError,
  loginInitialize,
  loginSuccess,
  loginError,
  authReducer,
  signupUser,
  loginUser,
} from './auth';
import { setupStore } from '../../utils/testHelpers';

let store;

const initialState = {
  isLoading: false,
  errors: [],
  loggedInUser: null,
  token: null,
};
describe('SIGNUP ACTIONS', () => {
  const signupMockData = {
    data: {
      token: 'kdkklkl--w09ioqn',
      user: {
        firstname: 'Favour',
        lastname: 'Afolayan',
        username: 'favour',
      },
    },
  };

  beforeEach(() => {
    store = setupStore(initialState);
  });

  it('should dispatch an action for sign up request', () => {
    const action = {
      type: SIGNUP_INITIALIZED,
    };
    expect(signUpIntialize()).toEqual(action);
  });
  it('should dispatch an action for sign up success', () => {
    const payload = {};
    const action = {
      type: SIGNUP_SUCCESS,
      payload,
    };
    expect(signUpSuccess(payload)).toEqual(action);
  });
  it('should dispatch an action for sign up error', () => {
    const error = '';
    const action = {
      type: SIGNUP_ERROR,
      error,
    };
    expect(signUpError(error)).toEqual(action);
  });
  it('should dispatch a successful signup action', () => {
    http.post = jest
      .fn()
      .mockReturnValue(Promise.resolve({ data: signupMockData }));
    const expectedActions = [
      {
        type: 'SIGNUP_INITIALIZED',
      },
      {
        type: 'SIGNUP_SUCCESS',
        payload: signupMockData,
      },
    ];
    return store.dispatch(signupUser()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch a failed signup action', () => {
    http.post = jest
      .fn()
      .mockReturnValue(Promise.reject(new Error('something bad happened')));
    const errorActions = [
      { type: 'SIGNUP_INITIALIZED' },
      { type: 'SIGNUP_ERROR' },
    ];
    store.dispatch(signupUser()).then(() => {
      expect(store.getActions()).toEqual(errorActions);
    });
  });
});
describe('LOGIN ACTIONS', () => {
  const loginMockData = {
    data: {
      token: 'hjhjhhgd094707h',
      user: {
        firstname: 'Favour',
        lastname: 'Afolayan',
        username: 'favour',
      },
    },
  };

  beforeEach(() => {
    store = setupStore(initialState);
  });

  it('should dispatch an action for login request', () => {
    const action = {
      type: LOGIN_INITIALIZED,
    };
    expect(loginInitialize()).toEqual(action);
  });
  it('should dispatch an action for login success', () => {
    const payload = {};
    const action = {
      type: LOGIN_SUCCESS,
      payload,
    };
    expect(loginSuccess(payload)).toEqual(action);
  });
  it('should dispatch an action for sign up error', () => {
    const error = '';
    const action = {
      type: LOGIN_ERROR,
      error,
    };
    expect(loginError(error)).toEqual(action);
  });
  it('should dispatch a successful login action', () => {
    http.post = jest
      .fn()
      .mockReturnValue(Promise.resolve({ data: loginMockData }));
    const expectedActions = [
      {
        type: 'LOGIN_INITIALIZED',
      },
      {
        type: 'LOGIN_SUCCESS',
        payload: loginMockData,
      },
    ];
    return store.dispatch(loginUser()).then(() => {
      // console.log(store.getActions());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch a failed login action', () => {
    http.post = jest
      .fn()
      .mockReturnValue(Promise.reject(new Error('something bad happened')));
    const errorActions = [
      { type: 'LOGIN_INITIALIZED' },
      { type: 'LOGIN_ERROR' },
    ];
    store.dispatch(loginUser()).then(() => {
      expect(store.getActions()).toEqual(errorActions);
    });
  });
});

describe('auth reducer test suite', () => {
  beforeEach(() => {
    store = setupStore(initialState);
  });

  it('should return default state', () => {
    const state = authReducer(initialState, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('should update store for signUpIntialize', () => {
    const action = signUpIntialize();
    const state = authReducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  it('should update store for signup success', () => {
    const action = signUpSuccess();
    const state = authReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    console.log(action);
    expect(state.loggedInUser).toEqual(action.payload.user);
  });

  it('should update store for loginIntialize', () => {
    const action = loginInitialize();
    const state = authReducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  it('should update store for login success', () => {
    const action = loginSuccess();
    const state = authReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.loggedInUser).toEqual(action.response);
  });

  it('should update store for login failure', () => {
    const action = loginError({ error: 'error occured' });
    const state = authReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.errors).toEqual(action.error);
  });
});
