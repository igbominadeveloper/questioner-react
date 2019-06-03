import { http } from '../../api/client';
import { setupStore } from '../../utils/testHelpers';
import {
  GET_QUESTIONS_INITIALIZED,
  getQuestionsIntialize,
  GET_QUESTIONS_SUCCESS,
  getQuestionsSuccess,
  GET_QUESTIONS_ERROR,
  getQuestionsError,
  CREATE_QUESTION_INITIALIZED,
  createQuestionIntialize,
  CREATE_QUESTION_SUCCESS,
  createQuestionSuccess,
  CREATE_QUESTION_ERROR,
  createQuestionError,
  QUESTION_VOTE_INITIALIZED,
  questionVoteIntialize,
  QUESTION_VOTE_SUCCESS,
  questionVoteSuccess,
  QUESTION_VOTE_ERROR,
  questionVoteError,
  getQuestions,
  createNewQuestion,
  questionVote,
  questionReducer,
  CREATE_COMMENT_INITIALIZED,
  createCommentIntialize,
  CREATE_COMMENT_SUCCESS,
  createCommentSuccess,
  CREATE_COMMENT_ERROR,
  createCommentError,
  createNewComment,
} from './question';

let store;

const initialState = {
  isLoading: false,
  errors: [],
  questions: [],
};

const questionsMockData = {
  data: [
    {
      id: 1,
      body: 'nndbnd',
      upvotes: 0,
      downvotes: 0,
      created_at: '2019-06-02T16:13:55.615Z',
      user: {
        firstname: 'Super',
        lastname: 'Admin',
        id: 2,
        email: 'superadmin@questioner.com',
      },
    },
    {
      id: 2,
      body: 'hgf',
      upvotes: 0,
      downvotes: 0,
      created_at: '2019-06-02T16:19:44.156Z',
      user: {
        firstname: 'Super',
        lastname: 'Admin',
        id: 2,
        email: 'superadmin@questioner.com',
      },
    },
  ],
};
const upvotedQuestion = {
  data: {
    id: 1,
    body: 'nndbnd',
    upvotes: 1,
    downvotes: 0,
    created_at: '2019-06-02T16:13:55.615Z',
  },
};

describe('GET QUESTIONS ACTIONS', () => {
  beforeEach(() => {
    store = setupStore(initialState);
  });

  it('should dispatch an action for GET Questions request', () => {
    const action = {
      type: GET_QUESTIONS_INITIALIZED,
    };
    expect(getQuestionsIntialize()).toEqual(action);
  });
  it('should dispatch an action for get Questions success', () => {
    const action = {
      type: GET_QUESTIONS_SUCCESS,
      payload: [{}],
    };
    expect(getQuestionsSuccess(action.payload)).toEqual(action);
  });
  it('should dispatch an action for get questions error', () => {
    const error = '';
    const action = {
      type: GET_QUESTIONS_ERROR,
      error,
    };
    expect(getQuestionsError(error)).toEqual(action);
  });
});
describe('CREATE QUESTION ACTIONS', () => {
  beforeEach(() => {
    store = setupStore(initialState);
  });

  it('should dispatch an action for create question request', () => {
    const action = {
      type: CREATE_QUESTION_INITIALIZED,
    };
    expect(createQuestionIntialize()).toEqual(action);
  });
  it('should dispatch an action for create question success', () => {
    const payload = {};
    const action = {
      type: CREATE_QUESTION_SUCCESS,
      payload,
    };
    expect(createQuestionSuccess(payload)).toEqual(action);
  });
  it('should dispatch an action for create question error', () => {
    const error = '';
    const action = {
      type: CREATE_QUESTION_ERROR,
      error,
    };
    expect(createQuestionError(error)).toEqual(action);
  });
});
describe('QUESTION VOTE ACTIONS', () => {
  beforeEach(() => {
    store = setupStore(initialState);
  });

  it('should dispatch an action for question vote request', () => {
    const action = {
      type: QUESTION_VOTE_INITIALIZED,
    };
    expect(questionVoteIntialize()).toEqual(action);
  });

  it('should dispatch an action for question vote success', () => {
    const payload = {};
    const action = {
      type: QUESTION_VOTE_SUCCESS,
      payload,
    };
    expect(questionVoteSuccess(payload)).toEqual(action);
  });

  it('should dispatch an action for question vote error', () => {
    const error = '';
    const action = {
      type: QUESTION_VOTE_ERROR,
      error,
    };
    expect(questionVoteError(error)).toEqual(action);
  });
});

describe('CREATE COMMENTS ACTIONS', () => {
  beforeEach(() => {
    store = setupStore(initialState);
  });

  it('should dispatch an action for comment request', () => {
    const action = {
      type: CREATE_COMMENT_INITIALIZED,
    };
    expect(createCommentIntialize()).toEqual(action);
  });

  it('should dispatch an action for create comment success', () => {
    const payload = {};
    const action = {
      type: CREATE_COMMENT_SUCCESS,
      payload,
    };
    expect(createCommentSuccess(payload)).toEqual(action);
  });

  it('should dispatch an action for create comment error', () => {
    const error = '';
    const action = {
      type: CREATE_COMMENT_ERROR,
      error,
    };
    expect(createCommentError(error)).toEqual(action);
  });
});
describe('GET QUESTIONS INTEGRATION TEST ', () => {
  beforeEach(() => {
    store = setupStore(initialState);
  });

  it('should fetch questions for a meetup successfully', () => {
    http.get = jest.fn().mockReturnValue(
      Promise.resolve({
        data: questionsMockData,
      }),
    );
    const expectedActions = [
      {
        type: 'GET_QUESTIONS_INITIALIZED',
      },
      {
        type: 'GET_QUESTIONS_SUCCESS',
        payload: questionsMockData.data,
      },
    ];
    return store.dispatch(getQuestions()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should fail to fetch meetup questions', () => {
    const error = {
      response: {
        data: {
          error: 'No questions available now',
        },
      },
    };
    http.get = jest.fn().mockReturnValue(Promise.reject(error));
    const errorActions = [
      { type: 'GET_QUESTIONS_INITIALIZED' },
      {
        type: 'GET_QUESTIONS_ERROR',
        error: error.response.data,
      },
    ];

    store
      .dispatch(getQuestions())
      .then(() => expect(store.getActions()).toEqual(errorActions));
  });
});
describe('CREATE QUESTION INTEGRATION TEST ', () => {
  beforeEach(() => {
    store = setupStore(initialState);
  });
  const newQuestion = {
    data: {
      id: 1,
      body: 'nndbnd',
      upvotes: 0,
      downvotes: 0,
      created_at: '2019-06-02T16:13:55.615Z',
    },
  };

  it('should create a question for a meetup successfully', () => {
    http.post = jest.fn().mockReturnValue(
      Promise.resolve({
        data: newQuestion,
      }),
    );
    const expectedActions = [
      {
        type: 'CREATE_QUESTION_INITIALIZED',
      },
      {
        type: 'CREATE_QUESTION_SUCCESS',
        payload: newQuestion.data,
      },
    ];
    return store
      .dispatch(createNewQuestion({ title: '', body: '', meetup_id: 1 }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should fail to create a question', () => {
    const error = {
      response: {
        data: {
          error: 'something bad happened',
        },
      },
    };
    http.post = jest.fn().mockReturnValue(Promise.reject(error));
    const errorActions = [
      { type: 'CREATE_QUESTION_INITIALIZED' },
      {
        type: 'CREATE_QUESTION_ERROR',
        error: error.response.data,
      },
    ];

    store
      .dispatch(createNewQuestion())
      .then(() => expect(store.getActions()).toEqual(errorActions));
  });
});
describe('QUESTION VOTE INTEGRATION TEST ', () => {
  beforeEach(() => {
    store = setupStore(initialState);
  });

  // it('should upvote a question successfully', () => {
  //   http.post = jest.fn().mockReturnValue(
  //     Promise.resolve({
  //       data: upvotedQuestion.data,
  //     }),
  //   );
  //   const expectedActions = [
  //     {
  //       type: 'QUESTION_VOTE_INITIALIZED',
  //     },
  //     {
  //       type: 'QUESTION_VOTE_SUCCESS',
  //       payload: upvotedQuestion.data,
  //     },
  //   ];
  //   return store.dispatch(questionVote('upvote', 1)).then(() => {
  //     expect(store.getActions()).toEqual(expectedActions);
  //   });
  // });

  it('should fail to upvote a question', () => {
    const error = {
      response: {
        data: {
          error: 'something bad happens everytime',
        },
      },
    };
    http.post = jest.fn().mockReturnValue(Promise.reject(error));
    const errorActions = [
      { type: 'QUESTION_VOTE_INITIALIZED' },
      {
        type: 'QUESTION_VOTE_ERROR',
        error: error.response.data,
      },
    ];

    store
      .dispatch(questionVote('upvote', 1))
      .then(() => expect(store.getActions()).toEqual(errorActions));
  });
});

describe('CREATE COMMENT INTEGRATION TEST ', () => {
  beforeEach(() => {
    store = setupStore(initialState);
  });
  const newComment = {
    data: {
      id: 46,
      user_id: 1,
      question_id: 1,
      comment: 'my new comment is here',
      created_at: '2019-06-03T10:54:08.917Z',
      updated_at: '2019-06-03T10:54:08.917Z',
      user: {
        id: 1,
        firstname: 'Common',
        lastname: 'User',
        othername: null,
        username: null,
        phonenumber: null,
        email: 'user@questioner.com',
      },
    },
  };

  it('should create a comment successfully', () => {
    http.post = jest.fn().mockReturnValue(
      Promise.resolve({
        data: newComment,
      }),
    );
    const expectedActions = [
      {
        type: 'CREATE_COMMENT_INITIALIZED',
      },
      {
        type: 'CREATE_COMMENT_SUCCESS',
        payload: newComment.data,
      },
    ];
    return store
      .dispatch(createNewComment({ question_id: 1, comment: 'comment' }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should fail to create a comment', () => {
    const error = {
      response: {
        data: {
          error: 'something bad happened',
        },
      },
    };
    http.post = jest.fn().mockReturnValue(Promise.reject(error));
    const errorActions = [
      { type: 'CREATE_COMMENT_INITIALIZED' },
      {
        type: 'CREATE_COMMENT_ERROR',
        error: error.response.data,
      },
    ];

    store
      .dispatch(createNewComment())
      .then(() => expect(store.getActions()).toEqual(errorActions));
  });
});

describe('question reducer test suite', () => {
  beforeEach(() => {
    store = setupStore(initialState);
  });

  it('should return default state', () => {
    const state = questionReducer(initialState, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('should update store for getQuestionsInitialize', () => {
    const action = getQuestionsIntialize();
    const state = questionReducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  it('should update store for get questions success', () => {
    const action = getQuestionsSuccess(questionsMockData.data);
    const state = questionReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.questions).toEqual(action.payload);
  });

  it('should update store for get questions failure', () => {
    const error = '';
    const action = getQuestionsError(error);
    const state = questionReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.errors).toBe(error);
  });

  it('should update store for createQuestionInitialize', () => {
    const action = createQuestionIntialize();
    const state = questionReducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  it('should update store for create question success', () => {
    const action = createQuestionSuccess({});
    const state = questionReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.questions).toEqual([action.payload]);
  });

  it('should update store for create question failure', () => {
    const error = '';
    const action = createQuestionError(error);
    const state = questionReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.errors).toBe(error);
  });

  it('should update store for questionVoteInitialize', () => {
    const action = questionVoteIntialize();
    const state = questionReducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  it('should update store for question vote success', () => {
    const action = questionVoteSuccess(upvotedQuestion.data);
    const state = questionReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.questions).toEqual([]);
  });

  it('should update store for question vote failure', () => {
    const error = '';
    const action = questionVoteError(error);
    const state = questionReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.errors).toBe(error);
  });

  it('should update store for commentCreateInitialize', () => {
    const action = createCommentIntialize();
    const state = questionReducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  it('should update store for create comment success', () => {
    const action = createCommentSuccess();
    const state = questionReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.questions).toEqual([]);
  });

  it('should update store for create comment failure', () => {
    const error = '';
    const action = createCommentError(error);
    const state = questionReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.errors).toBe(error);
  });
});
