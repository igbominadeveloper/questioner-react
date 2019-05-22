import { http } from '../../api/client';
import {
  SIGNUP_SUCCESS,
  SIGNUP_INITIALIZED,
  SIGNUP_ERROR,
  signUpIntialize,
  signUpSuccess,
  signUpError,
  authReducer,
  signupUser,
} from './auth';
import { setupStore } from '../../utils/testHelpers';

let store;

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  errors: [],
  successResponse: [],
};
describe('SIGNUP ACTIONS', () => {
  const signupMockData = {
    data: {
      token: '',
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
    expect(state.successResponse).toEqual(action.response);
  });

  it('should update store for signup failure', () => {
    const action = signUpError({ error: 'error occured' });
    const state = authReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.errors).toEqual(action.error);
  });
});
