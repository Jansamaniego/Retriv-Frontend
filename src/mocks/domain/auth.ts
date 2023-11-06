import retrivApi from 'mocks/baseUrls';
import { http } from 'msw';

export const authHandlers = [
  http.post(retrivApi('auth/login'), () => {}),
  http.post(retrivApi('auth/signup'), () => {}),
];
