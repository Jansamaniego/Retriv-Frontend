import retrivApi from 'mocks/baseUrls';
import { rest } from 'msw';

export const cartHandlers = [
  rest.delete(retrivApi('cart'), () => {
    console.log('captured a delete request');
  }),
];
