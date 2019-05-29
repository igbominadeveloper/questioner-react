import swal from 'sweetalert';

import {
  createMeetupRequest,
  getUpcomingMeetupsRequest,
} from '../../api/meetup';

//constants
export const CREATE_MEETUP_INITIALIZED = 'CREATE_MEETUP_INITIALIZED';
export const CREATE_MEETUP_SUCCESS = 'CREATE_MEETUP_SUCCESS';
export const CREATE_MEETUP_ERROR = 'CREATE_MEETUP_ERROR';
export const GET_UPCOMING_MEETUPS_INITIALIZED =
  'GET_UPCOMING_MEETUPS_INITIALIZED';
export const GET_UPCOMING_MEETUPS_SUCCESS = 'GET_UPCOMING_MEETUPS_SUCCESS';
export const GET_UPCOMING_MEETUPS_ERROR = 'GET_UPCOMING_MEETUPS_ERROR';

export const initialState = {
  isLoading: false,
  errors: [],
  meetups: {},
  upcomingMeetups: {},
};

export const createMeetupIntialize = () => {
  return {
    type: CREATE_MEETUP_INITIALIZED,
  };
};

export const createMeetupSuccess = payload => {
  return {
    type: CREATE_MEETUP_SUCCESS,
    payload,
  };
};

export const createMeetupError = error => {
  return {
    type: CREATE_MEETUP_ERROR,
    error,
  };
};

export const getUpcomingMeetupsIntialize = () => {
  return {
    type: GET_UPCOMING_MEETUPS_INITIALIZED,
  };
};

export const getUpcomingMeetupsSuccess = payload => {
  return {
    type: GET_UPCOMING_MEETUPS_SUCCESS,
    payload,
  };
};

export const getUpcomingMeetupsError = error => {
  return {
    type: GET_UPCOMING_MEETUPS_ERROR,
    error,
  };
};

export const createNewMeetup = meetupPayload => {
  return async dispatch => {
    try {
      console.log(meetupPayload);
      dispatch(createMeetupIntialize());
      const { data } = await createMeetupRequest(meetupPayload);
      console.log(data);
      swal('congratulations', 'Your meetup has been scheduled', 'success');

      // .then(response => {
      //   location.replace(from.pathname);
      // });
      dispatch(createMeetupSuccess(data.data));
    } catch (error) {
      const { data } = error.response;
      console.log(error);
      swal('error', data.error, 'error');
      dispatch(createMeetupError(data));
    }
  };
};
export const getUpcomingMeetups = () => {
  return async dispatch => {
    try {
      dispatch(getUpcomingMeetupsIntialize());
      const { data } = await getUpcomingMeetupsRequest();
      dispatch(getUpcomingMeetupsSuccess(data.data));
    } catch (error) {
      console.log(error);
      const { data } = error.response;
      dispatch(getUpcomingMeetupsError(data));
    }
  };
};

export const meetupReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MEETUP_INITIALIZED:
    case GET_UPCOMING_MEETUPS_INITIALIZED:
      return {
        ...state,
        isLoading: true,
        upcomingMeetups: [],
      };

    case CREATE_MEETUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        meetups: {
          ...state.meetups,
          [action.payload.id]: action.payload,
        },
        upcomingMeetups: [],
        errors: [],
      };

    case CREATE_MEETUP_ERROR:
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
        ...state.meetups,
        errors: [],
      };

    case GET_UPCOMING_MEETUPS_ERROR:
      return {
        ...state,
        isLoading: false,
        errors: action.error,
        upcomingMeetups: {},
      };

    default:
      return state;
  }
};
