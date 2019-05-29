import swal from 'sweetalert';

import { createMeetupRequest } from '../../api/meetup';

//constants
export const CREATE_MEETUP_INITIALIZED = 'CREATE_MEETUP_INITIALIZED';
export const CREATE_MEETUP_SUCCESS = 'CREATE_MEETUP_SUCCESS';
export const CREATE_MEETUP_ERROR = 'CREATE_MEETUP_ERROR';

export const initialState = {
  isLoading: false,
  errors: [],
  meetups: {},
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

export const meetupReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MEETUP_INITIALIZED:
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
      return {
        ...state,
        isLoading: false,
        errors: action.error,
      };

    default:
      return state;
  }
};
