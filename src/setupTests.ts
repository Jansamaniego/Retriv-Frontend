import '@testing-library/jest-dom';
import { fetch, Headers, Request, Response } from 'cross-fetch';
import { handlers } from 'mocks/handlers';
import { setupServer } from 'msw/lib/node';

import { TextEncoder, TextDecoder } from 'util';

global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;

Object.assign(global, { TextDecoder, TextEncoder });
export const server = setupServer(...handlers);

// Enable the API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable the API mocking after the tests finished.
afterAll(() => server.close());
