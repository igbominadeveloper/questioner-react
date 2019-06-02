import swal from 'sweetalert';

import {
  createQuestionRequest,
  getQuestionsRequest,
  questionVoteRequest,
} from '../../api/question';

//constants
export const CREATE_QUESTION_INITIALIZED = 'CREATE_QUESTION_INITIALIZED';
export const CREATE_QUESTION_SUCCESS = 'CREATE_QUESTION_SUCCESS';
export const CREATE_QUESTION_ERROR = 'CREATE_QUESTION_ERROR';

export const GET_QUESTIONS_INITIALIZED = 'GET_QUESTIONS_INITIALIZED';
export const GET_QUESTIONS_SUCCESS = 'GET_QUESTIONS_SUCCESS';
export const GET_QUESTIONS_ERROR = 'GET_QUESTIONS_ERROR';

export const QUESTION_VOTE_INITIALIZED = 'QUESTION_VOTE_INITIALIZED';
export const QUESTION_VOTE_SUCCESS = 'QUESTION_VOTE_SUCCESS';
export const QUESTION_VOTE_ERROR = 'QUESTION_VOTE_ERROR';

export const createQuestionIntialize = () => ({
  type: CREATE_QUESTION_INITIALIZED,
});

export const createQuestionSuccess = payload => ({
  type: CREATE_QUESTION_SUCCESS,
  payload,
});

export const createQuestionError = error => ({
  type: CREATE_QUESTION_ERROR,
  error,
});

export const getQuestionsIntialize = () => ({
  type: GET_QUESTIONS_INITIALIZED,
});

export const getQuestionsSuccess = payload => ({
  type: GET_QUESTIONS_SUCCESS,
  payload,
});

export const getQuestionsError = error => ({
  type: GET_QUESTIONS_ERROR,
  error,
});

export const questionVoteIntialize = () => ({
  type: QUESTION_VOTE_INITIALIZED,
});

export const questionVoteSuccess = (payload, decision) => ({
  type: QUESTION_VOTE_SUCCESS,
  payload,
  decision,
});

export const questionVoteError = error => ({
  type: QUESTION_VOTE_ERROR,
  error,
});

export const createNewQuestion = (
  title = 'dumm',
  body,
  meetup_id,
) => async dispatch => {
  try {
    dispatch(createQuestionIntialize());
    const { data } = await createQuestionRequest({ title, body, meetup_id });
    swal('Great!!!', 'Your question has been created', 'success');
    dispatch(createQuestionSuccess(data.data));
  } catch (error) {
    const { data } = error.response;
    swal('error', data.error, 'error');
    dispatch(createQuestionError(data));
  }
};

export const getQuestions = meetupId => async dispatch => {
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

export const questionVote = (decision, questionId) => async dispatch => {
  try {
    dispatch(questionVoteIntialize());
    const { data } = await questionVoteRequest(questionId, decision);
    dispatch(questionVoteSuccess(data.data));
  } catch (error) {
    const { data } = error.response;
    if (data.status !== 404) {
      swal('error', data.error, 'error');
    }
    dispatch(questionVoteError(data));
  }
};

export const initialState = {
  isLoading: false,
  errors: [],
  questions: [],
};

export const updateVote = (questions, action) => {
  return questions.map(question => {
    if (question.id === action.payload.id) {
      return {
        ...question,
        upvotes: action.payload.upvotes,
        downvotes: action.payload.downvotes,
      };
    }
    return question;
  });
};

export const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_QUESTION_INITIALIZED:
    case GET_QUESTIONS_INITIALIZED:
    case QUESTION_VOTE_INITIALIZED:
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

    case QUESTION_VOTE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        questions: updateVote(state.questions, action),
        errors: [],
      };

    case QUESTION_VOTE_ERROR:
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
