import retrivApi from 'mocks/baseUrls';
import { http } from 'msw';

export const cartHandlers = [
  http.delete(retrivApi('cart'), () => {
    console.log('captured a delete request');
  }),
];
