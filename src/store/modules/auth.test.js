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
  logoutInitialize,
  logoutSuccess,
  autoLogin,
  logout,
  checkAndRedirect,
} from './auth';
import { setupStore } from '../../utils/testHelpers';

let store;

const initialState = {
  isLoading: false,
  errors: [],
  loggedInUser: null,
  token: null,
};
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
describe('SIGNUP ACTIONS', () => {
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
    http.post = jest.fn().mockReturnValue(
      Promise.resolve({
        data: signupMockData,
      }),
    );

    const redirectUrl = '';
    const history = { push: jest.fn() };
    const expectedActions = [
      {
        type: 'SIGNUP_INITIALIZED',
      },
      {
        type: 'SIGNUP_SUCCESS',
        payload: signupMockData.data,
      },
    ];
    return store
      .dispatch(signupUser(signupMockData, redirectUrl, history))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should dispatch a failed signup action', () => {
    const error = {
      response: {
        data: {
          error: 'something bad happened',
        },
      },
    };
    http.post = jest.fn().mockReturnValue(Promise.reject(error));
    const errorActions = [
      { type: 'SIGNUP_INITIALIZED' },
      {
        type: 'SIGNUP_ERROR',
        error: error.response.data,
      },
    ];
    store.dispatch(signupUser()).then(() => {
      expect(store.getActions()).toEqual(errorActions);
    });
  });
});

describe('LOGIN ACTIONS', () => {
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

    const redirectUrl = '';
    const history = { push: jest.fn() };

    const expectedActions = [
      {
        type: 'LOGIN_INITIALIZED',
      },
      {
        type: 'LOGIN_SUCCESS',
        payload: loginMockData.data,
      },
    ];

    return store
      .dispatch(loginUser(loginMockData, redirectUrl, history))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should dispatch a failed login action', () => {
    const error = {
      response: {
        data: {
          error: 'something bad happened',
        },
      },
    };
    const data = (http.post = jest
      .fn()
      .mockReturnValue(Promise.reject({ ...error })));
    const errorActions = [
      { type: 'LOGIN_INITIALIZED' },
      {
        type: 'LOGIN_ERROR',
        error: error.response.data,
      },
    ];
    store.dispatch(loginUser()).then(() => {
      expect(store.getActions()).toEqual(errorActions);
    });
  });

  it('should run without errors for autologin', () => {
    const successActions = [
      { type: 'LOGIN_INITIALIZED' },
      {
        type: 'LOGIN_SUCCESS',
        payload: loginMockData.data,
      },
    ];
    store.dispatch(autoLogin()).then(() => {
      expect(store.getActions()).toEqual(successActions);
    });
  });

  it('should run empty the store of authenticated data when the user logs out', () => {
    const successActions = [
      { type: 'LOGOUT_INITIALIZED' },
      {
        type: 'LOGOUT_SUCCESS',
      },
    ];
    store.dispatch(logout()).then(() => {
      expect(store.getActions()).toEqual(successActions);
    });
  });
  it('should run redirect to login successfully', () => {
    const history = { push: jest.fn() };
    store.dispatch(checkAndRedirect('/', history)).then(() => {
      expect(history.push).toHaveBeenCalled();
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
    const action = signUpSuccess(signupMockData);
    const state = authReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.loggedInUser).toEqual(action.payload.user);
  });

  it('should update store for loginIntialize', () => {
    const action = loginInitialize();
    const state = authReducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  it('should update store for login success', () => {
    const action = loginSuccess(loginMockData);
    const state = authReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.loggedInUser).toEqual(action.payload.user);
  });

  it('should update store for login failure', () => {
    const action = loginError({ error: 'error occured' });
    const state = authReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.errors).toEqual(action.error);
  });

  it('should update store for logout initialize', () => {
    const action = logoutInitialize();
    const state = authReducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  it('should update store for logout success', () => {
    const action = logoutSuccess();
    const state = authReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.loggedInUser).toEqual(null);
    expect(state.token).toEqual(null);
  });
});
