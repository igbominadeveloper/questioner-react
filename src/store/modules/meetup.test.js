import {
  CREATE_MEETUP_INITIALIZED,
  CREATE_MEETUP_SUCCESS,
  CREATE_MEETUP_ERROR,
  GET_UPCOMING_MEETUPS_INITIALIZED,
  GET_UPCOMING_MEETUPS_SUCCESS,
  GET_UPCOMING_MEETUPS_ERROR,
  GET_SINGLE_MEETUP_INITIALIZED,
  GET_SINGLE_MEETUP_SUCCESS,
  GET_SINGLE_MEETUP_ERROR,
  RSVP_MEETUP_INITIALIZED,
  RSVP_MEETUP_SUCCESS,
  RSVP_MEETUP_ERROR,
  getUpcomingMeetupsIntialize,
  getUpcomingMeetupsSuccess,
  getUpcomingMeetupsError,
  getUpcomingMeetups,
  meetupReducer,
} from './meetup';

import { http } from '../../api/client';
import { setupStore } from '../../utils/testHelpers';

let store;

const initialState = {
  isLoading: false,
  errors: [],
  meetups: {},
  upcomingMeetups: {},
  rsvp: null,
};
const meetupMockData = {
  data: {
    meetups: [{}],
  },
};

const upcomingMeetupsMockData = {
  data: {
    upcomingMeetups: [{}, {}],
  },
};
describe('UPCOMING MEETUP ACTIONS', () => {
  beforeEach(() => {
    store = setupStore(initialState);
  });

  it('should dispatch an action for GET upcoming meetups request', () => {
    const action = {
      type: GET_UPCOMING_MEETUPS_INITIALIZED,
    };
    expect(getUpcomingMeetupsIntialize()).toEqual(action);
  });
  it('should dispatch an action for get upcoming meetups success', () => {
    const payload = {};
    const action = {
      type: GET_UPCOMING_MEETUPS_SUCCESS,
      payload,
    };
    expect(getUpcomingMeetupsSuccess(payload)).toEqual(action);
  });
  it('should dispatch an action for get upcoming meetups error', () => {
    const error = '';
    const action = {
      type: GET_UPCOMING_MEETUPS_ERROR,
      error,
    };
    expect(getUpcomingMeetupsError(error)).toEqual(action);
  });
  describe('UPCOMING MEETUPS INTEGRATION TEST ', () => {
    it('should fetch upcoming meetups successfully', () => {
      http.get = jest.fn().mockReturnValue(
        Promise.resolve({
          data: upcomingMeetupsMockData,
        }),
      );
      const expectedActions = [
        {
          type: 'GET_UPCOMING_MEETUPS_INITIALIZED',
        },
        {
          type: 'GET_UPCOMING_MEETUPS_SUCCESS',
          payload: upcomingMeetupsMockData.data,
        },
      ];
      return store.dispatch(getUpcomingMeetups()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  it('should fail to fetch upcoming meetups', () => {
    const error = {
      response: {
        data: {
          error: 'something bad happened',
        },
      },
    };
    http.get = jest.fn().mockReturnValue(Promise.reject(error));
    const errorActions = [
      { type: 'GET_UPCOMING_MEETUPS_INITIALIZED' },
      {
        type: 'GET_UPCOMING_MEETUPS_ERROR',
        error: error.response.data,
      },
    ];

    store
      .dispatch(getUpcomingMeetups())
      .then(() => expect(store.getActions()).toEqual(errorActions));
  });
});

describe('auth reducer test suite', () => {
  beforeEach(() => {
    store = setupStore(initialState);
  });

  it('should return default state', () => {
    const state = meetupReducer(initialState, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('should update store for getUpcomingMeetupsInitialize', () => {
    const action = getUpcomingMeetupsIntialize();
    const state = meetupReducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  it('should update store for get upcoming meetups success', () => {
    const action = getUpcomingMeetupsSuccess(upcomingMeetupsMockData);
    const state = meetupReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.upcomingMeetups).toEqual(action.payload);
  });

  it('should update store for get upcoming meetups failure', () => {
    const error = '';
    const action = getUpcomingMeetupsError(error);
    const state = meetupReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.errors).toBe(error);
  });
});
