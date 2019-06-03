import swal from 'sweetalert';

import {
  createMeetupRequest,
  getUpcomingMeetupsRequest,
  getSingleMeetupRequest,
  recordRsvpRequest,
} from '../../api/meetup';

//constants
export const CREATE_MEETUP_INITIALIZED = 'CREATE_MEETUP_INITIALIZED';
export const CREATE_MEETUP_SUCCESS = 'CREATE_MEETUP_SUCCESS';
export const CREATE_MEETUP_ERROR = 'CREATE_MEETUP_ERROR';
export const GET_UPCOMING_MEETUPS_INITIALIZED =
  'GET_UPCOMING_MEETUPS_INITIALIZED';
export const GET_UPCOMING_MEETUPS_SUCCESS = 'GET_UPCOMING_MEETUPS_SUCCESS';
export const GET_UPCOMING_MEETUPS_ERROR = 'GET_UPCOMING_MEETUPS_ERROR';
export const GET_SINGLE_MEETUP_INITIALIZED = 'GET_SINGLE_MEETUP_INITIALIZED';
export const GET_SINGLE_MEETUP_SUCCESS = 'GET_SINGLE_MEETUP_SUCCESS';
export const GET_SINGLE_MEETUP_ERROR = 'GET_SINGLE_MEETUP_ERROR';
export const RSVP_MEETUP_INITIALIZED = 'RSVP_MEETUP_INITIALIZED';
export const RSVP_MEETUP_SUCCESS = 'RSVP_MEETUP_SUCCESS';
export const RSVP_MEETUP_ERROR = 'RSVP_MEETUP_ERROR';

export const createMeetupIntialize = () => ({
  type: CREATE_MEETUP_INITIALIZED,
});

export const createMeetupSuccess = payload => ({
  type: CREATE_MEETUP_SUCCESS,
  payload,
});

export const createMeetupError = error => ({
  type: CREATE_MEETUP_ERROR,
  error,
});

export const getUpcomingMeetupsIntialize = () => ({
  type: GET_UPCOMING_MEETUPS_INITIALIZED,
});

export const getUpcomingMeetupsSuccess = payload => ({
  type: GET_UPCOMING_MEETUPS_SUCCESS,
  payload,
});

export const getUpcomingMeetupsError = error => ({
  type: GET_UPCOMING_MEETUPS_ERROR,
  error,
});

export const getSingleMeetupIntialize = () => ({
  type: GET_SINGLE_MEETUP_INITIALIZED,
});

export const getSingleMeetupSuccess = payload => ({
  type: GET_SINGLE_MEETUP_SUCCESS,
  payload,
});

export const getSingleMeetupError = error => ({
  type: GET_SINGLE_MEETUP_ERROR,
  error,
});

export const rsvpMeetupIntialize = () => ({ type: RSVP_MEETUP_INITIALIZED });

export const rsvpMeetupSuccess = payload => ({
  type: RSVP_MEETUP_SUCCESS,
  payload,
});

export const rsvpMeetupError = error => ({
  type: RSVP_MEETUP_ERROR,
  error,
});

export const createNewMeetup = (meetupPayload, history) => async dispatch => {
  try {
    dispatch(createMeetupIntialize());
    const { data } = await createMeetupRequest(meetupPayload);
    swal('congratulations', 'Your meetup has been scheduled', 'success').then(
      response => {
        history.push(`/meetup=${data.data.id}`);
      },
    );
    dispatch(createMeetupSuccess(data.data));
  } catch (error) {
    const { data } = error.response;
    swal('error', data.error, 'error');
    dispatch(createMeetupError(data));
  }
};
export const getUpcomingMeetups = () => async dispatch => {
  try {
    dispatch(getUpcomingMeetupsIntialize());
    const { data } = await getUpcomingMeetupsRequest();
    dispatch(getUpcomingMeetupsSuccess(data.data));
  } catch (error) {
    const { data } = error.response;
    dispatch(getUpcomingMeetupsError(data));
  }
};
export const getSingleMeetup = meetupId => async dispatch => {
  try {
    dispatch(getSingleMeetupIntialize());
    const { data } = await getSingleMeetupRequest(meetupId);
    dispatch(getSingleMeetupSuccess(data.data));
  } catch (error) {
    const { data } = error.response;
    dispatch(getSingleMeetupError(data));
  }
};
export const recordRsvp = (meetupId, status) => async dispatch => {
  try {
    dispatch(rsvpMeetupIntialize());
    const { data } = await recordRsvpRequest(meetupId, status);
    dispatch(rsvpMeetupSuccess(data.data));
    swal(
      'Great!!!',
      `you said ${data.data.status
        .charAt(0)
        .toUpperCase()}${data.data.status.slice(1)} to this meetup`,
      'success',
    );
  } catch (error) {
    const { data } = error.response;
    dispatch(rsvpMeetupError(data));
  }
};

export const initialState = {
  isLoading: false,
  errors: [],
  meetups: {},
  upcomingMeetups: {},
  rsvp: null,
};

export const meetupReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MEETUP_INITIALIZED:
    case GET_UPCOMING_MEETUPS_INITIALIZED:
    case GET_SINGLE_MEETUP_INITIALIZED:
    case RSVP_MEETUP_INITIALIZED:
      return {
        ...state,
        isLoading: true,
      };

    case CREATE_MEETUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        meetups: {
          ...state.meetups,
          [action.payload.id]: action.payload,
        },
        errors: [],
      };

    case CREATE_MEETUP_ERROR:
    case GET_UPCOMING_MEETUPS_ERROR:
    case GET_SINGLE_MEETUP_ERROR:
    case RSVP_MEETUP_ERROR:
      return {
        ...state,
        isLoading: false,
        errors: action.error,
        upcomingMeetups: [],
      };

    case GET_UPCOMING_MEETUPS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        upcomingMeetups: action.payload,
        errors: [],
      };

    case GET_SINGLE_MEETUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        meetups: {
          ...state.meetups,
          [action.payload.id]: action.payload,
        },
        errors: [],
      };

    case RSVP_MEETUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        rsvp: action.payload,
      };

    default:
      return state;
  }
};
