import { http } from './client';
import axios from 'axios';

export const createMeetupRequest = async meetup => {
  return await http.post('/meetups', meetup);
};

export const uploadImageToServer = async ({ image, tag }) => {
  const form = new FormData();
  form.append('file', image);
  form.append('tag', tag);
  form.append('upload_preset', 'uddjcfmw');
  const uploadedImage = await axios.post(
    'https://api.cloudinary.com/v1_1/igbominadeveloper/image/upload',
    form,
  );
  if (uploadedImage.status === 200) {
    return uploadedImage.data.secure_url;
  }
};

export const getUpcomingMeetupsRequest = async () => {
  return await http.get('/meetups/upcoming');
};
