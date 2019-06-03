import { http } from './client';

export const createQuestionRequest = async ({
  title = 'dummy',
  body,
  meetup_id,
}) => await http.post('/questions', { title, meetup_id, body });

export const getQuestionsRequest = async meetup_id =>
  await http.get(`/meetups/${meetup_id}/questions`);

export const questionVoteRequest = async (questionId, decision) =>
  await http.patch(`/questions/${questionId}/${decision}`);

export const createCommentRequest = async ({ question_id, comment }) =>
  await http.post('/comments', { question_id, comment });
