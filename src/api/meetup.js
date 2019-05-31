import axios from 'axios';

import { http } from './client';
import { CLOUDINARY_UPLOAD_URL } from '../config/config';

export const createMeetupRequest = async meetup =>
  await http.post('/meetups', meetup);

export const uploadImageToServer = async ({ image, tag }) => {
  const form = new FormData();
  form.append('file', image);
  form.append('tag', tag);
  form.append('upload_preset', 'uddjcfmw');
  const uploadedImage = await axios.post(CLOUDINARY_UPLOAD_URL, form);
  return uploadedImage.data.secure_url;
};

export const getUpcomingMeetupsRequest = async () =>
  await http.get('/meetups/upcoming');

export const getSingleMeetupRequest = async meetupId =>
  await http.get('/meetups/' + meetupId);

export const recordRsvpRequest = async (meetupId, status) =>
  await http.post('/meetups/' + meetupId + '/rsvps', { status });
