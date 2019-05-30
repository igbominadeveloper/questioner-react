import { http } from './client';

export const createQuestionRequest = async ({
  title = 'dummy',
  body,
  meetup_id,
}) => {
  return await http.post('/questions', { title, meetup_id, body });
};

export const getQuestionsRequest = async meetup_id => {
  return await http.get(`/meetups/${meetup_id}/questions`);
};
