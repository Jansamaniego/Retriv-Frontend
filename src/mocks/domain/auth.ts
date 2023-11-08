import retrivApi from 'mocks/baseUrls';
import { rest } from 'msw';

export const authHandlers = [
  rest.post(retrivApi('auth/login'), () => {}),
  rest.post(retrivApi('auth/signup'), () => {}),
];
