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
  getSingleMeetupIntialize,
  getSingleMeetupSuccess,
  getSingleMeetupError,
  getSingleMeetup,
  createNewMeetup,
  createMeetupIntialize,
  createMeetupSuccess,
  createMeetupError,
  rsvpMeetupIntialize,
  rsvpMeetupSuccess,
  rsvpMeetupError,
  recordRsvp,
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

const singleMeetupMockData = {
  data: { id: 1, topic: 'meetup1' },
};

const rsvpMockData = {
  data: { status: 'yes' },
};
describe('UPCOMING MEETUPS ACTIONS', () => {
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
});
describe('SINGLE MEETUP ACTIONS', () => {
  beforeEach(() => {
    store = setupStore(initialState);
  });

  it('should dispatch an action for GET single meetup request', () => {
    const action = {
      type: GET_SINGLE_MEETUP_INITIALIZED,
    };
    expect(getSingleMeetupIntialize()).toEqual(action);
  });
  it('should dispatch an action for get single meetup success', () => {
    const payload = {};
    const action = {
      type: GET_SINGLE_MEETUP_SUCCESS,
      payload,
    };
    expect(getSingleMeetupSuccess(payload)).toEqual(action);
  });
  it('should dispatch an action for get single meetup error', () => {
    const error = '';
    const action = {
      type: GET_SINGLE_MEETUP_ERROR,
      error,
    };
    expect(getSingleMeetupError(error)).toEqual(action);
  });
});
describe('CREATE MEETUP ACTIONS', () => {
  beforeEach(() => {
    store = setupStore(initialState);
  });

  it('should dispatch an action for create meetup request', () => {
    const action = {
      type: CREATE_MEETUP_INITIALIZED,
    };
    expect(createMeetupIntialize()).toEqual(action);
  });

  it('should dispatch an action for create meetup success', () => {
    const payload = {};
    const action = {
      type: CREATE_MEETUP_SUCCESS,
      payload,
    };
    expect(createMeetupSuccess(payload)).toEqual(action);
  });

  it('should dispatch an action for create meetup error', () => {
    const error = '';
    const action = {
      type: CREATE_MEETUP_ERROR,
      error,
    };
    expect(createMeetupError(error)).toEqual(action);
  });
});
describe('RSVP MEETUP ACTIONS', () => {
  beforeEach(() => {
    store = setupStore(initialState);
  });

  it('should dispatch an action for rsvp meetup request', () => {
    const action = {
      type: RSVP_MEETUP_INITIALIZED,
    };
    expect(rsvpMeetupIntialize()).toEqual(action);
  });

  it('should dispatch an action for rsvp meetup success', () => {
    const payload = {};
    const action = {
      type: RSVP_MEETUP_SUCCESS,
      payload,
    };
    expect(rsvpMeetupSuccess(payload)).toEqual(action);
  });

  it('should dispatch an action for rsvp meetup error', () => {
    const error = '';
    const action = {
      type: RSVP_MEETUP_ERROR,
      error,
    };
    expect(rsvpMeetupError(error)).toEqual(action);
  });
});
describe('UPCOMING MEETUPS INTEGRATION TEST ', () => {
  beforeEach(() => {
    store = setupStore(initialState);
  });

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
describe('SINGLE MEETUP INTEGRATION TEST ', () => {
  beforeEach(() => {
    store = setupStore(initialState);
  });

  it('should fetch a single meetup successfully', () => {
    http.get = jest.fn().mockReturnValue(
      Promise.resolve({
        data: singleMeetupMockData,
      }),
    );
    const expectedActions = [
      {
        type: 'GET_SINGLE_MEETUP_INITIALIZED',
      },
      {
        type: 'GET_SINGLE_MEETUP_SUCCESS',
        payload: singleMeetupMockData.data,
      },
    ];
    return store.dispatch(getSingleMeetup()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should fail to fetch a single meetup', () => {
    const error = {
      response: {
        data: {
          error: 'something bad happened',
        },
      },
    };
    http.get = jest.fn().mockReturnValue(Promise.reject(error));
    const errorActions = [
      { type: 'GET_SINGLE_MEETUP_INITIALIZED' },
      {
        type: 'GET_SINGLE_MEETUP_ERROR',
        error: error.response.data,
      },
    ];

    store
      .dispatch(getSingleMeetup())
      .then(() => expect(store.getActions()).toEqual(errorActions));
  });
});
describe('CREATE MEETUP INTEGRATION TEST ', () => {
  beforeEach(() => {
    store = setupStore(initialState);
  });

  it('should create a meetup successfully', () => {
    http.post = jest.fn().mockReturnValue(
      Promise.resolve({
        data: singleMeetupMockData,
      }),
    );
    const expectedActions = [
      {
        type: 'CREATE_MEETUP_INITIALIZED',
      },
      {
        type: 'CREATE_MEETUP_SUCCESS',
        payload: singleMeetupMockData.data,
      },
    ];
    return store
      .dispatch(
        createNewMeetup(singleMeetupMockData, { history: { push: jest.fn() } }),
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should fail to create a meetup', () => {
    const error = {
      response: {
        data: {
          error: 'something bad happened',
        },
      },
    };
    http.post = jest.fn().mockReturnValue(Promise.reject(error));
    const errorActions = [
      { type: 'CREATE_MEETUP_INITIALIZED' },
      {
        type: 'CREATE_MEETUP_ERROR',
        error: error.response.data,
      },
    ];

    store
      .dispatch(createNewMeetup())
      .then(() => expect(store.getActions()).toEqual(errorActions));
  });
});
describe('RSVP MEETUP INTEGRATION TEST ', () => {
  beforeEach(() => {
    store = setupStore(initialState);
  });

  it('should submit rsvp for a meetup successfully', () => {
    http.post = jest.fn().mockReturnValue(
      Promise.resolve({
        data: rsvpMockData,
      }),
    );
    const expectedActions = [
      {
        type: 'RSVP_MEETUP_INITIALIZED',
      },
      {
        type: 'RSVP_MEETUP_SUCCESS',
        payload: rsvpMockData.data,
      },
    ];
    return store.dispatch(recordRsvp(1, rsvpMockData.data.status)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should fail to record rsvp for a user', () => {
    const error = {
      response: {
        data: {
          error: 'something bad happened',
        },
      },
    };
    http.post = jest.fn().mockReturnValue(Promise.reject(error));
    const errorActions = [
      {
        type: 'RSVP_MEETUP_INITIALIZED',
      },
      {
        type: 'RSVP_MEETUP_ERROR',
        error: error.response.data,
      },
    ];
    return store
      .dispatch(recordRsvp(error.response.data))
      .then(() => expect(store.getActions()).toEqual(errorActions));
  });
});

describe('meetup reducer test suite', () => {
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

  it('should update store for getSingleMeetupInitialize', () => {
    const action = getSingleMeetupIntialize();
    const state = meetupReducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  it('should update store for get single meetup success', () => {
    const action = getSingleMeetupSuccess(singleMeetupMockData.data);
    const state = meetupReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.meetups[singleMeetupMockData.data.id]).toEqual(action.payload);
  });

  it('should update store for get single meetup failure', () => {
    const error = '';
    const action = getSingleMeetupError(error);
    const state = meetupReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.errors).toBe(error);
  });

  it('should update store for createMeetupInitialize', () => {
    const action = createMeetupIntialize();
    const state = meetupReducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  it('should update store for create meetup success', () => {
    const action = createMeetupSuccess(singleMeetupMockData.data);
    const state = meetupReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.meetups[singleMeetupMockData.data.id]).toEqual(action.payload);
  });

  it('should update store for create meetup failure', () => {
    const error = '';
    const action = createMeetupError(error);
    const state = meetupReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.errors).toBe(error);
  });

  it('should update store for recordRsvpInitialize', () => {
    const action = rsvpMeetupIntialize();
    const state = meetupReducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  it('should update store for recordRsvp success', () => {
    const action = rsvpMeetupSuccess({ data: { status: 'yes' } });
    const state = meetupReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.rsvp).toEqual(action.payload);
  });

  it('should update store for recordRsvp  failure', () => {
    const error = '';
    const action = rsvpMeetupError(error);
    const state = meetupReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.errors).toBe(error);
  });
});
