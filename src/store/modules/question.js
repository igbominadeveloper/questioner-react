import swal from 'sweetalert';

import {
  createQuestionRequest,
  getUpcomingMeetupsRequest,
  getSingleMeetupRequest,
  getQuestionsRequest,
} from '../../api/question';

//constants
export const CREATE_QUESTION_INITIALIZED = 'CREATE_QUESTION_INITIALIZED';
export const CREATE_QUESTION_SUCCESS = 'CREATE_QUESTION_SUCCESS';
export const CREATE_QUESTION_ERROR = 'CREATE_QUESTION_ERROR';

export const GET_QUESTIONS_INITIALIZED = 'GET_QUESTIONS_INITIALIZED';
export const GET_QUESTIONS_SUCCESS = 'GET_QUESTIONS_SUCCESS';
export const GET_QUESTIONS_ERROR = 'GET_QUESTIONS_ERROR';

export const createQuestionIntialize = () => {
  return {
    type: CREATE_QUESTION_INITIALIZED,
  };
};

export const createQuestionSuccess = payload => {
  return {
    type: CREATE_QUESTION_SUCCESS,
    payload,
  };
};

export const createQuestionError = error => {
  return {
    type: CREATE_QUESTION_ERROR,
    error,
  };
};

export const getQuestionsIntialize = () => {
  return {
    type: GET_QUESTIONS_INITIALIZED,
  };
};

export const getQuestionsSuccess = payload => {
  return {
    type: GET_QUESTIONS_SUCCESS,
    payload,
  };
};

export const getQuestionsError = error => {
  return {
    type: GET_QUESTIONS_ERROR,
    error,
  };
};

export const createNewQuestion = (title = 'dumm', body, meetup_id) => {
  return async dispatch => {
    try {
      dispatch(createQuestionIntialize());
      const { data } = await createQuestionRequest({ title, body, meetup_id });
      swal('congratulations', 'Your question has been created', 'success').then(
        () => dispatch(createQuestionSuccess(data.data)),
      );
    } catch (error) {
      const { data } = error.response;
      swal('error', data.error, 'error');
      dispatch(createQuestionError(data));
    }
  };
};
export const getQuestions = meetupId => {
  return async dispatch => {
    try {
      dispatch(getQuestionsIntialize());
      const { data } = await getQuestionsRequest(meetupId);
      dispatch(getQuestionsSuccess(data.data));
    } catch (error) {
      const { data } = error.response;
      if (data.status !== 404) {
        swal('error', data.error, 'error');
      }
      dispatch(getQuestionsError(data));
    }
  };
};

export const initialState = {
  isLoading: false,
  errors: [],
  questions: [],
};

export const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_QUESTION_INITIALIZED:
    case GET_QUESTIONS_INITIALIZED:
      return {
        ...state,
        isLoading: true,
      };

    case CREATE_QUESTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        questions: state.questions.concat([action.payload]),
        errors: [],
      };

    case CREATE_QUESTION_ERROR:
      return {
        ...state,
        isLoading: false,
        errors: action.error,
      };

    case GET_QUESTIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        questions: action.payload,
        errors: [],
      };

    case GET_QUESTIONS_ERROR:
      return {
        ...state,
        isLoading: false,
        errors: action.error,
        questions: [],
      };

    default:
      return state;
  }
};
